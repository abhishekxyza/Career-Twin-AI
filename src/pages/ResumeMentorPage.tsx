import { useRef, useState } from 'react';
import { analyzeResume, chatWithMentor } from '../services/api';

interface ResumeMentorPageProps {
  onBackToDashboard?: () => void;
}

export default function ResumeMentorPage({ onBackToDashboard }: ResumeMentorPageProps) {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [resumeText, setResumeText] = useState('');
  const [message, setMessage] = useState('');
  const [analysisNotice, setAnalysisNotice] = useState('');
  const [mentorReply, setMentorReply] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const sampleResume = `Alex Chen
Software Engineer | React, Node.js, TypeScript

Experience
- Built a React dashboard that reduced reporting time by 35%.
- Led a backend migration to Node.js and TypeScript, improving reliability.
- Collaborated with design and product teams to ship features faster.

Skills
React, TypeScript, Node.js, API design, PostgreSQL, AWS, Docker
`;

  const handleAnalyze = async () => {
    if (!resumeText.trim()) {
      setAnalysisNotice('Paste a resume summary or upload a text-based resume to get started.');
      return;
    }

    setLoading(true);
    setAnalysisNotice('');
    try {
      const data = await analyzeResume(resumeText);
      setResult(data);
      setAnalysisNotice(`Analysis ready for ${uploadedFileName || 'your resume'}.`);
    } catch (error) {
      setAnalysisNotice(error instanceof Error ? error.message : 'Analysis failed');
    } finally {
      setLoading(false);
    }
  };

  const handleMentorChat = async () => {
    if (!message.trim()) return;
    try {
      const data = await chatWithMentor(message, {
        atsScore: result?.atsScore,
        focusAreas: result?.focusAreas,
        matchedKeywords: result?.matchedKeywords,
      });
      setMentorReply(data.reply);
      setAnalysisNotice(data.suggestions?.[0] || '');
    } catch (error) {
      setMentorReply(error instanceof Error ? error.message : 'Mentor chat failed');
    }
  };

  const handleFileRead = (file: File) => {
    if (!file) return;
    setUploadedFileName(file.name);

    if (file.name.toLowerCase().endsWith('.pdf')) {
      setAnalysisNotice('PDF uploads are detected, but this demo reads text-based files best. Paste the text directly or upload a .txt or .md file.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const content = typeof reader.result === 'string' ? reader.result : '';
      setResumeText((prev) => (prev ? `${prev}\n\n${content}` : content));
      setAnalysisNotice(`Loaded ${file.name}. You can review and refine the text before analyzing.`);
    };
    reader.onerror = () => setAnalysisNotice(`Could not read ${file.name}.`);
    reader.readAsText(file);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileRead(file);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragActive(false);
    const file = event.dataTransfer.files?.[0];
    if (file) {
      handleFileRead(file);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-8 text-slate-100">
      <div className="mx-auto max-w-6xl space-y-6">
        <header className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-cyan-400">Resume & mentor</p>
              <h2 className="mt-2 text-3xl font-semibold">Turn your profile into a sharper growth story.</h2>
              <p className="mt-2 text-slate-400">Analyze your resume, understand your gaps, and get focused guidance from your AI mentor.</p>
            </div>
            <button className="rounded-full border border-cyan-400/20 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-300" onClick={onBackToDashboard} type="button">
              Back to dashboard
            </button>
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-emerald-400">Resume analysis</p>
                <h3 className="mt-2 text-2xl font-semibold">ATS-ready insights</h3>
              </div>
              <button className="rounded-full bg-cyan-500 px-4 py-2 font-medium text-slate-950 transition hover:bg-cyan-400" onClick={handleAnalyze} type="button">
                {loading ? 'Analyzing...' : 'Analyze resume'}
              </button>
            </div>

            <div
              className={`mt-5 rounded-2xl border border-dashed p-4 transition ${dragActive ? 'border-cyan-400 bg-cyan-500/10' : 'border-white/10 bg-slate-900/70'}`}
              onDragEnter={(event) => {
                event.preventDefault();
                setDragActive(true);
              }}
              onDragOver={(event) => {
                event.preventDefault();
                setDragActive(true);
              }}
              onDragLeave={(event) => {
                event.preventDefault();
                setDragActive(false);
              }}
              onDrop={handleDrop}
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-100">Drag & drop a resume file</p>
                  <p className="text-sm text-slate-400">Supports .txt and .md files for richer parsing. PDF files are detected for preview.</p>
                </div>
                <button className="rounded-full border border-cyan-400/20 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-300" onClick={() => fileInputRef.current?.click()} type="button">
                  Choose file
                </button>
              </div>
              <input ref={fileInputRef} className="hidden" accept=".txt,.md,.json,.pdf" onChange={handleFileChange} type="file" />
              {uploadedFileName && <p className="mt-3 text-sm text-emerald-300">Loaded: {uploadedFileName}</p>}
              <button className="mt-3 rounded-full border border-white/10 bg-slate-950/60 px-3 py-2 text-sm text-slate-300" onClick={() => { setResumeText(sampleResume); setAnalysisNotice('Loaded a sample resume for demo mode.'); }} type="button">
                Use sample resume
              </button>
            </div>

            <textarea
              className="mt-5 min-h-40 w-full rounded-2xl border border-white/10 bg-slate-900/70 p-3 text-sm text-slate-200 outline-none"
              placeholder="Paste your resume summary or full resume text here..."
              value={resumeText}
              onChange={(event) => setResumeText(event.target.value)}
            />

            {result && (
              <div className="mt-6 space-y-4">
                <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-slate-400">ATS score</p>
                    <span className="rounded-full border border-cyan-400/20 bg-cyan-500/10 px-3 py-1 text-sm text-cyan-300">{result.rating}</span>
                  </div>
                  <p className="mt-2 text-3xl font-semibold">{result.atsScore}/100</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
                  <p className="text-sm text-slate-400">Summary</p>
                  <p className="mt-2 text-slate-300">{result.summary}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
                  <p className="text-sm text-slate-400">Matched keywords</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {result.matchedKeywords?.map((keyword: string) => (
                      <span key={keyword} className="rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1 text-sm text-emerald-300">{keyword}</span>
                    ))}
                  </div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
                  <p className="text-sm text-slate-400">Strengths</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {result.strengths.map((strength: string) => (
                      <span key={strength} className="rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1 text-sm text-emerald-300">{strength}</span>
                    ))}
                  </div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
                  <p className="text-sm text-slate-400">Focus areas</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {result.focusAreas.map((focusArea: string) => (
                      <span key={focusArea} className="rounded-full border border-amber-400/20 bg-amber-500/10 px-3 py-1 text-sm text-amber-300">{focusArea}</span>
                    ))}
                  </div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
                  <p className="text-sm text-slate-400">Suggested improvements</p>
                  <ul className="mt-2 list-disc space-y-2 pl-5 text-slate-300">
                    {result.suggestions.map((suggestion: string) => (
                      <li key={suggestion}>{suggestion}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {analysisNotice && (
              <div className="mt-4 rounded-2xl border border-white/10 bg-slate-900/70 p-4 text-sm text-slate-300">
                {analysisNotice}
              </div>
            )}
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-xl">
            <p className="text-sm uppercase tracking-[0.35em] text-fuchsia-400">AI mentor</p>
            <h3 className="mt-2 text-2xl font-semibold">Ask for guidance anytime</h3>
            <div className="mt-5 rounded-2xl border border-white/10 bg-slate-900/70 p-4">
              <textarea
                className="min-h-24 w-full rounded-2xl border border-white/10 bg-slate-950/60 p-3 text-sm outline-none"
                placeholder="Ask: What should I do next? How do I improve my resume?"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
              />
              <button className="mt-3 rounded-full bg-fuchsia-500 px-4 py-2 font-medium text-white transition hover:bg-fuchsia-400" onClick={handleMentorChat} type="button">
                Send to mentor
              </button>
            </div>
            {mentorReply && (
              <div className="mt-4 space-y-3 rounded-2xl border border-white/10 bg-slate-900/70 p-4 text-slate-300">
                <p>{mentorReply}</p>
                {result?.suggestions && (
                  <ul className="list-disc space-y-2 pl-5 text-sm text-slate-400">
                    {result.suggestions.map((suggestion: string) => (
                      <li key={suggestion}>{suggestion}</li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
