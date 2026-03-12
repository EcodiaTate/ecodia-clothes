"use client";

import { useState, useTransition, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { sendMessage } from "@/lib/actions/clothes";
import { useHaptic } from "@/lib/hooks/use-haptics";
import type { StudioMessage } from "@/types/domain";

type MessageWithSender = StudioMessage & {
  sender: { display_name: string | null; avatar_url: string | null } | null;
};

type Props = {
  orderId: string;
  messages: MessageWithSender[];
  currentUserId: string;
};

export function MessageThread({ orderId, messages: initialMessages, currentUserId }: Props) {
  const haptics = useHaptic();
  const [messages, setMessages] = useState(initialMessages);
  const [body, setBody] = useState("");
  const [isPending, startTransition] = useTransition();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  function handleSend() {
    if (!body.trim()) return;
    haptics.impact("medium");

    const text = body.trim();
    setBody("");

    startTransition(async () => {
      const result = await sendMessage({ orderId, body: text });

      if ("error" in result) {
        haptics.notify("error");
        setBody(text);
      } else {
        haptics.notify("success");
        // Optimistic: add the message locally
        setMessages((prev) => [
          ...prev,
          {
            id: crypto.randomUUID(),
            order_id: orderId,
            sender_id: currentUserId,
            body: text,
            created_at: new Date().toISOString(),
            sender: { display_name: "You", avatar_url: null },
          } as MessageWithSender,
        ]);
      }
    });
  }

  return (
    <div>
      {/* Messages */}
      <div
        ref={scrollRef}
       
      >
        {messages.map((msg) => {
          const isMe = msg.sender_id === currentUserId;
          return (
            <div
              key={msg.id}
            >
              <div
               
                style={{
                  background: isMe ? "var(--ec-forest-600)" : "var(--surface-subtle)",
                  color: isMe ? "#fff" : "var(--text-base)",
                }}
              >
                {!isMe && msg.sender?.display_name && (
                  <p>
                    {msg.sender.display_name}
                  </p>
                )}
                <p>{msg.body}</p>
                <p
                 
                 
                >
                  {new Date(msg.created_at ?? "").toLocaleTimeString("en-AU", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Input */}
      <div>
        <Input
          placeholder="Type a message..."
          value={body}
          onChange={(e) => setBody(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
         
        />
        <Button
          variant="primary"
          size="sm"
          loading={isPending}
          onClick={handleSend}
          disabled={!body.trim()}
          aria-label="Send"
        >
          <Send />
        </Button>
      </div>
    </div>
  );
}
