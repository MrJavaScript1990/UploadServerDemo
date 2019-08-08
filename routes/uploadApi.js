import express from 'express'
import fs from "fs";
import multer from "multer";
import path from "path";

const router = express.Router();


const storage = multer.diskStorage({
    destination: './uploads/',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});


const upload = multer({
    storage: storage,
    limits: {fileSize: 1500000},
}).single('Single');

const uploadMulti = multer({
    storage: storage,
    limits: {fileSize: 1500000},
}).array('Multi', 10);





router.post('/single', (req, res) => {
    upload(req, res, (err) => {
            if (err) {
                res.render('index', {
                    msg: err
                });
            } else {
                if (req.file && req.file.filename) {
                    fs.appendFileSync('./db/db.txt', req.file.filename + '\n', {});
                    res.render('index', {
                        msg: 'File Uploaded!',
                    });
                } else {
                    res.render('index', {
                    });
                }
            }
        }
    );
});


router.post('/multi', (req, res) => {
    uploadMulti(req, res, (err) => {
            if (err) {
                res.render('index', {
                    msg: err
                });
            }
            else {
                if (req.files && req.files[0]) {

                    let allFiles='';
                    req.files.forEach((file)=>allFiles+=file.filename+'\n');
                    fs.appendFileSync('./db/db.txt', allFiles + '\n', {});
                    res.render('index', {
                        msg: 'Files Uploaded!',
                    });
                }else{
                    res.render('index', {
                    });
                }
            }
        }
    );
});

export default router
