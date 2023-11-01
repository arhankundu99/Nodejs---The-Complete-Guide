const express = require('express')
const router = express.Router();

router.get('/product', (req, res) => {
    return res.status(200).send("This is product page");
})

module.exports = router;