// src/components/ChatbotPanel.tsx
import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

type Msg = { role: "user" | "assistant"; text: string };

export default function ChatbotPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      text: "Ask me about missions, destinations, or the voyage simulator.",
    },
  ]);

  function send() {
    const text = input.trim();
    if (!text) return;
    setMessages((m) => [...m, { role: "user", text }]);
    setInput("");
    // placeholder until backend exists
    setMessages((m) => [
      ...m,
      {
        role: "assistant",
        text: "Chat backend isn’t wired yet — your question was received.",
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
          className="fixed bottom-6 right-6 z-[60] h-12 w-12 rounded-full shadow-lg"
          aria-label="Open Orbit Assistant"
        >
          <MessageCircle className="h-5 w-5" />
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
            <h2 className="text-sm font-semibold text-white">
              Orbit Assistant
            </h2>
            <p className="text-[11px] text-slate-500">
              Ask about the Solar System
            </p>
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
          {messages.map((msg, i) => (
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
          ))}
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
