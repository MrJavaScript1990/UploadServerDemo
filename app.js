import ejs from 'ejs'
import express from 'express'
import helmet from 'helmet';

import uploadApi from './routes/uploadApi'
import dataList from './routes/dataList'



const app = express();


app.set('view engine', 'ejs');


app.use(express.static('./public'));
//app.use(helmet());

app.use('/api/upload',uploadApi);
app.use('/api/dataList',dataList);


app.get('/', (req, res) => res.render('index'));





const port = 3000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
