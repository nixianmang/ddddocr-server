// const { DdddOcr } = require('ddddocr-node');
import { DdddOcr } from 'ddddocr-node'
import express from 'express'
import cors from 'cors'
import multer from 'multer'
const upload = multer({ dest: 'uploads/' })

console.log(multer);


const app = express()

app.use(cors())
app.use(express.json())

const ddddOcr = new DdddOcr();

const result = await ddddOcr.classification('image.png');
console.log(result);

app.get('/', (_, res) => {
    res.send('hello')
})

app.post('/ocr', upload.single('file'), async (req, res) => {
    const result = await ddddOcr.classification(req.file.path)
    res.send(result);
})

app.listen(process.env.PORT || 3000)