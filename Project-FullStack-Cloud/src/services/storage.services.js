const { ImageKit } = require("@imagekit/nodejs");
const client = new ImageKit({
  privateKey: "private_txYPtSEA/yFFp6T8AJ0Wt/rk9/E=", // Replace with your actual private key
});

async function uploadFile(buffer) {
  const response = await client.files.upload({
    file: buffer.toString("base64"), // Buffer containing the file data
    fileName: "image.jpg", // Replace with the desired file name
  });
  return response;
}
module.exports = {
  uploadFile,
};
