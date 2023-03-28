const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { bucket } = require("../middlewares/multer");
const sharp = require("sharp");

class Controller {
  static async newUser(req, res, next) {
    try {
      const buffer = req.file.buffer;
      const { name, date, usia, mobile, education, city } = req.body;
      const resizeOne = await sharp(buffer).resize(500, 500).toBuffer();
      const resizeTwo = await sharp(buffer).resize(1000, 1000).toBuffer();

      const fileNameOne = Date.now() + "-1.jpg";
      const fileOne = bucket.file(fileNameOne);
      const streamOne = fileOne.createWriteStream({
        metadata: {
          contentType: "image/jpeg",
        },
        resumable: false,
      });

      const fileNameTwo = Date.now() + "-2.jpg";
      const fileTwo = bucket.file(fileNameTwo);
      const streamTwo = fileTwo.createWriteStream({
        metadata: {
          contentType: "image/jpeg",
        },
        resumable: false,
      });

      streamOne.on("error", (err) => {
        console.error(err);
        res.status(500).send("Failed to upload");
      });

      streamTwo.on("error", (err) => {
        console.error(err);
        res.status(500).send("Failed to upload");
      });

      const expirationDate = new Date();
      expirationDate.setFullYear(expirationDate.getFullYear() + 1);

      streamOne.on("finish", async () => {
        const urlOne = await fileOne.getSignedUrl({
          action: "read",
          expires: expirationDate,
        });
        await prisma.User.create({
          data: {
            name,
            date: new Date(date),
            usia: Number(usia),
            mobile,
            education,
            image: urlOne[0],
            city,
          },
        });
      });

      streamTwo.on("finish", async () => {
        const urlTwo = await fileTwo.getSignedUrl({
          action: "read",
          expires: expirationDate,
        });
      });
      res.status(201).json({ message: "success insert" });
      streamOne.end(resizeOne);
      streamTwo.end(resizeTwo);
    } catch (error) {
      next(error);
    }
  }
  static async updateUser(req, res, next) {
    try {
      const { id } = req.params;
      const buffer = req.file.buffer;
      const { name, date, usia, mobile, education, city } = req.body;
      const resizeOne = await sharp(buffer).resize(500, 500).toBuffer();
      const resizeTwo = await sharp(buffer).resize(1000, 1000).toBuffer();

      const fileNameOne = Date.now() + "-1.jpg";
      const fileOne = bucket.file(fileNameOne);
      const streamOne = fileOne.createWriteStream({
        metadata: {
          contentType: "image/jpeg",
        },
        resumable: false,
      });

      const fileNameTwo = Date.now() + "-2.jpg";
      const fileTwo = bucket.file(fileNameTwo);
      const streamTwo = fileTwo.createWriteStream({
        metadata: {
          contentType: "image/jpeg",
        },
        resumable: false,
      });

      streamOne.on("error", (err) => {
        console.error(err);
        res.status(500).send("Failed to upload");
      });

      streamTwo.on("error", (err) => {
        console.error(err);
        res.status(500).send("Failed to upload");
      });

      const expirationDate = new Date();
      expirationDate.setFullYear(expirationDate.getFullYear() + 1);

      streamOne.on("finish", async () => {
        const urlOne = await fileOne.getSignedUrl({
          action: "read",
          expires: expirationDate,
        });
        await prisma.User.update({
          where: { id: Number(id) },
          data: {
            name,
            date: new Date(date),
            usia: Number(usia),
            mobile,
            education,
            image: urlOne[0],
            city,
          },
        });
      });

      streamTwo.on("finish", async () => {
        const urlTwo = await fileTwo.getSignedUrl({
          action: "read",
          expires: expirationDate,
        });
      });
      res.status(201).json({ message: "success insert" });
      streamOne.end(resizeOne);
      streamTwo.end(resizeTwo);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "internal server error" });
    }
  }
  static async getAllUser(req, res, next) {
    try {
      const allUser = await prisma.User.findMany();
      res.status(200).json(allUser);
    } catch (error) {
      next(error);
    }
  }
  static async getUserId(req, res, next) {
    try {
      const { id } = req.params;
      const userId = await prisma.User.findUnique({
        where: { id: Number(id) },
      });
      if (!userId) throw { name: "NOT_FOUND" };
      res.status(200).json(userId);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
