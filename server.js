const express = require("express");
const multer = require("multer");
const vision = require("@google-cloud/vision");
const fs = require("fs");
const ocrController = require("./controllers/ocrController");

const app = express();
const port = 3000;

// Google Vision client
const client = new vision.v1p3beta1.ImageAnnotatorClient({
    keyFilename: 'static-reach-468909-d1-10753c345e9d.json',
});

// Multer for file uploads (stores in memory)
const upload = multer({ storage: multer.memoryStorage() });

app.get('/test', async (req, res) => {
    res.send('test');
});

app.post("/ocr", upload.single("file"), ocrController.ocrHandler);


app.listen(port, () => {
    console.log(`OCR API running at http://localhost:${port}`);
});
