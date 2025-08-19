const ocrService = require("../services/ocrService");
const genaiService = require("../services/genaiService");

async function ocrHandler(req, res) {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }
        const ocrResult = await ocrService.performOCR(req.file.buffer);

        const genaiResult = await genaiService.generateContent(ocrResult.text);

        res.json({
            ocr: ocrResult.text,
            genai: genaiResult,
        });

        res.json(ocrResult);
    } catch (error) {
        console.error("OCR Error:", error);
        res.status(500).json({ error: "OCR failed", details: error.message });
    }
}

module.exports = { ocrHandler };