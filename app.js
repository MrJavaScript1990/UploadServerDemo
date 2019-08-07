import ejs from 'ejs'
import multer from 'multer'
import path from 'path'
import express from 'express'
import fs from 'fs'

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


const app = express();


app.set('view engine', 'ejs');


app.use(express.static('./public'));

app.get('/', (req, res) => res.render('index'));

app.post('/upload', (req, res) => {
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


app.post('/uploadMulti', (req, res) => {
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

app.post('/posts', (req, res) => {
    uploadMulti(req, res, (err) => {
            let temp=fs.readFileSync('./db/db.txt');
            temp.toString().replace(' ','\n');
            res.render('index', {
                records: temp,
            });
        }
    );
});

const port = 3000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
