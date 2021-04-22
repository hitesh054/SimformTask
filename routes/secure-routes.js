const express = require('express');
const router = express.Router();
const multer = require('multer');
const { uploadFile } = require('../services/S3Upload')
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage: storage }).single("file");
let bucketName;
router.post("/file", async (req, res) => {
    bucketName = req.query.Category;
    upload(req, res, async (err) => {
        if (err) {
            res.status(400).send("Something went wrong!");
        }
        //res.send(req.file);
        //     // res.send({ "message": "File successfully uploaded" });
        // console.log("req.file  \n", req.file);
        console.log("filename \n", req.file.filename);
        uploadFile(req.file.filename, bucketName).then(
            function (result) { res.send({ "message": "File successfully uploaded" }); },
            function (error) { res.send({ "message": "File upload failed" }); }
        );
    });
});



module.exports = router;