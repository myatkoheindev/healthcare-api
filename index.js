const express = require("express");
const multer = require("multer");
const vision = require("@google-cloud/vision");
const fs = require("fs");
require('dotenv').config();
const healthcareController = require("./controllers/HealthcareController")

const app = express();
const port = 3000;

// // Google Vision client
// const client = new vision.v1p3beta1.ImageAnnotatorClient({
//     keyFilename: 'static-reach-468909-d1-10753c345e9d.json',
// });

// Multer for file uploads (stores in memory)
const upload = multer({ storage: multer.memoryStorage() });

app.get('/health-check', async (req, res) => {
    res.send('ok');
});

app.post("/healthcare", upload.single("file"), healthcareController.healthcareHandler);

app.get("/genai", healthcareController.genai);

app.get("/deepseek", healthcareController.deepseekai);


app.listen(port, () => {
    console.log(`OCR API running at http://localhost:${port}`);
});
