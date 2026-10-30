"use client";

import { cn } from "@/lib/utils";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion, type Variants } from "motion/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { MessageCircleMore } from "./animate-ui/icons/hugeicons/message-circle-more";
import { X } from "./animate-ui/icons/x";
import { Sent } from "./animate-ui/icons/hugeicons/sent";
import { PROFILE } from "@/data/profile";

const FIRST_NAME = PROFILE.name.split(" ")[0];
const SUGGESTIONS = [
  "What projects have you built?",
  "What is your tech stack?",
  "Tell me about your experience",
];

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      damping: 25,
      stiffness: 300,
      staggerChildren: 0.05,
    },
  },
  exit: { opacity: 0, y: 20, scale: 0.95 },
};

const messageVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 500, damping: 30 },
  },
};

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: `Hi! I'm ${FIRST_NAME}'s AI assistant. Ask me anything about their Rust work 👋`,
    },
  ]);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, loading, isOpen]);

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const sendMessage = async (text: string = input) => {
    if (!text.trim() || loading) return;

    const newMessages = [...messages, { role: "user", content: text }];

    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const apiMessages = newMessages.filter((_, index) => index !== 0);

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: apiMessages }),
      });

      if (!res.ok) {
        throw new Error(res.status === 429 ? "rate-limited" : "Request failed");
      }

      const data = await res.json();

      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content: data.reply.content,
        },
      ]);
    } catch (err) {
      console.error("Frontend error:", err);

      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content:
            err instanceof Error && err.message === "rate-limited"
              ? "You're sending messages quickly. Please wait a few minutes and try again."
              : "Something went wrong. Please try again.",
        },
      ]);
    }

    setLoading(false);
  };
  return (
    <div className="fixed right-6 bottom-6 z-50 flex flex-col items-end gap-4">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="bg-background w-80 overflow-hidden rounded-2xl border shadow-2xl backdrop-blur-xl md:w-96"
          >
            <div className="flex items-center justify-between border-b p-4">
              <div className="flex items-center gap-2 md:gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/logo.jpg" />
                  <AvatarFallback>AI</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-sm font-semibold">
                    {FIRST_NAME}&apos;s AI Assistant
                  </h3>
                  <span className="text-muted-foreground text-xs">Online</span>
                </div>
              </div>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={toggleOpen}
                    aria-label="Close chat"
                  >
                    <X animateOnHover className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>

                <TooltipContent className="z-50">
                  <p>Close Chat</p>
                </TooltipContent>
              </Tooltip>
            </div>

            <div
              ref={scrollRef}
              role="log"
              aria-live="polite"
              aria-label="Chat messages"
              className="flex h-80 flex-col gap-4 overflow-y-auto p-4"
            >
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  variants={messageVariants}
                  className={cn(
                    "flex gap-3",
                    msg.role === "user" && "flex-row-reverse self-end",
                  )}
                >
                  <Avatar className="h-8 w-8">
                    {msg.role === "user" ? (
                      <AvatarFallback className="text-xs md:text-sm">
                        ME
                      </AvatarFallback>
                    ) : (
                      <>
                        <AvatarImage src="/logo.jpg" />
                        <AvatarFallback className="text-xs md:text-sm">
                          AI
                        </AvatarFallback>
                      </>
                    )}
                  </Avatar>

                  <div
                    className={cn(
                      "max-w-[85%] rounded-2xl px-4 py-2.5 text-xs md:text-sm",
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground rounded-tr-none"
                        : "bg-muted rounded-tl-none",
                    )}
                  >
                    {msg.content}
                  </div>
                </motion.div>
              ))}

              {messages.length === 1 && !loading && (
                <div className="flex flex-wrap gap-2">
                  {SUGGESTIONS.map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      onClick={() => sendMessage(suggestion)}
                      className="text-muted-foreground hover:bg-muted rounded-full border px-3 py-1 text-xs transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}

              {loading && (
                <div className="flex gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>AI</AvatarFallback>
                  </Avatar>
                  <div className="flex gap-1 px-4 py-3">
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400 delay-150" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400 delay-300" />
                  </div>
                </div>
              )}
            </div>

            <div className="border-t p-3">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  sendMessage();
                }}
                className="flex gap-2"
              >
                <input
                  aria-label="Ask a question"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask something..."
                  className="flex-1 rounded-full border px-4 py-2 text-sm outline-none"
                />
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size="icon"
                      disabled={!input.trim() || loading}
                      aria-label="Send message"
                    >
                      <Sent animateOnHover className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>

                  <TooltipContent className="z-50">
                    <p>Send</p>
                  </TooltipContent>
                </Tooltip>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Tooltip>
        <TooltipTrigger asChild>
          <motion.button
            aria-label={isOpen ? "Close chat" : "Open chat"}
            aria-expanded={isOpen}
            onClick={toggleOpen}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={cn(
              "flex h-14 w-14 items-center justify-center rounded-full bg-neutral-800 text-neutral-100 shadow-lg dark:bg-neutral-100 dark:text-neutral-800",
              isOpen ? "bg-red-500! text-white!" : "",
            )}
          >
            {isOpen ? (
              <X animateOnHover />
            ) : (
              <MessageCircleMore animateOnHover />
            )}
          </motion.button>
        </TooltipTrigger>

        <TooltipContent className="z-50">
          <p> {isOpen ? "Close Chat" : "Open Chat"}</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
