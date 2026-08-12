"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

type Source = { title: string; url: string; kind: string };
type Message = { role: "user" | "assistant"; content: string; sources?: Source[]; error?: boolean };
type AdmissionState = "idle" | "open" | "sending" | "sent";

const welcome: Message = {
  role: "assistant",
  content: "Hello! I can help with Creative All Stars Academy classes, learning, activities, admissions and location. What would you like to know?",
};

const suggestions = ["Which classes does the school offer?", "How do I apply for admission?", "Where is the school located?"];

function renderInlineMarkdown(text: string) {
  return text.split(/(\*\*[^*\n]+\*\*)/g).map((part, index) =>
    part.startsWith("**") && part.endsWith("**")
      ? <strong key={index}>{part.slice(2, -2)}</strong>
      : part,
  );
}

function ChatMessageContent({ content }: { content: string }) {
  const lines = content.split(/\r?\n/);
  const blocks = [];

  for (let index = 0; index < lines.length;) {
    const line = lines[index].trim();
    if (!line) {
      index += 1;
      continue;
    }

    const bullet = line.match(/^[-*]\s+(.+)$/);
    const numbered = line.match(/^\d+[.)]\s+(.+)$/);
    if (bullet || numbered) {
      const ordered = Boolean(numbered);
      const items: string[] = [];
      while (index < lines.length) {
        const itemLine = lines[index].trim();
        const match = ordered
          ? itemLine.match(/^\d+[.)]\s+(.+)$/)
          : itemLine.match(/^[-*]\s+(.+)$/);
        if (!match) break;
        items.push(match[1]);
        index += 1;
      }
      const List = ordered ? "ol" : "ul";
      blocks.push(<List key={`list-${index}`}>{items.map((item, itemIndex) =>
        <li key={itemIndex}>{renderInlineMarkdown(item)}</li>,
      )}</List>);
      continue;
    }

    blocks.push(<p key={`paragraph-${index}`}>{renderInlineMarkdown(line)}</p>);
    index += 1;
  }

  return <div className="ai-chat-copy">{blocks}</div>;
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([welcome]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [admissionState, setAdmissionState] = useState<AdmissionState>("idle");
  const [admissionError, setAdmissionError] = useState("");
  const [dismissedOfferAt, setDismissedOfferAt] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const transcriptRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  useEffect(() => {
    if (open && window.matchMedia("(pointer: fine)").matches) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const root = document.documentElement;
    const previousBodyOverflow = document.body.style.overflow;
    const viewport = window.visualViewport;
    function syncVisibleViewport() {
      root.style.setProperty("--ai-chat-visible-height", `${Math.round(viewport?.height ?? window.innerHeight)}px`);
      root.style.setProperty("--ai-chat-visible-top", `${Math.round(viewport?.offsetTop ?? 0)}px`);
    }

    document.body.style.overflow = "hidden";
    syncVisibleViewport();
    window.addEventListener("resize", syncVisibleViewport);
    viewport?.addEventListener("resize", syncVisibleViewport);
    viewport?.addEventListener("scroll", syncVisibleViewport);

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      root.style.removeProperty("--ai-chat-visible-height");
      root.style.removeProperty("--ai-chat-visible-top");
      window.removeEventListener("resize", syncVisibleViewport);
      viewport?.removeEventListener("resize", syncVisibleViewport);
      viewport?.removeEventListener("scroll", syncVisibleViewport);
    };
  }, [open]);

  useEffect(() => {
    transcriptRef.current?.scrollTo({ top: transcriptRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, sending, admissionState]);

  async function send(question: string) {
    const content = question.trim();
    if (!content || sending) return;
    const userMessage: Message = { role: "user", content };
    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInput("");
    setSending(true);
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages.slice(-10).map(({ role, content: messageContent }) => ({ role, content: messageContent })),
          page: window.location.pathname,
        }),
      });
      const payload = await response.json().catch(() => ({})) as { answer?: string; sources?: Source[]; error?: string };
      if (!response.ok || !payload.answer) throw new Error(payload.error || "The assistant could not answer just now.");
      setMessages((current) => [...current, { role: "assistant", content: payload.answer!, sources: payload.sources }]);
    } catch (error) {
      setMessages((current) => [...current, {
        role: "assistant",
        content: error instanceof Error ? error.message : "The assistant is temporarily unavailable.",
        error: true,
      }]);
    } finally {
      setSending(false);
    }
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    void send(input);
  }

  async function submitAdmission(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (admissionState === "sending") return;

    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const submission = Object.fromEntries(form);
    setAdmissionError("");
    setAdmissionState("sending");

    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...submission, acceptedPrivacy: form.get("acceptedPrivacy") === "true", source: "ai-chat-admissions" }),
      });
      const payload = await response.json().catch(() => ({})) as { ok?: boolean; accepted?: boolean; enquiryId?: string; error?: string };
      if (!response.ok || payload.ok !== true || payload.accepted !== true || !payload.enquiryId) {
        throw new Error(payload.error || "We couldn’t confirm that your enquiry was saved. Please try again.");
      }
      const enquiryId = payload.enquiryId;
      formElement.reset();
      setAdmissionState("sent");
      setMessages((current) => [...current, {
        role: "assistant",
        content: `Thank you — your admission enquiry was saved in the Creative All Stars Academy admissions inbox. Reference: ${enquiryId.slice(0, 8)}. The school can now contact you using the details you provided.`,
      }]);
    } catch (error) {
      setAdmissionState("open");
      setAdmissionError(error instanceof Error ? error.message : "We couldn’t send your enquiry just now.");
    }
  }

  const latestMessage = messages.at(-1);
  const showAdmissionOffer = messages.length > 1
    && admissionState === "idle"
    && dismissedOfferAt !== messages.length
    && latestMessage?.role === "assistant"
    && !latestMessage.error;

  return <>
    {open && <section className="ai-chat-panel" role="dialog" aria-modal="false" aria-labelledby="ai-chat-title">
      <header className="ai-chat-head">
        <div><span className="ai-chat-status" aria-hidden="true" /><div><strong id="ai-chat-title">Ask CASA</strong><small>Classes, activities & admissions</small></div></div>
        <button type="button" onClick={() => setOpen(false)} aria-label="Close school assistant">&times;</button>
      </header>
      <div className="ai-chat-transcript" ref={transcriptRef} aria-live="polite">
        {messages.map((message, index) => <article className={`ai-chat-message ${message.role}${message.error ? " error" : ""}`} key={`${message.role}-${index}`}>
          <span>{message.role === "assistant" ? "CASA" : "You"}</span>
          <ChatMessageContent content={message.content} />
          {!!message.sources?.length && <details className="ai-chat-sources">
            <summary>Sources</summary>
            <ul>{message.sources.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer">{source.title}</a></li>)}</ul>
          </details>}
        </article>)}
        {sending && <div className="ai-chat-typing" aria-label="CASA assistant is typing"><i /><i /><i /></div>}
        {messages.length === 1 && <div className="ai-chat-suggestions" aria-label="Suggested questions">
          {suggestions.map((suggestion) => <button type="button" onClick={() => void send(suggestion)} key={suggestion}>{suggestion}</button>)}
        </div>}
        {showAdmissionOffer && <section className="ai-chat-admission-offer" aria-label="Admissions enquiry">
          <strong>Would you like help with admission?</strong>
          <p>You can send a separate, consent-based admission enquiry to the school.</p>
          <div>
            <button type="button" className="ai-chat-admission-primary" onClick={() => setAdmissionState("open")}>Yes, take my details</button>
            <button type="button" className="ai-chat-admission-secondary" onClick={() => setDismissedOfferAt(messages.length)}>Not now</button>
          </div>
        </section>}
        {(admissionState === "open" || admissionState === "sending") && <form className="ai-chat-admission-form" onSubmit={submitAdmission}>
          <div className="ai-chat-admission-heading">
            <div><strong>Admission enquiry</strong><span>Required fields are marked *</span></div>
            <button type="button" aria-label="Close admission form" onClick={() => { setAdmissionState("idle"); setDismissedOfferAt(messages.length); }}>&times;</button>
          </div>
          <fieldset disabled={admissionState === "sending"}>
            <label htmlFor="ai-parent-name">Parent or guardian name *<input id="ai-parent-name" name="parentName" autoComplete="name" maxLength={120} required /></label>
            <label htmlFor="ai-phone">Phone number *<input id="ai-phone" name="phone" type="tel" autoComplete="tel" maxLength={50} required /></label>
            <label htmlFor="ai-email">Email address<input id="ai-email" name="email" type="email" autoComplete="email" maxLength={200} /></label>
            <label htmlFor="ai-child-name">Learner’s name *<input id="ai-child-name" name="childName" autoComplete="off" maxLength={120} required /></label>
            <label htmlFor="ai-grade">Class of interest *<select id="ai-grade" name="gradeApplied" defaultValue="" required>
              <option value="" disabled>Select a class</option>
              <option>Playgroup</option><option>PP1</option><option>PP2</option>
              <option>Grade 1</option><option>Grade 2</option><option>Grade 3</option><option>Grade 4</option>
              <option>Grade 5</option><option>Grade 6</option><option>Grade 7 / Junior School</option>
            </select></label>
            <label htmlFor="ai-admission-message">Preferred start date or questions<textarea id="ai-admission-message" name="message" maxLength={1500} /></label>
            <div className="form-honeypot" aria-hidden="true"><label htmlFor="ai-company">Company<input id="ai-company" name="company" tabIndex={-1} autoComplete="off" /></label></div>
            <label className="ai-chat-admission-consent"><input type="checkbox" name="acceptedPrivacy" value="true" required /> <span>I agree that Creative All Stars Academy may use these details to contact me about admission.</span></label>
            <button type="submit" className="ai-chat-admission-submit">{admissionState === "sending" ? "Sending…" : "Send to admissions"}</button>
          </fieldset>
          {admissionError && <p className="ai-chat-admission-error" role="alert">{admissionError} You can also call +254 724 838 674.</p>}
        </form>}
      </div>
      <form className="ai-chat-form" onSubmit={submit}>
        <label className="sr-only" htmlFor="ai-chat-input">Ask a question about Creative All Stars Academy</label>
        <input id="ai-chat-input" ref={inputRef} value={input} onChange={(event) => setInput(event.target.value)} maxLength={1500} placeholder="Ask about CASA…" disabled={sending} autoComplete="off" />
        <button type="submit" disabled={sending || !input.trim()} aria-label="Send question">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m4 4 17 8-17 8 3-7 8-1-8-1-3-7Z" /></svg>
        </button>
      </form>
      <p className="ai-chat-note">AI answers can make mistakes. Confirm fees, availability and admissions details with the school.</p>
    </section>}
    <button className="ai-chat-launcher" type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-haspopup="dialog" aria-label={open ? "Close CASA assistant" : "Ask CASA assistant"}>
      {open ? <span aria-hidden="true">&times;</span> : <><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4h16v12H8l-4 4V4Zm4 5h8M8 12h5" /></svg><span>Ask CASA</span></>}
    </button>
  </>;
}
