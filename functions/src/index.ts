import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import { spawn } from "child-process-promise";
import * as path from "path";
import * as os from "os";
import * as fs from "fs";
import { Work } from "./lib/types";
import * as WorkUtils from "./utils/Work";

admin.initializeApp();

const shouldShowWork = (work: Work): boolean => {
  return (
    work.title.length > 0 &&
    work.url.length > 0 &&
    work.backgroundImage.length > 0
  );
};

const isUidAdmin = async (uid: string): Promise<boolean> => {
  const doc = await admin
    .firestore()
    .collection("users")
    .doc(uid)
    .get();
  return doc.exists && (doc.data() || {}).admin === true;
};

exports.getAllWork = functions.https.onCall(
  async (_: any, context: functions.https.CallableContext) => {
    const { uid = "" } = context.auth || {};
    const query = await admin
      .firestore()
      .collection("work")
      .orderBy("date", "desc")
      .get();
    let work = WorkUtils.getFromDocs(query.docs);
    if (uid.length === 0 || !(await isUidAdmin(uid))) {
      work = work.filter(shouldShowWork);
    }
    return work;
  }
);

exports.getRecentWork = functions.https.onCall(
  async (data: any, context: functions.https.CallableContext) => {
    const { limit = 5 } = data;
    const { uid = "" } = context.auth || {};
    const query = await admin
      .firestore()
      .collection("work")
      .orderBy("date", "desc")
      .limit(limit * 2)
      .get();
    let work = WorkUtils.getFromDocs(query.docs);
    if (uid.length === 0 || !(await isUidAdmin(uid))) {
      work = work.filter(shouldShowWork);
    }
    return work.slice(0, limit);
  }
);

exports.getWorkAfterId = functions.https.onCall(
  async (data: any, context: functions.https.CallableContext) => {
    const { id = "", limit = 5 } = data;
    const { uid = "" } = context.auth || {};
    if (id.length > 0) {
      const doc = await admin
        .firestore()
        .collection("work")
        .doc(id)
        .get();
      if (doc.exists) {
        const query = await admin
          .firestore()
          .collection("work")
          .orderBy("date", "desc")
          .limit(limit * 2)
          .startAfter(doc)
          .get();
        let work = WorkUtils.getFromDocs(query.docs);
        if (uid.length === 0 || !(await isUidAdmin(uid))) {
          work = work.filter(shouldShowWork);
        }
        return work.slice(0, limit);
      } else {
        throw new Error("Specified work does not exist!");
      }
    } else {
      throw new Error("No id provided, unable to find work!");
    }
  }
);

exports.getWorkById = functions.https.onCall(
  async (data: any, _: functions.https.CallableContext) => {
    const { id = null } = data;
    if (id) {
      const doc = await admin
        .firestore()
        .collection("work")
        .doc(id)
        .get();
      if (doc.exists) {
        return WorkUtils.getFromDoc(doc);
      } else {
        throw new Error("Specified work does not exist!");
      }
    } else {
      throw new Error("No id provided, unable to find work!");
    }
  }
);

exports.convertImageToBeProgressive = functions
  .runWith({
    timeoutSeconds: 300,
    memory: "1GB",
  })
  .storage.object()
  .onFinalize(async (object: functions.storage.ObjectMetadata) => {
    const {
      bucket: fileBucket = "",
      name: filePath = "",
      contentType = "",
    } = object;

    if (
      fileBucket.length === 0 ||
      filePath.length === 0 ||
      contentType.length === 0
    ) {
      throw new Error("Unable to process storage object!");
    } else if (!contentType.startsWith("image/")) {
      return;
    }

    const fileName = path.basename(filePath);
    if (fileName.startsWith("thumb_")) {
      return;
    }

    const bucket = admin.storage().bucket(fileBucket);
    const tempFilePath = path.join(os.tmpdir(), fileName);
    await bucket.file(filePath).download({ destination: tempFilePath });
    await spawn("convert", [
      tempFilePath,
      // Resize image to fit within a 1000x1000 square if it is larger than this size.
      "-resize",
      "1000x1000>",
      // Reduce quality to 95%.
      "-quality",
      "95",
      // Convert to progressive image.
      "-interlace",
      "plane",
    ]);
    const thumbFileName = `thumb_${fileName}`;
    const thumbFilePath = path.join(
      path.dirname(filePath),
      "thumb",
      thumbFileName
    );
    await bucket.upload(tempFilePath, {
      destination: thumbFilePath,
      metadata: {
        contentType: "image/jpg",
      },
    });
    fs.unlinkSync(tempFilePath);
    return;
  });
