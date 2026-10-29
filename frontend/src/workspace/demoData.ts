import { Conversation } from './types';

const now = new Date();
const hoursAgo = (h: number) => new Date(now.getTime() - h * 3600000);

export const demoConversations: Conversation[] = [
  {
    id: 'conv-1',
    title: 'Website Landing Page Copy',
    createdAt: hoursAgo(1),
    updatedAt: hoursAgo(0.5),
    messages: [
      {
        id: 'm1',
        role: 'user',
        content: 'Help me write a compelling hero section for a SaaS landing page. The product is a project management tool for remote teams.',
        timestamp: hoursAgo(1),
      },
      {
        id: 'm2',
        role: 'assistant',
        content: "Here's a refined hero section for your SaaS landing page:\n\n**Headline:** *Your Team. One Workspace.*\n\n**Subheadline:** Stop juggling tools. Manage projects, communicate in context, and ship faster — all from a single focused workspace built for remote teams.\n\n**CTA:** Start for free — 14-day trial, no credit card required.\n\nThis opening uses a contrast structure (problem → solution) and anchors trust with a low-friction CTA. The copy is direct without being generic.",
        timestamp: hoursAgo(0.9),
      },
      {
        id: 'm3',
        role: 'user',
        content: 'Can you give me a version that emphasizes speed and delivery?',
        timestamp: hoursAgo(0.8),
      },
      {
        id: 'm4',
        role: 'assistant',
        content: "Absolutely. Here's a speed-focused variant:\n\n**Headline:** *Ship faster. Together.*\n\n**Subheadline:** From kickoff to delivery — keep your remote team aligned, focused, and moving without the overhead.\n\n**CTA:** Get started free\n\nThis version uses active, momentum-forward language and removes friction from the subheadline. Works well if your ICP values execution over coordination.",
        timestamp: hoursAgo(0.7),
      },
    ],
  },
  {
    id: 'conv-2',
    title: 'Resume Summary Prompt',
    createdAt: hoursAgo(5),
    updatedAt: hoursAgo(4.5),
    messages: [
      {
        id: 'm5',
        role: 'user',
        content: 'Write a prompt that generates a professional resume summary for a senior frontend engineer with 8 years of experience.',
        timestamp: hoursAgo(5),
      },
      {
        id: 'm6',
        role: 'assistant',
        content: "Here's a well-structured prompt for that use case:\n\n```\nYou are a professional resume writer specializing in tech roles.\n\nWrite a 3–4 sentence professional summary for a Senior Frontend Engineer with 8 years of experience. The candidate:\n- Specializes in React, TypeScript, and performance optimization\n- Has led cross-functional teams of 4–8 engineers\n- Contributed to products used by 100K+ users\n- Values clean architecture and developer experience\n\nTone: Confident, specific, results-oriented. Avoid generic filler phrases.\nFormat: Plain paragraph, no bullet points.\n```\n\nThis prompt gives the model clear constraints, persona context, and tone guidance — resulting in more consistent output.",
        timestamp: hoursAgo(4.8),
      },
    ],
  },
  {
    id: 'conv-3',
    title: 'Python Debugging Assistant',
    createdAt: hoursAgo(24),
    updatedAt: hoursAgo(23),
    messages: [
      {
        id: 'm7',
        role: 'user',
        content: 'Create a system prompt for an AI debugging assistant that helps Python developers identify and fix bugs.',
        timestamp: hoursAgo(24),
      },
      {
        id: 'm8',
        role: 'assistant',
        content: "Here's a system prompt for a Python debugging assistant:\n\n```\nYou are an expert Python debugging assistant. When a developer shares code or describes a problem:\n\n1. Identify the root cause clearly and concisely\n2. Explain why the bug occurs (not just what it is)\n3. Provide a corrected code snippet\n4. Suggest one preventive practice to avoid this class of error in future\n\nRules:\n- Do not lecture. Be direct and practical.\n- If the error is ambiguous, ask one focused clarifying question.\n- Prefer idiomatic Python solutions.\n- Reference official docs or PEPs only when genuinely useful.\n```\n\nThis structure keeps responses actionable and avoids the common pitfall of overly verbose AI debugging output.",
        timestamp: hoursAgo(23.5),
      },
    ],
  },
  {
    id: 'conv-4',
    title: 'Research Assistant Setup',
    createdAt: hoursAgo(48),
    updatedAt: hoursAgo(47),
    messages: [
      {
        id: 'm9',
        role: 'user',
        content: 'I need a prompt that turns an AI into a research assistant for academic literature review.',
        timestamp: hoursAgo(48),
      },
      {
        id: 'm10',
        role: 'assistant',
        content: "Here's a research assistant prompt designed for literature review work:\n\n```\nYou are a rigorous academic research assistant. Your role is to help researchers:\n\n- Summarize papers clearly and objectively\n- Identify methodological strengths and weaknesses\n- Surface connections between related works\n- Flag potential gaps in the literature\n\nWhen analyzing a paper:\n1. Provide a structured summary: objective, method, findings, limitations\n2. Rate confidence in findings (high / medium / low) with brief justification\n3. Suggest 2–3 related works or research directions if relevant\n\nCommunication style: Academic but accessible. Precise, not pedantic.\n```\n\nThis is particularly effective for systematic reviews where consistent structure across many papers is critical.",
        timestamp: hoursAgo(47.5),
      },
    ],
  },
];
