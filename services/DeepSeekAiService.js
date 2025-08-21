const OpenAI = require("openai");

const openai = new OpenAI({
    baseURL: 'https://api.deepseek.com',
    apiKey: process.env.DEEPSEEK_API_KEY
});

const systemPrompt = `
You are the medical assistant with English and Burmese Language.
The user will provide some json text. Please translate Burmese Language output in JSON format. 
`;

const userPrompt = `{
    "patient": {
        "name": "John Smith",
        "age": 34,
        "address": "162 Example St, NY"
    },
    "prescriber": {
        "doctor_name": "Dr. Steve Johnson",
        "license_number": "976269",
        "DEA_number": "GB 05455616",
        "phone": "1-489-422-4700"
    },
    "prescription_date": "09-11-12",
    "medications": [
        {
            "name": "Betaloc",
            "dosage": "100",
            "unit": "ng",
            "frequency": "BID",
            "form": "tab"
        },
        {
            "name": "Dorzolamidum",
            "dosage": "10",
            "unit": "mg",
            "frequency": "BID",
            "form": "tab"
        },
        {
            "name": "Cimetidine",
            "dosage": "50",
            "unit": "mg",
            "frequency": "TID",
            "form": "tab",
            "notes": "2 tabs"
        },
        {
            "name": "Oxprelol",
            "dosage": "50",
            "unit": "mg",
            "frequency": "QD",
            "form": "tab"
        }
    ],
    "refill": "012345 PRN",
    "other_info": "MEDICAL CENTRE\n824 14 Street\nNew York, NY 91743, USA",
    "medical_suggestions": {
        "Medication_classification": {
            "Betaloc": "Beta-blocker (Metoprolol Tartrate)",
            "Dorzolamidum": "Carbonic anhydrase inhibitor",
            "Cimetidine": "H2 antagonist",
            "Oxprelol": "Beta-blocker (Oxprenolol)"
        },
        "Common_use_cases": {
            "Betaloc (Metoprolol)": "High blood pressure, angina, heart failure",
            "Dorzolamidum": "Glaucoma, ocular hypertension",
            "Cimetidine": "Stomach ulcers, heartburn, GERD",
            "Oxprelol": "High blood pressure, angina"
        },
        "Potential_drug_interactions": "While not an exhaustive list, combining beta-blockers (Betaloc, Oxprelol) with other medications can cause interactions.  Specific interactions depend on the other medications the patient is taking.  It's crucial to inform the physician of all medications and supplements being used. Cimetidine can interact with many drugs by affecting liver metabolism. This needs to be checked against all other medications.",
        "Important_patient_advice": "Take medications exactly as prescribed. Do not stop taking any medication without talking to your doctor. Contact your physician immediately if you experience any unusual side effects.  Inform your doctor of all other medications, vitamins, or supplements you are taking.  This prescription contains multiple medications that could have interactions, so be vigilant about reporting any problems."
    }
}`;

const messages = [
    { role: "system", content: systemPrompt },
    { role: "user", content: userPrompt }
];

async function translate() {
    try {
        const response = await openai.chat.completions.create({
            model: "deepseek-chat",
            messages: messages,
            response_format: { type: "json_object" }
        });

        const result = JSON.parse(response.choices[0].message.content);
        console.log(result);

        return result;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

module.exports = { translate };