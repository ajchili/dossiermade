import firebase from "./firebase";

export interface PersonSnapshot {
  name?: string;
  email?: string;
  phoneNumber?: string;
}

export default class Person {
  private _id: string;
  private _data: PersonSnapshot;
  private constructor(id: string, data: PersonSnapshot) {
    this._id = id;
    this._data = data;
  }
  get id() {
    return this._id;
  }
  get name() {
    return this._data.name || "";
  }
  get email() {
    return this._data.email || "";
  }
  get phoneNumber() {
    return this._data.phoneNumber || "";
  }
  static async create(data: PersonSnapshot) {
    let doc = await firebase
      .firestore()
      .collection("person")
      .add(data);
    return new Person(doc.id, data);
  }
  static getStaticPeople(): Array<Person> {
    return [
      new Person("", {
        name: "Elijah Cutler",
        email: "info@dossiermade.com",
        phoneNumber: "(410)-402-3011"
      }),
      new Person("", {
        name: "Kirin Patel",
        email: "info@dossiermade.com",
        phoneNumber: "(301)-641-5838"
      }),
      new Person("", {
        name: "Jadon Pecoraro",
        email: "info@dossiermade.com",
        phoneNumber: "(443)-452-7097‬"
      })
    ];
  }
  static async getAll(): Promise<Array<Person>> {
    let people: Array<Person> = [];
    let query = await firebase
      .firestore()
      .collection("person")
      .get();
    query.docs.forEach(doc => {
      people.push(
        new Person(doc.id, {
          name: doc.data().name || "",
          email: doc.data().email || "",
          phoneNumber: doc.data().phoneNumber || ""
        })
      );
    });
    return people;
  }
  async update(data: PersonSnapshot) {
    await firebase
      .firestore()
      .collection("person")
      .doc(this._id)
      .update(data);
    if (data.name) this._data.name = data.name;
    if (data.email) this._data.email = data.email;
    if (data.phoneNumber) this._data.phoneNumber = data.phoneNumber;
  }
  async delete() {
    return await firebase
      .firestore()
      .collection("person")
      .doc(this._id)
      .delete();
  }
}
