import firebase, { Work, getAllWork, getRecentWork, getWorkAfterId, getWorkById } from "../lib/firebase";

export default class WorkStore {
  private _work: Array<Work> = [];
  private static _instance: WorkStore = new WorkStore();
  private constructor() { }
  get work(): Array<Work> {
    return this._work;
  }
  static instance(): WorkStore {
    return this._instance;
  }
  async create(): Promise<string> {
    const doc = await firebase
      .firestore()
      .collection("work")
      .add({
        date: new Date().getTime()
      });
    return doc.id;
  }
  async delete(id: string): Promise<void> {
    await firebase.firestore().collection("work").doc(id).delete();
    this._work = this._work.filter(w => w.id !== id);
  }
  async getAll(): Promise<Array<Work>> {
    this._work = await getAllWork();
    return this._work;
  }
  async getById(id: string): Promise<Work> {
    const existingWork = this._work.find(work => work.id === id);
    if (existingWork !== null && existingWork !== undefined) {
      return existingWork;
    }
    const work = await getWorkById(id);
    for (let i = 0; i < this._work.length; i++) {
      if (this._work[i].date < work.date) {
        this._work.splice(i, 0, work);
      }
    }
    return work;
  }
  async getRecent(limit: number = 5): Promise<Array<Work>> {
    if (this._work.length === 0) {
      this._work = await getRecentWork(limit);
    } else if (this._work.length < limit) {
      const last = this._work[this._work.length - 1];
      const newLimit = limit - this._work.length;
      const additionalWork = await this.getAfter(last.id, newLimit);
      additionalWork.forEach(work => this._work.push(work));
    }
    return this._work.slice(0, limit);
  }
  async getAfter(id: string, limit: number = 5): Promise<Array<Work>> {
    const additionalWork = await getWorkAfterId(id, limit)
    return additionalWork;
  }
  async update(updatedWork: Work): Promise<void> {
    let work = await this.getById(updatedWork.id);
    const {
      backgroundImage = "",
      date = -1,
      title = "",
      url = ""
    } = work;
    await firebase.firestore().collection("work").doc(updatedWork.id).update({
      backgroundImage,
      date,
      title,
      url
    });
    work = updatedWork;
  }
}
