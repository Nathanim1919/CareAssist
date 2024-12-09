import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = "AIzaSyC_Q1Dv_cPfOdZ6IQqmpJk13DbnZ1LvxAc";
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const patientInfo = {
  symptoms: ["fever", "headache", "nausea"],
  medicalHistory: ["diabetes", "hypertension"],
  medications: ["Metformin", "Lisinopril"],
};

const preamble = `
You are a virtual medical assistant trained to provide accurate and reliable advice based on patient symptoms and medical history. Always recommend consulting a licensed medical professional.
`;

const prompt = `
${preamble}
Patient Symptoms: ${patientInfo.symptoms.join(", ")}
Medical History: ${patientInfo.medicalHistory.join(", ")}
Medications: ${patientInfo.medications.join(", ")}
Question: What should the patient do next?
Assistant:
`;

async function generateContent() {
  try {
    const result = await model.generateContent(prompt);

    const candidates = result.response?.candidates || [];
    const content = candidates
      .map(candidate => candidate.content?.parts?.[0]?.text || "No content found")
      .join("\n");

    console.log("Generated Content:\n", content);
  } catch (error) {
    console.error("Error generating content:", error);
  }
}

generateContent();
