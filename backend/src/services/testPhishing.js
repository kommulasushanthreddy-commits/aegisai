import { analyzePhishingThreat } from './phishingEngine.js';

const sampleEmail = {
  subject: "URGENT: Action Required - Account Suspension Alert",
  sender: "security-team@verify-auth-domain.net",
  message: "URGENT: Your corporate account will be suspended within 30 minutes. Please reset your password and verify your credentials immediately to avoid permanent deactivation. Click here to confirm: https://verify-auth-domain.net/reset-password"
};

console.log("--- TESTING PHISHING ANALYZER ---");
const result = analyzePhishingThreat(sampleEmail);
console.log("Risk Score:", result.riskScore, "%");
console.log("Risk Level:", result.riskLevel.toUpperCase());
console.log("Recommendation:", result.recommendation);
console.log("FLAGS DETECTED (Count:", result.flags.length, "):");
result.flags.forEach(f => console.log(`  🚩 [${f.label}]: ${f.explanation}`));
