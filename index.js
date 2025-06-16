import { DdddOcr } from 'ddddocr-node'
import express from 'express'
import cors from 'cors'
import multer from 'multer'
import fs from 'fs'
import path from 'path'

const upload = multer({ dest: 'uploads/' })

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static('public'))

const ddddOcr = new DdddOcr();

// const result = await ddddOcr.classification('image.png');
// console.log(result);


app.post('/ocr', upload.single('file'), async (req, res) => {
    const result = await ddddOcr.classification(req.file.path)
    fs.unlinkSync(req.file.path)
    res.json({ data: [result] });
})

app.post('/ocrs', upload.array('files', 12), async (req, res) => {
    const resArr = []
    for (const file of req.files) {
        const result = await ddddOcr.classification(file.path)
        resArr.push(result)
        fs.unlinkSync(file.path)
    }
    res.json({ data: resArr });
})

app.listen(process.env.PORT || 3000)