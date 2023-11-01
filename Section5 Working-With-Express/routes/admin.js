const express = require('express')
const router = express.Router();

router.get('/admin', (req, res) => {
    return res.status(200).send("This is admin page");
})

module.exports = router;