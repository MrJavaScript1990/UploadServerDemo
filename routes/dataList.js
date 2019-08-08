import express from 'express'
import fs from "fs";
const router = express.Router();

router.get('/get', (req, res) => {
    let temp=fs.readFileSync('./db/db.txt');
    temp.toString().replace(' ','\n');
    res.render('index', {
        records: temp,
    });
})


export default router
