if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}
const express = require("express");
const router = require("./routes/router");
const app = express();
const cors = require("cors");
const errMessage = require("./middlewares/errorHandle");
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(router);
app.use(errMessage);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
