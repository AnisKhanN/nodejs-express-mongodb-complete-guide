const { ImageKit, toFile } = require("@imagekit/nodejs");

const ImageKitClient = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

async function uploadFile(file) {
  try {
    const fileForUpload = file.buffer
      ? await toFile(file.buffer, file.originalname || "audio.mp3")
      : file;

    const result = await ImageKitClient.files.upload({
      file: fileForUpload,
      fileName: `${Date.now()}-${file.originalname || "audio.mp3"}`,
      folder: "spotify-music",
    });
    return result;
  } catch (error) {
    console.error("Error uploading file to ImageKit:", error);
    throw error;
  }
}

module.exports = {
  uploadFile,
};
