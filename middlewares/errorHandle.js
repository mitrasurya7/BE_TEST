const errMessage = (err, req, res, next) => {
  switch (err.name) {
    case "NOT_FOUND":
      res.status(200).json({ message: "Data not Found" });
      break;
    default:
      res.status(500).json({ message: "Internal Server Error" });
      break;
  }
};
module.exports = errMessage;
