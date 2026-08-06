import { scanAndRedactPrompt } from './redactionEngine.js';

const samplePrompt = `
Here is our setup script:
1. Email: sarah.connor@acme-corp.com
2. Phone: +1 415-555-0199
3. OpenAI API Key: sk-proj-948271048291048291
4. AWS Access Key ID: AKIAIOSFODNN7EXAMPLE
5. AWS Secret Access Key: aws_secret_access_key = wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
6. Standalone AWS Secret: wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
7. GitHub Token: ghp_123456789012345678901234567890123456
8. Google Gemini Key: GEMINI_API_KEY=AIzaSyA1B2C3D4E5F6G7H8I9J0K1L2M3N4O5P6
9. Standalone Gemini Key: AIzaSyA1B2C3D4E5F6G7H8I9J0K1L2M3N4O5P6
10. Database Password: DB_PASSWORD=SuperSecure@123
11. JWT Secret: JWT_SECRET=aegis_ai_hackathon_super_secret_jwt_key_2026
12. Internal URL: http://internal.acme.corp/api/v1
13. Confidential Note: CONFIDENTIAL NOTE: Do not share with third parties.
`;

console.log("--- TESTING SCANNER ---");
const result = scanAndRedactPrompt(samplePrompt);
console.log("ENTITIES FOUND (Count:", result.entities.length, "):");
result.entities.forEach(e => console.log(`  - [${e.type}]: "${e.text}"`));
console.log("\nMASKED PROMPT:\n", result.maskedPrompt);
