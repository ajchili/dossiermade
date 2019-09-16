import firebase from "../lib/firebase";
import Work from "../lib/Work";

export default class WorkStore {
  private _docs: Map<string, firebase.firestore.DocumentSnapshot> = new Map();
  private _work: Array<Work> = [];
  private static _instance: WorkStore = new WorkStore();
  private constructor() {}
  get work(): Array<Work> {
    return this._work;
  }
  static instance(): WorkStore {
    return this._instance;
  }
  async getAll(): Promise<Array<Work>> {
    this._work = await Work.getAll();
    return this._work;
  }
  async getById(id: string): Promise<Work> {
    const existingWork = this._work.find(work => work.id === id);
    if (existingWork !== null && existingWork !== undefined) {
      return existingWork;
    }
    const work = await Work.getById(id);
    for (let i = 0; i < this._work.length; i++) {
      if (this._work[i].date < work.date) {
        this._work.splice(i, 0, work);
      }
    }
    return work;
  }
  async getRecent(limit: number = 5): Promise<Array<Work>> {
    if (this._work.length === 0) {
      this._work = await Work.getRecent(limit);
    } else if (this._work.length < limit) {
      const last = this._work[this._work.length - 1];
      const lastDoc = await this.getDocumentReferenceById(last.id);
      const newLimit = limit - this._work.length;
      const additionalWork = await Work.getAfter(lastDoc, newLimit);
      additionalWork.forEach(work => this._work.push(work));
    }
    return this._work.slice(0, limit);
  }
  async getAfter(id: string, limit: number = 5): Promise<Array<Work>> {
    const doc = await this.getDocumentReferenceById(id);
    const additionalWork = await Work.getAfter(doc, limit);
    additionalWork.forEach(work => this._work.push(work));
    return additionalWork;
  }
  private async getDocumentReferenceById(
    id: string
  ): Promise<firebase.firestore.DocumentSnapshot> {
    const existingDoc = this._docs.get(id);
    if (
      existingDoc !== null &&
      existingDoc !== undefined &&
      existingDoc.exists
    ) {
      return existingDoc;
    }
    const doc = await Work.getDocById(id);
    this._docs.set(doc.id, doc);
    return doc;
  }
}