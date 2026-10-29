# Prompt Studio — Master Product Requirements Document (PRD)

**Document Type:** Master PRD (Source of Truth)
**Project Type:** College Mini Project
**Status:** Living Document — contains confirmed requirements, recommendations, and explicitly marked open decisions
**Version:** 1.0 (Draft)

---

## How to Read This Document

This PRD uses the following labels throughout so that no reader — human or AI agent — mistakes an assumption for a locked requirement:

| Label | Meaning |
|---|---|
| **[CONFIRMED]** | Directly stated or unambiguously implied by the product owner. Treat as fixed. |
| **[RECOMMENDED]** | This document's suggestion. Sensible default, but not yet approved. |
| **[TBD — Requires Research]** | Needs external investigation (e.g., evaluation rubric categories, library choices). |
| **[TBD — Requires Team Decision]** | Needs a decision from the project team; not a research question, a judgment call. |
| **[OUT OF SCOPE]** | Explicitly excluded from the current build. |
| **[FUTURE SCOPE]** | Plausible later capability; not part of the current mini-project deliverable. |

This document defines **what** Prompt Studio is and **how it should behave**. It intentionally does **not** define a sprint plan, file/folder structure, API route list, or coding sequence. That belongs in a separate Implementation Plan derived from this PRD.

---

## 1. Product Overview

### 1.1 Product Name
**Prompt Studio** **[CONFIRMED]**

### 1.2 One-Line Description
A general-purpose conversational AI chat application, similar in spirit to ChatGPT, with one distinguishing capability: a prompt can be uploaded once and remains persistently attached to a conversation, so the user can discuss, revisit, and evaluate it at any later point without re-pasting it. **[CONFIRMED]**

### 1.3 What Prompt Studio Is Not
- It is **not** a single-purpose "prompt grading tool." **[CONFIRMED]**
- It does **not** have a dedicated "Evaluate" button. **[CONFIRMED]**
- It does **not** automatically rewrite or "fix" an uploaded prompt on its own initiative. **[CONFIRMED]**
- It is **not** intended to be a large enterprise-grade platform. It is a scoped, demonstrable academic project. **[CONFIRMED]**

### 1.4 Elevator Pitch
Prompt Studio behaves like a normal AI chat assistant for everything a user might want to discuss. When a user chooses to, they can attach a prompt — as text or a file — to the current conversation. That prompt then becomes a durable part of the conversation's context, the way a pinned document would be. Later, in ordinary conversational language, the user can ask the AI to look at, discuss, or evaluate that prompt, and the AI responds using both the prompt itself and everything relevant said earlier in the conversation. Evaluation, when it happens, is explainable — it tells the user what is strong, what is weak, and why — rather than simply returning a score or silently rewriting their work.

---

## 2. Product Vision

### 2.1 Vision Statement
**[CONFIRMED / RECOMMENDED PHRASING]**
Prompt Studio should feel like one coherent, continuous AI assistant that happens to be very good at remembering and reasoning about prompt artifacts the user cares about — never like a chatbot bolted onto a separate "evaluator tool."

### 2.2 Core Product Insight
The unique value is **not** "an AI that can evaluate prompts" — any general chatbot can already do that if the prompt is pasted in. The unique value is **persistent, conversation-scoped context**: the user uploads once, and the artifact stays available for reference across an arbitrarily long conversation, without the user needing to manage or re-supply it. **[CONFIRMED]**

### 2.3 Product Pillars
1. **General-purpose chat first.** The chatbot must be fully usable and valuable even for a user who never uploads a prompt. **[CONFIRMED]**
2. **Persistent context, not repeated pasting.** Once attached, a prompt is a durable object tied to the conversation. **[CONFIRMED]**
3. **Conversational, not modal, evaluation.** No dedicated evaluation UI flow; evaluation is triggered by natural language inside the same chat. **[CONFIRMED]**
4. **Explainable feedback, not silent correction.** The AI explains reasoning; it does not unilaterally rewrite the user's prompt. **[CONFIRMED]**
5. **Right-sized scope.** Meaningful enough to demonstrate real systems knowledge (auth, DB, RAG, file handling) without inflating into an unrealistic build. **[CONFIRMED]**

---

## 3. Goals and Non-Goals

### 3.1 Product Goals **[CONFIRMED]**
- Provide a working general-purpose AI chat experience with persistent conversation history per user.
- Allow a user to optionally attach one or more prompts (as text or file) to a conversation.
- Keep an attached prompt available as context for the rest of that conversation's lifetime.
- Let the AI recognize, in natural conversation, when the user is referring to an attached prompt.
- Let the AI conversationally gather missing context before attempting a meaningful evaluation.
- Provide evaluation feedback that is explainable and grounded in a defined rubric and a supporting knowledge base (RAG).
- Keep the system secure and correctly isolated per authenticated user.
- Remain implementable and demonstrable as a college mini project.

### 3.2 Non-Goals **[CONFIRMED — Out of Scope for current version]**
- Automatic prompt rewriting/optimization as a core, unprompted behavior.
- A dedicated "Evaluate Prompt" button or standalone evaluation screen.
- Multi-tenant enterprise features (org accounts, billing, admin roles, SSO beyond Google).
- Prompt marketplace, sharing between different users, or public prompt libraries.
- Real-time multi-user collaboration inside a single conversation.
- Support for AI providers other than Google Gemini in the current build.

---

## 4. Target Users and Personas

### 4.1 Primary Target Users **[RECOMMENDED — validate with team]**
Given this is an academic mini project, the realistic primary audience is:
- Students and developers who write prompts for their own AI-assisted projects and want feedback on prompt quality.
- Prompt engineering learners who want an assistant that remembers what they're iterating on.
- Evaluators/reviewers (e.g., professors, hackathon judges) assessing the project's functional depth.

### 4.2 Illustrative Personas **[RECOMMENDED, non-binding]**

**Persona A — "The Builder"**
A student building an AI feature for their own project. Writes a system prompt for a chatbot, wants a second opinion, and expects to keep refining it across a session without re-pasting the whole thing each time.

**Persona B — "The Learner"**
Someone newer to prompt engineering who doesn't fully know what makes a prompt "good." Needs the AI to ask clarifying questions rather than assume intent, and needs feedback that teaches, not just scores.

**Persona C — "The Reviewer"**
Uses the product briefly, mainly to see whether the conversational-evaluation and persistent-context mechanics actually work as claimed — relevant for viva/demo scenarios.

### 4.3 Explicit Note on Personas
Personas here are illustrative to guide UX tone and are **not** a market-research output. **[CONFIRMED framing]**

---

## 5. Core User Journeys

### 5.1 Journey 1 — Pure Chat, No Prompt Involved **[CONFIRMED behavior]**
1. User logs in with Google.
2. User starts a new conversation.
3. User asks a general question ("Explain Retrieval-Augmented Generation").
4. AI answers normally. No prompt-related behavior is triggered.
5. Conversation is saved to history and can be resumed later.

### 5.2 Journey 2 — Attaching a Prompt Mid-Conversation **[CONFIRMED behavior]**
1. User is in an ongoing (or new) conversation.
2. User selects "Upload Prompt."
3. User either pastes text or attaches a file (PDF/DOC/DOCX/TXT/image).
4. System stores the prompt and associates it with the current conversation, without requiring the user to label or classify it.
5. Conversation continues normally.

### 5.3 Journey 3 — Referring Back to the Prompt Later **[CONFIRMED behavior]**
1. Much later in the same conversation (or after returning to it in a new session), the user says something like "Can you take a look at the prompt I uploaded?"
2. The AI recognizes the reference to the attached prompt without the user re-pasting it.
3. AI responds appropriately — acknowledging the prompt, asking for missing context, or discussing it, depending on what's needed.

### 5.4 Journey 4 — Requesting Evaluation Conversationally **[CONFIRMED behavior]**
1. User says, in plain language, something like "Evaluate this" or "Is this prompt good?"
2. AI determines whether enough context exists (from the prompt itself + conversation history) to evaluate meaningfully.
3. If context is insufficient, AI asks targeted clarifying questions.
4. Once sufficient, AI performs evaluation against the (TBD) rubric, using RAG-retrieved prompt-engineering knowledge, and responds with explainable feedback — not a rewritten prompt, not a bare score.

### 5.5 Journey 5 — Iterating After Evaluation **[CONFIRMED behavior]**
1. User manually edits their prompt outside or inside the chat and shares the revised version (as new text or a new file).
2. User asks whether the new version is better.
3. AI compares using conversation history, the newly shared version, and (if still associated) the earlier version, and responds conversationally.
4. This may relate to the "multiple prompts per conversation" capability (see Section 9).

### 5.6 Journey 6 — Returning to an Old Conversation **[CONFIRMED behavior]**
1. User logs in on a different day.
2. User opens conversation history, selects an old conversation.
3. Any prompt(s) attached earlier are still associated and usable as context.
4. User continues chatting as if no time had passed.

---

## 6. Functional Requirements

### 6.1 Authentication **[CONFIRMED]**
- FR-1: The system must support Google Authentication (OAuth) as the login method.
- FR-2: Username/password authentication is **not** the primary mechanism and is not required. **[CONFIRMED]**
- FR-3: Each authenticated user must have an isolated account scope — their conversations, messages, and prompt attachments must not be visible or accessible to any other user.
- FR-4: A session must reliably resolve to exactly one authenticated user identity for all reads/writes.

### 6.2 Conversation Management **[CONFIRMED]**
- FR-5: A user can create a new conversation.
- FR-6: A user can view a list of their own past conversations (chat history), similar in concept to ChatGPT's sidebar.
- FR-7: A user can resume any past conversation and continue chatting with full context retained.
- FR-8: Each conversation stores its own messages, independent of other conversations.
- FR-9: Each conversation can optionally have one or more prompt attachments associated with it (see Section 9).
- FR-10: **[RECOMMENDED]** Conversations should support basic management actions such as rename and delete. Exact scope of these actions is **[TBD — Requires Team Decision]**.

### 6.3 General Chat Behavior **[CONFIRMED]**
- FR-11: The system must function as a fully general-purpose AI chatbot; general questions must be answerable without any prompt attachment ever existing.
- FR-12: The AI must not force, suggest unprompted, or interrupt normal conversation with prompt-evaluation behavior unless the user's message reasonably indicates they want it.
- FR-13: The AI must maintain conversational coherence — a single mental model of "the conversation" — regardless of whether prompt-related or general-chat behavior is active at a given turn.

### 6.4 Prompt Upload **[CONFIRMED]**
- FR-14: Prompt upload must be optional and explicitly user-initiated (e.g., via an "Upload Prompt" action), never automatic or forced.
- FR-15: The upload interface must accept prompt content as:
  - Pasted/typed text (a text area), and
  - A file: at minimum PDF, TXT, DOC/DOCX, and image/screenshot formats. **[CONFIRMED set of formats; exact final list is [TBD — Requires Team Decision] — see 6.4.1]**
- FR-16: The user must **not** be required to classify or label what they are uploading (e.g., must not be forced to pick "this is a prompt" vs. "this is a document").
- FR-17: An uploaded prompt (text or file-derived) must be persisted and linked to the specific conversation it was added in.
- FR-18: The system must extract usable text content from non-text file formats (PDF, DOC/DOCX, image) so that the content can be used as AI context. Exact extraction library/approach is an implementation decision, not defined here.

#### 6.4.1 Open Sub-Decision — File Format List **[TBD — Requires Team Decision]**
The final authoritative list of accepted file types, and any per-type size limits, must be explicitly decided before implementation. This PRD only asserts that PDF, TXT, DOC/DOCX, and image formats are the **baseline expectation**.

### 6.5 Persistent Prompt Context **[CONFIRMED]**
- FR-19: Once attached, a prompt must remain associated with its conversation indefinitely (i.e., across sessions, not just the current browser session), unless explicitly removed by the user.
- FR-20: The AI must be able to retrieve and use an attached prompt as context without the user needing to re-paste or re-upload it.
- FR-21: The system must be able to resolve natural-language references to "the prompt," "my prompt," "the one I uploaded," etc., to the correct attached artifact(s) within that conversation.
- FR-22: **[RECOMMENDED]** If a conversation has multiple attached prompts (see Section 9) and the user's reference is ambiguous, the AI should ask which one they mean rather than guessing silently.

### 6.6 Multiple Prompts Per Conversation **[CONFIRMED as a design consideration, scope-limited]**
- FR-23: The data model and conversation logic must be designed so that a conversation **can** hold more than one attached prompt (e.g., versions V1, V2, V3).
- FR-24: **[CONFIRMED]** Full "prompt version comparison" as a polished feature is **not** guaranteed for the current build — it is explicitly marked **[FUTURE SCOPE]** for feature depth, while the underlying data model **[CONFIRMED]** must not block it.
- FR-25: **[TBD — Requires Team Decision]** Whether the current build's UI should visibly support multiple simultaneous attachments, or whether multiplicity is handled purely at the data layer for now.

### 6.7 Conversational Prompt Evaluation **[CONFIRMED]**
- FR-26: There must be no dedicated "Evaluate" button or standalone evaluation mode/screen.
- FR-27: The AI must recognize evaluation intent from natural user language (e.g., "evaluate this," "is this a good prompt," "what's wrong with it," "how can I improve this").
- FR-28: Before evaluating, the AI must assess whether it has sufficient context (from the prompt content + prior conversation) to produce a meaningful evaluation.
- FR-29: If context is insufficient, the AI must ask conversational clarifying questions (e.g., about purpose, audience, constraints, desired output) rather than evaluating blindly or refusing outright.
- FR-30: The AI must not re-ask for information already present earlier in the conversation.
- FR-31: Evaluation output must be explainable: it must describe strengths, weaknesses, missing elements, and reasoning — not just a score.
- FR-32: The AI must **not** automatically rewrite the user's prompt as part of a default evaluation response.
- FR-33: If the user explicitly asks the AI to rewrite or improve the prompt as a separate, deliberate request, that is treated as an ordinary AI chat capability, distinct from the evaluation behavior itself.

### 6.8 Context Assembly Logic **[CONFIRMED]**
- FR-34: When responding — especially when evaluating — the AI must be able to draw on three context sources: (A) the attached prompt content, (B) the current user message, and (C) relevant prior conversation turns.
- FR-35: The system must avoid redundant context-gathering when the needed information is already present in (B) or (C).
- FR-36: **[TBD — Requires Team Decision]** The exact strategy for selecting "relevant prior conversation turns" (full history vs. summarized history vs. recency window) is an implementation-level decision but must be explicitly made — it cannot be silently defaulted to "entire raw history" without consideration of token/cost limits.

### 6.9 RAG-Backed Evaluation Knowledge **[CONFIRMED]**
- FR-37: The system must maintain a curated knowledge base of prompt-engineering principles, guidelines, and best practices to ground evaluation responses.
- FR-38: When an evaluation is triggered, the system should retrieve relevant knowledge-base content and supply it to the LLM as grounding context.
- FR-39: RAG retrieval must **not** be invoked for ordinary, non-evaluation conversation turns (to avoid unnecessary cost/latency and irrelevant grounding).
- FR-40: The knowledge base content and its curation process are **[TBD — Requires Research]**; this PRD establishes the requirement for a knowledge base, not its final contents.

### 6.10 Evaluation Rubric **[CONFIRMED requirement; content TBD]**
- FR-41: The system must evaluate prompts against a defined, consistent rubric rather than ad hoc, non-repeatable criteria.
- FR-42: **[TBD — Requires Research]** The final rubric categories are not yet locked. Candidate categories to research and validate include (non-exhaustive, non-final): clarity, context sufficiency, specificity, goal alignment, constraint definition, output format requirements, ambiguity, completeness, audience definition, and instruction quality.
- FR-43: **[TBD — Requires Team Decision]** How rubric categories map to the AI's response structure (e.g., always addressed as a checklist vs. addressed narratively as relevant) needs a decision once the rubric is locked.
- FR-44: The rubric must be applied consistently enough that evaluating the same prompt twice, with the same context, produces substantively similar feedback (allowing for natural language variation).

---

## 7. Non-Functional Requirements

### 7.1 Security & Privacy **[CONFIRMED]**
- NFR-1: Each user's conversations, messages, prompt attachments, and evaluation history must be strictly isolated from every other user.
- NFR-2: All API keys (Google OAuth secrets, Gemini API key, any other credentials) must be kept server-side and must never be exposed in frontend code or client-visible responses.
- NFR-3: Uploaded files must be validated (type and reasonable size) before processing, to reduce risk from malformed or malicious uploads.
- NFR-4: User input must be validated/sanitized before storage or use in downstream prompts sent to the LLM, with awareness of prompt-injection risk from uploaded content. **[RECOMMENDED — see Section 15 Risks]**
- NFR-5: Authentication must rely on Google's OAuth flow rather than custom credential storage, reducing the system's exposure to password-related vulnerabilities.

### 7.2 Reliability & Correctness **[RECOMMENDED]**
- NFR-6: The system should gracefully handle cases where file text extraction fails or produces unusable output (see Section 13, Edge Cases).
- NFR-7: The system should gracefully handle LLM or RAG service failures without losing the user's conversation state.

### 7.3 Usability **[CONFIRMED / RECOMMENDED]**
- NFR-8: The interface should be clean, modern, and minimal, consistent with the usability conventions of current mainstream AI chat products. **[CONFIRMED intent]**
- NFR-9: The prompt-upload interaction should be low-friction — a small number of steps, no forced classification (per FR-16).
- NFR-10: Evaluation responses should be readable and well-structured (e.g., organized narrative or lightweight formatting) rather than a wall of undifferentiated text. **[RECOMMENDED]**

### 7.4 Performance **[RECOMMENDED — thresholds TBD]**
- NFR-11: Ordinary chat responses and evaluation responses should return within a reasonable, demo-appropriate latency window. Specific numeric targets are **[TBD — Requires Team Decision]**, since they depend on Gemini model choice and RAG retrieval overhead.

### 7.5 Maintainability & Demonstrability **[CONFIRMED — project-specific]**
- NFR-12: The system's architecture should remain modular enough that each major subsystem (auth, chat, prompt storage, RAG, evaluation) can be explained independently during an academic viva/demo.
- NFR-13: The system should avoid unnecessary architectural complexity relative to what a mini project needs to demonstrate its concepts credibly.

---

## 8. AI Behavior Specification

### 8.1 Single-Assistant Mental Model **[CONFIRMED]**
The AI must behave as one continuous assistant across all interaction types (general chat, prompt discussion, evaluation, context-gathering). There should be no user-visible "mode switch" — the transition between behaviors must be implicit and conversational, driven by user intent recognition.

### 8.2 Intent Recognition Requirements **[CONFIRMED, mechanism TBD]**
- The AI must distinguish, turn by turn, between:
  1. Ordinary conversation not related to any attached prompt.
  2. A reference to an attached prompt without a request for evaluation (e.g., "what does this prompt say again," "summarize it").
  3. A request for evaluation.
  4. A request to modify/rewrite the prompt (treated as ordinary AI capability per FR-33, not the evaluation flow).
- **[TBD — Requires Team Decision]** Whether intent recognition is handled via prompting the LLM directly with the full conversation context (recommended for a mini project's scope) versus a separate intent-classification step. **[RECOMMENDED]**: rely on the LLM's own reasoning over conversation context rather than building a bespoke classifier, to keep scope realistic.

### 8.3 Context-Gathering Behavior **[CONFIRMED]**
- The AI should ask only for information it does not already have.
- Clarifying questions should be natural and conversational, not a rigid fixed questionnaire (per Section 11 of the source brief — "do not hardcode one exact conversation").
- The AI should be able to proceed with evaluation using reasonable assumptions **only when explicitly appropriate**; by default, missing critical context (purpose, audience) should be asked about rather than silently assumed, since evaluation quality depends on it. **[RECOMMENDED]**

### 8.4 Evaluation Response Behavior **[CONFIRMED]**
- Must reference specific aspects of the prompt (not generic, templated feedback).
- Must explain *why* something is a strength or weakness, not just label it.
- Must not include an unsolicited rewritten version of the prompt.
- Should reference the rubric categories relevant to that specific prompt, once the rubric is finalized (FR-42).

---

## 9. Data Requirements

### 9.1 Core Entities **[CONFIRMED — conceptual, not schema-level]**
This section defines *what kinds of data* must exist, not the final database schema (which is an implementation decision).

- **User** — identity from Google OAuth; owns conversations.
- **Conversation** — belongs to exactly one user; has a title/label; contains messages; may contain zero or more prompt attachments.
- **Message** — belongs to exactly one conversation; has a role (user/AI) and content; ordered within the conversation.
- **Prompt Attachment** — belongs to exactly one conversation; has source content (raw text, or extracted text from a file) and, if file-based, metadata (original filename, file type). Must support the possibility of multiple attachments per conversation (FR-23).
- **Knowledge Base Entry (RAG)** — independent of user/conversation; used only for evaluation grounding; curated by the project team, not user-generated.

### 9.2 Data Relationships **[CONFIRMED]**
- One User → Many Conversations.
- One Conversation → Many Messages.
- One Conversation → Zero or More Prompt Attachments.
- Prompt Attachments are **never** shared across conversations or across users. **[CONFIRMED]**

### 9.3 Data Not Yet Defined **[TBD — Requires Team Decision]**
- Whether prompt attachments store only extracted text, or also retain the original file (and where).
- Retention/deletion policy for uploaded files and extracted text.
- Whether evaluation results are stored as distinct records or simply exist as ordinary AI messages within the conversation.

---

## 10. RAG Architecture Requirements

### 10.1 Purpose **[CONFIRMED]**
RAG exists solely to ground prompt evaluation in a consistent, curated body of prompt-engineering knowledge — it is a supporting subsystem, not the product's centerpiece.

### 10.2 Required Behavior **[CONFIRMED]**
- RAG retrieval must be triggered only in evaluation-relevant contexts (FR-39), not on every chat turn.
- Retrieved content must be usable as grounding context supplied to the Gemini LLM alongside the user's prompt and conversation context.
- The knowledge base must be curated by the team rather than sourced live/uncontrolled from the open web, to keep evaluation guidance consistent. **[RECOMMENDED]**

### 10.3 Open Items **[TBD — Requires Research]**
- Final content/sources for the knowledge base.
- Chunking strategy for knowledge base documents.
- Retrieval count (top-k) and relevance thresholds.
- Whether retrieved knowledge is shown to the user (transparency) or used silently as backend grounding. **[TBD — Requires Team Decision]**

---

## 11. Technology Stack (As Currently Intended)

**[CONFIRMED as current direction; PRD does not mandate changes unless a strong technical reason exists]**

| Layer | Technology |
|---|---|
| Frontend | HTML5, CSS3, JavaScript |
| Backend | Python, Flask |
| Database | MongoDB / MongoDB Atlas |
| Authentication | Google Authentication (OAuth) |
| AI / LLM | Google Gemini (specific model TBD at implementation time) |
| Embeddings | Gemini Embedding models |
| Vector Database | ChromaDB |
| RAG Pipeline | Python-based, using Gemini embeddings + ChromaDB + Gemini LLM |
| File Processing | Python-based extraction libraries (specific choice TBD) |
| Version Control | Git, GitHub |

**Note:** This PRD deliberately does not pin a specific Gemini model name, since model availability changes over time; the architecture should allow model selection to be an implementation-time decision. **[CONFIRMED]**

---

## 12. Security & Privacy Requirements (Detailed)

**[CONFIRMED set of concerns; specific controls partly RECOMMENDED]**

- User data isolation must be enforced at the data-access layer, not just the UI layer (i.e., queries must always be scoped to the authenticated user's ID, not filtered only on the frontend).
- Google OAuth tokens/secrets must never be committed to source control or exposed to the client beyond what Google's flow requires.
- The Gemini API key must be used only server-side.
- Uploaded files must be checked for type and reasonable size before processing; unsupported or oversized files must be rejected with a clear message rather than silently failing.
- Extracted text from files (especially images via OCR, if used) should be treated as untrusted input when constructing prompts sent to the LLM, to reduce prompt-injection risk from malicious file content. **[RECOMMENDED — flagged as a risk in Section 15]**
- No user should be able to enumerate, guess, or access another user's conversation IDs and retrieve their content.

---

## 13. Error Handling & Edge Cases

**[CONFIRMED requirement to address these; specific handling strategy is partly RECOMMENDED / TBD]**

| Edge Case | Required Handling |
|---|---|
| User asks to "evaluate" with no prompt attached in the conversation | AI must clarify no prompt is currently attached and invite the user to upload one — must not hallucinate an evaluation. **[CONFIRMED]** |
| User references "the prompt" but multiple prompts are attached | AI should ask which one is meant (FR-22). **[RECOMMENDED]** |
| Uploaded file fails text extraction (e.g., corrupted PDF, unreadable scan) | System must inform the user extraction failed and request an alternative (re-upload, paste text). **[RECOMMENDED]** |
| Prompt content is extremely large | **[TBD — Requires Team Decision]** — needs a policy on truncation, summarization, or size limits relative to model context window. |
| User uploads something that is clearly not a prompt (e.g., a resume) | System should not force a rejection outright — per FR-16, the system doesn't require classification — but the AI's evaluation behavior should recognize when content isn't meaningfully evaluable "as a prompt" and say so conversationally rather than fabricating an evaluation. **[RECOMMENDED]** |
| Gemini API or ChromaDB is temporarily unavailable | System should fail gracefully with a user-facing error rather than corrupting conversation state. **[RECOMMENDED]** |
| User has zero conversations (first-time login) | System should present an empty, inviting state, not an error. **[RECOMMENDED]** |

---

## 14. System Boundaries

### 14.1 In Scope **[CONFIRMED]**
- Single-user-per-account general chat with persistent history.
- Optional prompt attachment (text or file) per conversation.
- Persistent, conversation-scoped prompt context.
- Conversational (non-modal) prompt evaluation with clarifying-question behavior.
- RAG-grounded evaluation using a curated knowledge base.
- Google OAuth-based authentication and per-user data isolation.

### 14.2 Out of Scope (Current Version) **[CONFIRMED]**
- Cross-user prompt sharing or a public prompt gallery.
- Automatic, unsolicited prompt rewriting.
- A dedicated evaluation UI/mode separate from chat.
- Team/organization accounts, roles, or billing.
- Non-Gemini model providers.
- Real-time collaborative editing within a conversation.

### 14.3 Future Scope (Explicitly Deferred) **[FUTURE SCOPE]**
- Rich prompt-version comparison UI (V1 vs V2 vs V3 diffing).
- User-triggered, explicit "generate an improved version" workflow as a distinct, opt-in feature (still not automatic).
- Exportable evaluation reports.
- Analytics on prompt-quality trends over time for a given user.

---

## 15. Risks and Open Questions

### 15.1 Risks **[RECOMMENDED — flagged for team awareness]**
- **Prompt injection via uploaded files:** malicious content embedded in an uploaded file could attempt to manipulate the LLM's behavior when its extracted text is included in context. Needs a mitigation approach before implementation.
- **Context window limits:** long conversations plus large attached prompts plus RAG-retrieved content could exceed the practical context window of the chosen Gemini model; needs a context-assembly strategy (FR-36).
- **Rubric inconsistency:** without a finalized, validated rubric, evaluation quality may vary unpredictably between sessions; this is explicitly acknowledged and marked TBD rather than papered over.
- **Scope creep:** the "multiple prompts" and "future scope" capabilities could tempt the team into overbuilding for a mini project; PRD explicitly bounds current scope in Section 14.

### 15.2 Open Questions Requiring Team Decisions **[TBD — Requires Team Decision, consolidated]**
1. Final list of supported file formats and size limits (6.4.1).
2. Whether multiple prompt attachments are UI-visible now or data-layer-only for now (FR-25).
3. Strategy for selecting relevant prior conversation history for context assembly (FR-36).
4. How rubric categories map to response structure once finalized (FR-43).
5. Whether RAG-retrieved knowledge is shown to the user or used silently (10.3).
6. Retention/deletion policy for uploaded files (9.3).
7. Whether evaluation results are stored as distinct records or plain messages (9.3).
8. Numeric performance/latency targets (NFR-11).

### 15.3 Open Questions Requiring Research **[TBD — Requires Research, consolidated]**
1. Final evaluation rubric categories and their definitions (FR-42).
2. Sourcing and curation process for the RAG knowledge base (FR-40, 10.3).
3. Chunking and retrieval configuration for the RAG pipeline (10.3).
4. Best-fit Python libraries for text extraction across PDF/DOC/DOCX/image formats (FR-18).

---

## 16. Acceptance Criteria (Product-Level)

**[CONFIRMED — high-level; detailed test cases belong in a separate QA/implementation artifact]**

A build satisfies this PRD's core intent if, at minimum:

- AC-1: A user can log in with Google and see only their own conversations.
- AC-2: A user can have a fully normal AI conversation without ever uploading a prompt.
- AC-3: A user can attach a prompt (text or file) to a conversation without being forced to classify it.
- AC-4: After attaching a prompt and sending several unrelated messages, the user can refer back to "the prompt I uploaded" and the AI correctly identifies and uses it — without the user re-pasting it.
- AC-5: Asking the AI to "evaluate" the prompt, when context is insufficient, results in clarifying questions rather than a shallow or fabricated evaluation.
- AC-6: A completed evaluation explains strengths, weaknesses, and reasoning, and does not include an unsolicited rewritten prompt.
- AC-7: RAG retrieval is demonstrably used to ground evaluation responses (verifiable during a technical walkthrough/demo).
- AC-8: No user can access another user's conversations or prompt attachments, verified via basic access-control testing.
- AC-9: Closing and reopening the app (new session) preserves conversation history and prompt attachments correctly.

---

## 17. Dependencies

**[CONFIRMED]**
- Google OAuth service availability and correct app credentials.
- Google Gemini API availability, quota, and model access.
- Gemini Embedding model availability for RAG.
- ChromaDB (self-hosted or embedded) for vector storage.
- MongoDB Atlas (or equivalent) availability.
- Python libraries for file/text extraction (specific packages TBD).

---

## 18. Glossary

- **Prompt Attachment** — A piece of prompt content (text or file-derived) uploaded by the user and persistently linked to a specific conversation.
- **Persistent Prompt Context** — The property that an attached prompt remains available to the AI as context for the lifetime of its conversation, without needing to be resupplied.
- **Conversational Evaluation** — The product's approach of triggering prompt evaluation via natural language within ordinary chat, rather than through a dedicated UI action.
- **Rubric** — The (currently TBD) formal set of criteria used to evaluate a prompt consistently.
- **RAG (Retrieval-Augmented Generation)** — The pipeline that retrieves relevant prompt-engineering knowledge from a curated knowledge base to ground the LLM's evaluation output.

---

## 19. Summary for Downstream Readers

Any developer, designer, or AI coding agent picking up this PRD should understand:

1. Build a real general-purpose AI chatbot first — it must stand on its own.
2. Add optional, persistent, conversation-scoped prompt attachment on top of it.
3. Never gate evaluation behind a dedicated button — it must emerge from natural conversation.
4. Never let the AI silently rewrite a user's prompt as default evaluation behavior.
5. Ground evaluation in a rubric and a RAG knowledge base — both currently **unfinished** and marked TBD, not to be invented ad hoc by whoever implements next.
6. Respect the many **[TBD]** markers throughout this document — they are deliberate gaps, not oversights, and must be resolved by research or team decision before or during implementation, not silently assumed away.

This document defines product requirements and behavior only. The Implementation Plan (architecture diagrams, API contracts, database schema, sprint breakdown) is a separate, subsequent deliverable.
