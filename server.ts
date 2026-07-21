import express from 'express';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

// Initialize Google Gen AI
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

// API Route for lead scoring and script generation
app.post('/api/analyze-lead', async (req: any, res: any) => {
  try {
    const { lead } = req.body;
    if (!lead) {
      return res.status(400).json({ error: 'Lead data is required' });
    }

    const prompt = `
      You are an expert academic counselor and sales expert for a premium online/hybrid learning app in Kerala, India.
      Analyze this lead and generate a lead qualification score (0 to 100), a detailed scoring reason, a high-converting counseling script (incorporating both English and friendly Malayalam phrasing/Malayalam words where appropriate, as is standard in Kerala), and a personalized WhatsApp follow-up message.

      Lead Details:
      - Student Name: ${lead.name}
      - Class/Course: ${lead.course}
      - School Syllabus Board: ${lead.board || 'Not specified'}
      - School/College: ${lead.schoolCollege}
      - District in Kerala: ${lead.district}
      - Parent Name: ${lead.parentName}
      - Parent Occupation: ${lead.parentOccupation || 'Not specified'}
      - Is Gulf NRI Parent?: ${lead.isGulfParent ? 'Yes (NRI/Gulf connections, higher budget capacity but timezone difference)' : 'No'}
      - Budget Preference: ${lead.budgetPreference}
      - Academic Background: ${lead.academicBackground}
      - Source: ${lead.leadSource}
      - Additional Notes: ${lead.notes || 'None'}

      Context on Kerala Market:
      - Parents in Kerala are highly invested in their children's education and demand high quality.
      - "Gulf Parents" (NRIs working in UAE, Qatar, Oman, Saudi, Bahrain, Kuwait) have high paying capacity but need transparent communication, EMI/payment plans, and evening counseling calls when they are off work.
      - SCERT (State Board) students usually look for exam-oriented support, while CBSE/ICSE students are more interested in KEAM/NEET foundation, concepts, and skill courses.
      - Respectful, encouraging, and clear communication is vital. Use standard greetings like "Namaskaram" and focus on student potential, personalized attention, and regular test series.

      Provide a JSON response ONLY. The response MUST match this structure and have no markdown outside of the JSON block:
      {
        "score": <number between 0 and 100>,
        "scoreReason": "<concise professional evaluation of why this score was given, highlighting strengths and objections>",
        "counselingScript": "<A step-by-step custom guide/script for the counselor. Include English questions and friendly Malayalam transitions like 'Kuttikk study material check cheyyan pattiyo?', 'Syllabus kooduthal weightage ullathaanu', etc. Provide distinct strategies for the parent and student.>",
        "whatsappTemplate": "<Ready-to-send personalized WhatsApp message in a warm, polite mix of English and Malayalam. End with a polite call to action. Add placeholder for link or contact. No markdown formatting in template, just readable text and emojis.>",
        "suggestedAction": "<Next best step, e.g., 'Schedule evening zoom demo with Father in Dubai', or 'Offer SCERT special crash course brochure'>"
      }
    `;

    // Fallback if no API key is set
    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'MY_GEMINI_API_KEY') {
      const generatedScore = Math.floor(Math.random() * 20) + 75; // 75-95
      return res.json({
        score: generatedScore,
        scoreReason: `[LOCAL DEMO MODE] This lead has excellent potential. Student ${lead.name} from ${lead.district} has a ${lead.board || 'CBSE'} background which matches perfectly with our smart study planner. ${lead.isGulfParent ? 'Father working in the Gulf indicates strong financial intent and capability for high-tier annual subscription (EMI preferred).' : 'Local family with high focus on academic growth.'} Needs counseling on CBSE vs state board exam strategy.`,
        counselingScript: `### Phase 1: Call Preparation
1. Review student board details: **${lead.board || 'CBSE'} syllabus**.
2. Call timing: ${lead.isGulfParent ? 'Evening slot (around 7:30 PM IST / 6:00 PM Gulf time) to align with NRI Parent.' : 'Standard evening slot (4:00 PM - 7:00 PM IST)'}.

### Phase 2: High-Converting Script (Malayalam & English)
- **Introduction**: "Namaskaram ${lead.parentName}, njan Kerala Learning App-il ninnum ${lead.assignedCounselor || 'Counselor'} aanu vilikkunnathu. ${lead.name}inte course inquiry-ye patti samsarikkan nalla samayam aano?"
- **Pain-point exploration**: "Kuttikk ippo syllabus padichu theerkkan budhimuttundo? Especially CBSE/SCERT exams competitive aayi varunna samayath ${lead.course} syllabus handle cheyyan custom study plans helpful aayirikkum."
- **Gulf NRI Anchor (if applicable)**: "Gulf-il work cheyyunna parents-inu kuttikalude learning progress daily track cheyyan nammude mobile app-il special Parent Dashboard undu. UAE/Saudi timings-il doubt-clearing sessions scheduled aanu."
- **Closer**: "Nammalkku ${lead.name}-inu vendi oru free expert academic evaluation scheduled cheyyam. Monday aano convenient, atho Tuesday aano?"`,
        whatsappTemplate: `Hello ${lead.parentName}! 🙏\n\nHope you are doing well. This is ${lead.assignedCounselor || 'your advisor'} from Kerala Learning App.\n\nWe received your inquiry regarding our advanced ${lead.course} hybrid learning program for ${lead.name}.\n\nOur specialized batch offers:\n✅ Daily Live Interactive Classes\n✅ Kerala's Top Faculty (IITian & State Toppers)\n✅ High-Quality Malayalam & English Explanations\n✅ Dual-syllabus tracker (CBSE/SCERT)\n\nSince you are based in ${lead.district}, we can arrange a personalized online counseling session to map out ${lead.name}'s learning strategy.\n\nCould we connect briefly on Zoom this week?\n\nWarm regards,\nKerala Learning App Team 🎓`,
        suggestedAction: lead.isGulfParent 
          ? 'Arrange late-evening Zoom counseling meeting incorporating Father from Dubai'
          : 'Send curriculum syllabus checklist and register for live demo'
      });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      }
    });

    const text = response.text || '';
    const parsed = JSON.parse(text);
    return res.json(parsed);
  } catch (error: any) {
    console.error('Error analyzing lead:', error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
});

// For Vite in dev mode and static in production
const PORT = 3000;

if (process.env.NODE_ENV === 'production') {
  // Serve static files from dist
  app.use(express.static(path.join(__dirname, 'dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Production server running on port ${PORT}`);
  });
} else {
  // In development, let Vite handle assets and routing
  const { createServer: createViteServer } = await import('vite');
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });
  app.use(vite.middlewares);
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Development server running on port ${PORT}`);
  });
}
