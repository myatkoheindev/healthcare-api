const visionaiService = require("../services/VisionAiService");
const vertexAiService = require("../services/VertexAiService");
const genaiSercive = require("../services/GenAiService");
const deepseekService = require("../services/DeepSeekAiService");

async function healthcareHandler(req, res) {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }
        // vision ai
        const ocrResult = await visionaiService.handwritOCR(req.file.buffer);

        // vertax ai
        // const medicalExtract = await vertexAiService.generateContent(ocrResult.text);

        const genaiResult = await genaiSercive.generateContent(ocrResult.text);

        res.json({
            ocr: ocrResult.text,
            genai: genaiResult,
        });

    } catch (error) {
        console.error("API Error:", error);
        res.status(500).json({ error: "API failed", details: error.message });
    }
}

async function genai(req, res) {
    try {
        const genaiResult = await genaiSercive.generateContent();

        res.json({ data: genaiResult });
    } catch (error) {
        console.error("Gen ai Error:", error);
        res.status(500).json({ error: "Gen ai", details: error.message });
    }
}

async function deepseekai(req, res) {
    try {
        const deepseekResult = await deepseekService.translate();

        res.json({ data: deepseekResult });
    } catch (error) {
        console.error("Deepseek ai Error:", error);
        res.status(500).json({ error: "Deepseek ai", details: error.message });
    }
}

module.exports = { healthcareHandler, genai, deepseekai };