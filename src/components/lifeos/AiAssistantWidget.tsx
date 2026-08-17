import { useState, useRef, useEffect } from "react";
import { Bot, Mic, Send, Sparkles, User, X, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { aiChatService, type ChatMessage } from "@/lib/lifeos/services/ai-chat-service";
import { cn } from "@/lib/utils";

const SUGGESTIONS = [
  "What's my biggest friction today?",
  "Should I leave for my next event now?",
  "What have you learned about my habits?",
];

export function AiAssistantWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "msg-welcome",
      sender: "ai",
      text: "Hello! I am your LIFEOS Digital Twin powered by Gemini 2.5 Flash. How can I optimize your schedule or travel today?",
      timestamp: "Just now",
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open]);

  async function handleSend(textToSend?: string) {
    const text = (textToSend || input).trim();
    if (!text || loading) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: "user",
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const replyText = await aiChatService.askTwin(text, messages);
      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch {
      toast.error("Chat Error", { description: "Could not reach Gemini AI Assistant." });
    } finally {
      setLoading(false);
    }
  }

  function handleVoiceInput() {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      toast.info("Speech Recognition Unavailable", {
        description: "Voice input is not supported in this browser. Please type your message.",
      });
      return;
    }

    try {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        setListening(true);
        toast.info("Listening...", { description: "Speak your prompt now." });
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        void handleSend(transcript);
      };

      recognition.onerror = () => {
        toast.error("Speech Error", { description: "Could not record speech input." });
      };

      recognition.onend = () => {
        setListening(false);
      };

      recognition.start();
    } catch (err) {
      console.warn("[LIFEOS Voice] Error initializing speech recognition:", err);
      setListening(false);
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Trigger Button */}
      {!open ? (
        <Button
          size="lg"
          onClick={() => setOpen(true)}
          className="relative size-14 rounded-full bg-cyan-500 shadow-xl shadow-cyan-500/25 transition-all duration-300 hover:scale-105 hover:bg-cyan-400"
          aria-label="Ask LIFEOS Assistant"
        >
          <Sparkles className="size-6 text-slate-950" />
          <span className="absolute -right-1 -top-1 size-4 animate-ping rounded-full bg-cyan-400 opacity-75" />
        </Button>
      ) : null}

      {/* Floating Glassmorphic Chat Panel */}
      {open ? (
        <div className="glass flex h-[520px] w-96 max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-3xl border border-cyan-500/30 shadow-2xl shadow-cyan-950/50 backdrop-blur-xl">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border/60 bg-surface/80 p-4 backdrop-blur">
            <div className="flex items-center gap-2.5">
              <div className="grid size-9 place-items-center rounded-xl bg-cyan-500/15 text-cyan-400">
                <Bot className="size-5" />
              </div>
              <div>
                <p className="text-sm font-semibold">LIFEOS Twin AI</p>
                <p className="text-[10px] text-muted-foreground">Gemini 2.5 Flash · Schedule & GPS Aware</p>
              </div>
            </div>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setOpen(false)}
              className="size-8 rounded-full"
            >
              <X className="size-4" />
            </Button>
          </div>

          {/* Messages List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={cn(
                  "flex items-start gap-2.5 max-w-[88%]",
                  msg.sender === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                )}
              >
                <div
                  className={cn(
                    "grid size-7 shrink-0 place-items-center rounded-lg text-xs",
                    msg.sender === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-cyan-500/20 text-cyan-400 border border-cyan-500/40"
                  )}
                >
                  {msg.sender === "user" ? <User className="size-3.5" /> : <Bot className="size-3.5" />}
                </div>
                <div
                  className={cn(
                    "rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed",
                    msg.sender === "user"
                      ? "bg-primary text-primary-foreground rounded-tr-none"
                      : "bg-surface-2/90 border border-border text-foreground rounded-tl-none"
                  )}
                >
                  <p>{msg.text}</p>
                  <span className="mt-1 block text-[9px] opacity-60">{msg.timestamp}</span>
                </div>
              </div>
            ))}
            {loading ? (
              <div className="flex items-center gap-2 text-xs text-muted-foreground pl-2">
                <Loader2 className="size-3.5 animate-spin text-cyan-400" />
                <span>Gemini is thinking...</span>
              </div>
            ) : null}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggestions Chips */}
          <div className="border-t border-border/40 bg-surface-2/30 p-2 overflow-x-auto flex gap-1.5 scrollbar-none">
            {SUGGESTIONS.map((sug) => (
              <button
                key={sug}
                type="button"
                onClick={() => void handleSend(sug)}
                className="whitespace-nowrap rounded-full border border-border bg-surface/70 px-2.5 py-1 text-[10px] text-muted-foreground transition-colors hover:border-cyan-500/50 hover:text-foreground"
              >
                {sug}
              </button>
            ))}
          </div>

          {/* Input Controls */}
          <div className="border-t border-border/60 bg-surface/90 p-3">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                void handleSend();
              }}
              className="flex items-center gap-2"
            >
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask your Digital Twin..."
                className="h-9 text-xs rounded-xl bg-surface-2/70 border-border"
                disabled={loading}
              />
              <Button
                type="button"
                size="icon"
                variant={listening ? "default" : "outline"}
                onClick={handleVoiceInput}
                className={cn("size-9 shrink-0 rounded-xl", listening && "bg-rose-500 animate-pulse")}
                title="Voice Input"
              >
                <Mic className="size-4" />
              </Button>
              <Button
                type="submit"
                size="icon"
                disabled={!input.trim() || loading}
                className="size-9 shrink-0 rounded-xl bg-cyan-500 text-slate-950 hover:bg-cyan-400"
              >
                <Send className="size-4" />
              </Button>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}
