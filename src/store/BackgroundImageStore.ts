import firebase from "../lib/firebase";

export default class BackgroundImageStore {
  private _backgroundImages: Array<firebase.storage.Reference> = [];
  private static _instance: BackgroundImageStore = new BackgroundImageStore();
  private constructor() {
    this.getAll();
  }
  get backgroundImages(): Array<string> {
    return this._backgroundImages.map(backgroundImage => {
      return `https://firebasestorage.googleapis.com/v0/b/${process.env.REACT_APP_STORAGE_BUCKET}/o/thumb%2F${backgroundImage.name}?alt=media`;
    });
  }
  static instance(): BackgroundImageStore {
    return this._instance;
  }
  async getAll(): Promise<Array<string>> {
    const list = await firebase.storage().ref("thumb").listAll();
    this._backgroundImages = list.items;
    return this.backgroundImages;
  }
  async uploadFile(file: File): Promise<void> {
    const storageRef = firebase.storage().ref().child(file.name);
    await storageRef.put(file);
    await new Promise(resolve => {
      setTimeout(async () => {
        await this.getAll();
        resolve();
      }, 5000);
    });
  }
}
