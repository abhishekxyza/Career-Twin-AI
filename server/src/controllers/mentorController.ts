import { Request, Response } from 'express';

interface MentorContext {
  atsScore?: number;
  focusAreas?: string[];
  matchedKeywords?: string[];
}

export const buildMentorReply = (message: string, context: MentorContext = {}) => {
  const prompt = (message || '').toLowerCase();
  const atsScore = context.atsScore ?? 80;
  const focusAreas = context.focusAreas ?? [];
  const keywords = context.matchedKeywords ?? [];

  const recommendations = [] as string[];

  if (prompt.includes('resume')) {
    recommendations.push('Rewrite one bullet so it highlights measurable impact.');
    recommendations.push('Add a short summary section that aligns with the role you want.');
    recommendations.push('Mention one shipped project with deployment or user outcome details.');
  }

  if (prompt.includes('roadmap') || prompt.includes('next')) {
    recommendations.push('Choose one skill to deepen this week and build a proof-of-work around it.');
    recommendations.push('Schedule one portfolio improvement session before the next application cycle.');
  }

  if (prompt.includes('interview')) {
    recommendations.push('Practice a STAR answer and one systems design review.');
  }

  if (recommendations.length === 0) {
    recommendations.push('Set one focused study block for today.');
    recommendations.push('Create a small public artifact that proves your momentum.');
  }

  let reply = 'You are building momentum. I recommend a focused plan that strengthens one core skill and turns it into visible evidence.';

  if (prompt.includes('resume')) {
    reply = `Your current profile looks promising, especially with an ATS score around ${atsScore}. I would tighten the resume by emphasizing ${focusAreas.slice(0, 2).join(' and ') || 'role alignment'} and making your strongest keywords like ${keywords.slice(0, 3).join(', ') || 'your core stack'} impossible to miss.`;
  } else if (prompt.includes('roadmap') || prompt.includes('next')) {
    reply = `For your next step, I would aim for a practical growth loop: deepen one area, ship a visible result, and document the outcome clearly. Your strongest themes so far are ${keywords.slice(0, 3).join(', ') || 'your current focus areas'}.`;
  } else if (prompt.includes('interview')) {
    reply = 'Prepare one strong story, one design review, and one concise explanation of your impact. That combination is usually enough to feel much more confident.';
  } else if (prompt.includes('stress') || prompt.includes('motivation')) {
    reply = 'Consistency beats intensity. A short but focused session today will compound faster than a perfect but delayed one.';
  }

  return {
    reply,
    suggestions: recommendations,
  };
};

export const chatWithMentor = async (req: Request, res: Response) => {
  try {
    const { message } = req.body;
    const { reply, suggestions } = buildMentorReply(message, {
      atsScore: req.body?.atsScore,
      focusAreas: req.body?.focusAreas,
      matchedKeywords: req.body?.matchedKeywords,
    });

    return res.json({ reply, suggestions });
  } catch (error) {
    return res.status(500).json({ message: 'Mentor chat failed.' });
  }
};
