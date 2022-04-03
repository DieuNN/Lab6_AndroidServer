var express = require('express');
var router = express.Router();
const multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})
const upload1 = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: (req, file, cb) => {
        const fileSize = parseInt(req.headers['content-length'])
        if (fileSize < 1024 * 1024 * 2) {
            cb(null, true);
        } else {
            return cb(new Error('File qua lon!'));
        }
    }
});
const upload2 = multer({
    storage: storage,
})

const upload3 = multer({
    storage: storage,
})


/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

router.post("/upload-1", upload1.array('upload-1'), (req, res, next) => {
    res.end("Upload thanh cong!")
})
router.post("/upload-2", upload2.array('upload-2', 5), (req, res, next) => {
    res.end("Upload thanh cong!")

})

router.post("/upload-3", upload3.array('upload-3'), (req, res, next) => {
res.end("Upload thanh cong!")

})


module.exports = router;
