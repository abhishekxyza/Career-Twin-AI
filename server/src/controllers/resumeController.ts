import { Request, Response } from 'express';

export const analyzeResume = async (req: Request, res: Response) => {
  try {
    const resumeText = String(req.body?.resumeText || '');
    const normalized = resumeText.toLowerCase();
    const presentSkills = [
      'react',
      'node',
      'typescript',
      'python',
      'aws',
      'docker',
      'mongodb',
      'postgres',
      'sql',
      'api',
      'testing',
      'leadership',
      'agile',
      'project',
    ].filter((skill) => normalized.includes(skill));

    const strengthPool = [
      'Frontend delivery',
      'Backend systems',
      'Problem solving',
      'Product thinking',
      'Cross-functional collaboration',
    ];

    const gapPool = [
      'Stronger quantified impact',
      'More deployment evidence',
      'Clearer leadership examples',
      'More system design depth',
    ];

    const score = Math.min(96, 65 + presentSkills.length * 4 + (resumeText.length > 500 ? 6 : 0));
    const summary = resumeText
      ? `Your resume highlights ${presentSkills.length ? presentSkills.slice(0, 3).join(', ') : 'core engineering fundamentals'} and suggests a strong foundation for targeted growth.`
      : 'Paste your resume content to receive an ATS-style review and concrete improvement suggestions.';

    const strengths = presentSkills.length
      ? presentSkills.map((skill) => skill.charAt(0).toUpperCase() + skill.slice(1))
      : ['Clear technical foundations'];

    const gaps = gapPool.slice(0, Math.max(1, Math.min(3, 2 + (presentSkills.length < 3 ? 1 : 0)))));
    const suggestions = [
      'Add one measurable outcome to each bullet point.',
      'Include deployment links or architecture details for your strongest projects.',
      'Use a short summary section that aligns with the role you want next.',
    ];

    return res.json({
      atsScore: score,
      summary,
      strengths: strengths.length > 4 ? strengths.slice(0, 4) : strengths,
      gaps,
      suggestions,
      rating: score >= 85 ? 'Excellent' : score >= 75 ? 'Strong' : 'Needs work',
      focusAreas: ['ATS clarity', 'Impact framing', 'Role alignment'],
      matchedKeywords: presentSkills,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Resume analysis failed.' });
  }
};
