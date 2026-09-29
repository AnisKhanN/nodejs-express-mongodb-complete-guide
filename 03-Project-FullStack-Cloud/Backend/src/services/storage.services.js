const { ImageKit } = require("@imagekit/nodejs"); // Destructure method

const client = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

async function uploadFile(buffer) {
  if (!buffer) {
    throw new Error("Image buffer is missing.");
  }

  return await client.files.upload({
    file: buffer.toString("base64"),
    fileName: `${Date.now()}.jpg`,
  });
}

module.exports = { uploadFile };
