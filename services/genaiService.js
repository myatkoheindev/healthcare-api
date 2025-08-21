const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function generateContent(ocrText = null) {

    const prompt = `
        You are a medical NLP assistant.
        Extract all relevant structured medical information from the following OCR prescription text.
        Return the result in pure JSON format with these fields :
 
        - patient (name, age, address)
        - prescriber (doctor name, license number, DEA number, phone)
        - prescription_date
        - medications (name, dosage, unit, frequency, form if possible, notes)
        - refill
        - other_info
 
        After extracting, also provide with "medical_suggestions" key in this json and summarize:
        - Medication classification (e.g., beta-blocker, H2 antagonist).
        - Common use cases.
        - Potential drug interactions (if any among the listed drugs).
        - Important patient advice (in simple terms).
 
        This is the OCR prescription text:
        ${ocrText}`;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(prompt);

    console.log(result.response.text());

    return result.response.text();
}

module.exports = { generateContent };
