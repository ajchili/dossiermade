import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import { spawn } from "child-process-promise";
import * as path from "path";
import * as os from "os";
import * as fs from "fs";

admin.initializeApp();

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
