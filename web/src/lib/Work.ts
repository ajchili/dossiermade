import firebase from "../Components/firebase";

export interface WorkSnapshot {
  title?: string;
  description?: string;
  url?: string;
  date?: number;
  backgroundImage?: string;
}

export default class Work {
  private _id: string;
  private _data: WorkSnapshot;
  private constructor(id: string, data: WorkSnapshot) {
    this._id = id;
    this._data = data;
  }
  get id() {
    return this._id;
  }
  get title() {
    return this._data.title || "";
  }
  get description() {
    return this._data.description || "";
  }
  get url() {
    return this._data.url || "";
  }
  get date() {
    return this._data.date || -1;
  }
  get backgroundImage() {
    return this._data.backgroundImage || "";
  }
  static async create(data: WorkSnapshot) {
    let doc = await firebase
      .firestore()
      .collection("work")
      .add(data);
    return new Work(doc.id, data);
  }
  static async getAll(): Promise<Array<Work>> {
    let work: Array<Work> = [];
    let query = await firebase
      .firestore()
      .collection("work")
      .orderBy("date", "desc")
      .get();
    query.docs.forEach(doc => {
      work.push(
        new Work(doc.id, {
          title: doc.data().title || "",
          description: doc.data().description || "",
          url: doc.data().url || "",
          date: doc.data().date || -1,
          backgroundImage: doc.data().backgroundImage || ""
        })
      );
    });
    return work;
  }
  static async getRecent(): Promise<Array<Work>> {
    let work: Array<Work> = [];
    let query = await firebase
      .firestore()
      .collection("work")
      .orderBy("date", "desc")
      .limit(5)
      .get();
    query.docs.forEach(doc => {
      work.push(
        new Work(doc.id, {
          title: doc.data().title || "",
          description: doc.data().description || "",
          url: doc.data().url || "",
          date: doc.data().date || -1,
          backgroundImage: doc.data().backgroundImage || ""
        })
      );
    });
    return work;
  }
  async update(data: WorkSnapshot) {
    await firebase
      .firestore()
      .collection("work")
      .doc(this._id)
      .update(data);
    if (data.title) this._data.title = data.title;
    if (data.description) this._data.description = data.description;
    if (data.url) this._data.url = data.url;
    if (data.date) this._data.date = data.date;
    if (data.backgroundImage) this._data.backgroundImage = data.backgroundImage;
  }
  async delete() {
    return await firebase
      .firestore()
      .collection("work")
      .doc(this._id)
      .delete();
  }
}
