// src/components/ChatbotPanel.tsx
import { useState } from "react";
import { X, Send, Eclipse } from "lucide-react";
import { Button } from "@/components/ui/button";
import SuggestedPrompts from "./suggestedPrompts";

type Msg = { role: "user" | "assistant"; text: string };

export default function ChatbotPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      text: "Hello! I'm the Mission Control chatbot. I am here to help you with space knowledge navigation!",
    },
  ]);

  const [hasMessages, setHasMessages] = useState(false);

  function send() {
    const text = input.trim();
    if (!text) return;
    setMessages((m) => [...m, { role: "user", text }]);
    setHasMessages(true);
    setInput("");
    // placeholder until backend exists
    setMessages((m) => [
      ...m,
      {
        role: "assistant",
        text: "Chat backend isn't wired yet — your question was received.",
      },
    ]);
  }

  return (
    <>
      {/* Floating launcher — always available */}
      {!isOpen && (
        <Button
          type="button"
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-[60] h-20 w-20 rounded-full shadow-lg"
          aria-label="Open Orbit Assistant"
        >
          <Eclipse className="h-15 w-15" />
        </Button>
      )}

      {isOpen && (
        <div
          className="fixed inset-0 z-[55] bg-black/40"
          onClick={() => setIsOpen(false)}
          aria-hidden
        />
      )}

      <aside
        role="dialog"
        aria-label="Orbit Assistant"
        className={`fixed top-16 right-0 z-[60] flex h-[calc(100%-4rem)] w-full max-w-md flex-col border-l border-white/10 bg-[#070b18] shadow-2xl transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <header className="flex items-center justify-between border-b border-white/10 px-4 py-3">
          <div>
            <h2 className="mt-5 text-balance bg-gradient-to-b from-white via-white to-slate-400 bg-clip-text text-3xl font-semibold tracking-tight text-transparent sm:text-4xl">
              Mission Control
            </h2>
            <p className="mt-3 text-pretty text-sm text-slate-400">
              Ask about the following topics:
            </p>
            <ol className="list-disc list-inside text-pretty text-sm text-slate-400">
              <li>Mars Mission</li>
              <li>Colonization of the Solar System</li>
              <li>Key Space Discoveries (e.g. Voyager 1, Voyager 2)</li>
              <li>Revolutionary Space Technologies (e.g. Orion, SLS)</li>
            </ol>
          </div>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="rounded-full p-2 text-slate-400 hover:bg-white/5 hover:text-white"
            aria-label="Close chat"
          >
            <X className="h-4 w-4" />
          </button>
        </header>

        <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
          {hasMessages ? (
            messages.map((msg, i) => (
              <div
                key={i}
                className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${
                  msg.role === "user"
                    ? "ml-auto bg-sky-500/20 text-sky-100"
                    : "bg-white/5 text-slate-200"
                }`}
              >
                {msg.text}
              </div>
            ))
          ) : (
            <SuggestedPrompts />
          )}
        </div>

        <form
          className="flex gap-2 border-t border-white/10 p-3"
          onSubmit={(e) => {
            e.preventDefault();
            send();
          }}
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question…"
            className="flex-1 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-100 outline-none placeholder:text-slate-500 focus:border-white/20"
          />
          <Button type="submit" size="icon" aria-label="Send">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </aside>
    </>
  );
}
