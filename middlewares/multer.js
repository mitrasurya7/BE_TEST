const multer = require("multer");
const { Storage } = require("@google-cloud/storage");

const storage = new Storage({
  keyFilename: "./mykey.json",
  projectId: process.env.PROJECT_ID,
});
const multerUpload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB limit
  },
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("Only image files are allowed!"), false);
    }
    cb(null, true);
  },
});

const bucket = storage.bucket(process.env.BUCKET_ID);

module.exports = { multerUpload, bucket };
