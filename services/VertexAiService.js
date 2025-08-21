const { GoogleGenAI } = require('@google/genai');

const GOOGLE_CLOUD_PROJECT = process.env.GOOGLE_CLOUD_PROJECT;
const GOOGLE_CLOUD_LOCATION = process.env.GOOGLE_CLOUD_LOCATION;

// sample ocr text
// let ocrText = `DEA# GB 05455616\n MEDICAL CENTRE\n824 14 Street\n New York, NY 91743, USA\n NAME John Smith\nADDRESS 162 Example St, NY\n
//     R\n LIC #976269\nAGE\n 34\n DATE 09-11-12\n
//     Betaloc 100ng-tab BID\n
//     Dorzolamidum 10\n
//     Cimetidine 50 mg - 2 tabs TID\n
//     mg-1 tab BID\n
//     Oxprelol 50mg-1 tab QD\n
//     OLABEL\n
//     REFILL 012345 PRN\n
//     Dr. Steve Johnson\n
//     signature\n
//     WTX-N-PRESC-1\n
//     1-489-422-4700\n`

async function generateContent(ocrText, GOOGLE_CLOUD_PROJECT, GOOGLE_CLOUD_LOCATION) {

    const prompt = `
        You are a medical NLP assistant.
        Extract all relevant structured medical information from the following OCR prescription text.
        Return the result in JSON format with these fields:
 
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

    const ai = new GoogleGenAI({
        vertexai: true,
        project: GOOGLE_CLOUD_PROJECT,
        location: GOOGLE_CLOUD_LOCATION,
    });

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });

    console.log(response)

    return response.text;
}

module.exports = { generateContent };
