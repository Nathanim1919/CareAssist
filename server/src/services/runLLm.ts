import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = "AIzaSyC_Q1Dv_cPfOdZ6IQqmpJk13DbnZ1LvxAc";
const genAI = new GoogleGenerativeAI(apiKey);
export const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// const patientInfo = {
//   symptoms: ["fever", "headache", "nausea"],
//   medicalHistory: ["diabetes", "hypertension"],
//   medications: ["Metformin", "Lisinopril"],
// };

export const preamble = `
You are a virtual medical assistant trained to provide accurate and reliable advice based on patient symptoms and medical history. 
and the user might be a doctor or a patient or a nurse, so the assistant should be able to provide the right information and user specific information.
Always recommend consulting a licensed medical professional.
`;
