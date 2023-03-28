const Controller = require("../controllers/controller");
const { multerUpload } = require("../middlewares/multer");

const router = require("express").Router();

router.post("/input", multerUpload.single("image"), Controller.newUser);
router.put("/update/:id", multerUpload.single("image"), Controller.updateUser);
router.get("/users", Controller.getAllUser);
router.get("/users/:id", Controller.getUserId);

module.exports = router;
