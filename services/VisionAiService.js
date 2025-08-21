const vision = require("@google-cloud/vision");

const client = new vision.v1p3beta1.ImageAnnotatorClient({
    keyFilename: 'static-reach-468909-d1-10753c345e9d.json',
});

async function handwritOCR(buffer) {
    const request = {
        image: { content: buffer },
        feature: { languageHints: ["en-t-i0-handwrit"] },
    };
    const [result] = await client.documentTextDetection(request);
    const text = result.fullTextAnnotation?.text || "";
    return { text, raw: result };
}

module.exports = { handwritOCR };