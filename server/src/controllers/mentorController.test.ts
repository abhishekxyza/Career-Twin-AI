import test from 'node:test';
import assert from 'node:assert/strict';
import { buildMentorReply } from './mentorController.js';

test('buildMentorReply uses resume context to generate tailored guidance', () => {
  const result = buildMentorReply('How should I improve my resume?', {
    atsScore: 78,
    focusAreas: ['ATS clarity', 'Impact framing'],
    matchedKeywords: ['react', 'typescript', 'node'],
  });

  assert.match(result.reply, /resume/i);
  assert.ok(result.suggestions.some((suggestion) => suggestion.toLowerCase().includes('bullet')));
});

test('buildMentorReply gives a roadmap-oriented answer for next-step questions', () => {
  const result = buildMentorReply('What should I do next?', {
    atsScore: 82,
    focusAreas: ['Role alignment'],
    matchedKeywords: ['python', 'backend'],
  });

  assert.match(result.reply, /next/i);
  assert.ok(result.suggestions.length > 0);
});
