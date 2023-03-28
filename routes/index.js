const router = require("express").Router()

router.get('/test', (req, res) => {
    console.log(req.body);
  })

module.exports = router