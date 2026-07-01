const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

function buildResumeFallback(resumeText = '') {
  const normalized = resumeText.toLowerCase();
  const matchedKeywords = ['react', 'node', 'typescript', 'python', 'aws', 'docker', 'mongodb']
    .filter((keyword) => normalized.includes(keyword));

  const score = Math.min(96, 68 + matchedKeywords.length * 4 + (resumeText.length > 500 ? 6 : 0));

  return {
    atsScore: score,
    summary: resumeText
      ? `Your resume highlights ${matchedKeywords.slice(0, 3).join(', ') || 'core engineering fundamentals'} and shows promising relevance for growth-focused roles.`
      : 'Paste or upload a resume to receive a tailored ATS-style analysis.',
    strengths: matchedKeywords.length ? matchedKeywords.map((keyword) => keyword.charAt(0).toUpperCase() + keyword.slice(1)) : ['Clear technical fundamentals'],
    gaps: ['Stronger quantified impact', 'More deployment evidence', 'Clearer leadership examples'],
    suggestions: [
      'Add one measurable outcome to each bullet point.',
      'Include deployment links or architecture details for your strongest projects.',
      'Align your summary section with the role you want next.',
    ],
    rating: score >= 85 ? 'Excellent' : score >= 75 ? 'Strong' : 'Needs work',
    focusAreas: ['ATS clarity', 'Impact framing', 'Role alignment'],
    matchedKeywords: matchedKeywords.length ? matchedKeywords : ['Communication', 'Delivery', 'Problem solving'],
  };
}

function buildMentorFallback(message = '') {
  const normalized = message.toLowerCase();
  if (normalized.includes('resume')) {
    return 'Your resume should emphasize measurable outcomes, implementation details, and one standout project that matches the role you want.';
  }
  if (normalized.includes('roadmap') || normalized.includes('next')) {
    return 'Your next move is to deepen one technical skill, ship one visible project, and tighten your story around impact.';
  }
  if (normalized.includes('interview')) {
    return 'Practice one STAR answer and one system design review each day so your confidence grows steadily.';
  }
  return 'Consistency beats intensity. A focused 60-minute session today will compound into better opportunities tomorrow.';
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
      ...options,
    });

    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error((data as { message?: string }).message || 'Request failed');
    }

    return data as T;
  } catch (error) {
    if (path === '/resume/analyze') {
      const body = options.body ? JSON.parse(String(options.body)) : {};
      return buildResumeFallback(body.resumeText || '') as T;
    }

    if (path === '/mentor/chat') {
      const body = options.body ? JSON.parse(String(options.body)) : {};
      return { reply: buildMentorFallback(body.message || '') } as T;
    }

    throw error;
  }
}

export async function signupUser(payload: { name: string; email: string; password: string; role?: string }) {
  return request<{ token: string; user: { id: string; name: string; email: string; role: string } }>('/auth/signup', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function loginUser(payload: { email: string; password: string }) {
  return request<{ token: string; user: { id: string; name: string; email: string; role: string } }>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function getTwin(userId: string) {
  return request(`/twin/${userId}`);
}

export async function generateRoadmap(skills: string[]) {
  return request<{ roadmap: string[] }>('/roadmap/generate', {
    method: 'POST',
    body: JSON.stringify({ skills }),
  });
}

export async function analyzeResume(resumeText?: string) {
  return request<{ atsScore: number; summary: string; strengths: string[]; gaps: string[]; suggestions: string[]; rating: string; focusAreas: string[]; matchedKeywords: string[] }>('/resume/analyze', {
    method: 'POST',
    body: JSON.stringify({ resumeText }),
  });
}

export async function chatWithMentor(message: string, context?: { atsScore?: number; focusAreas?: string[]; matchedKeywords?: string[] }) {
  return request<{ reply: string; suggestions?: string[] }>('/mentor/chat', {
    method: 'POST',
    body: JSON.stringify({ message, ...context }),
  });
}
