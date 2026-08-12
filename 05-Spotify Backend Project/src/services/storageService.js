const { ImageKit } = require("@imagekit/nodejs");

const ImageKitClient = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

async function uploadFile(file) {
  if (!file) {
    throw new Error("No file provided for upload");
  }

  const fileBuffer = file.buffer || file;
  const originalName = file.originalname || `upload-${Date.now()}`;
  const fileName = `${Date.now()}-${originalName}`;
  const uploadPayload =
    Buffer.isBuffer(fileBuffer) || fileBuffer instanceof Uint8Array
      ? fileBuffer.toString("base64")
      : fileBuffer;

  const uploadOptions = {
    file: uploadPayload,
    fileName,
    folder: "cluster0/spotifyDB/spotify-music",
    useUniqueFileName: true,
    tags: ["spotify", "music"],
  };

  const uploadResponse = await ImageKitClient.files.upload(uploadOptions);

  return {
    url: uploadResponse.url,
    name: uploadResponse.name || fileName,
    fileId: uploadResponse.fileId,
    size: uploadResponse.size,
    metadata: {
      originalName,
      mimeType: file.mimetype,
      extension: originalName.split(".").pop(),
    },
  };
}

module.exports = {
  uploadFile,
};
