import { useEffect, useState } from "react";
import { useSupabase } from "@/lib/supabase/client";

export interface Message {
  id: string;
  order_id: string;
  sender_id: string;
  body: string;
  created_at: string;
}

export function useMessagesRealtime(orderId: string | null) {
  const { supabase } = useSupabase();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!orderId) {
      setIsLoading(false);
      return;
    }

    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from("studio_messages")
        .select("*")
        .eq("order_id", orderId)
        .order("created_at", { ascending: true });

      if (!error && data) {
        setMessages(data as unknown as Message[]);
      }
      setIsLoading(false);
    };

    fetchMessages();

    // Subscribe to new messages
    const subscription = supabase
      .channel(`messages:${orderId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "studio_messages",
          filter: `order_id=eq.${orderId}`,
        },
        (payload: { new: Record<string, unknown> }) => {
          setMessages((prev) => [...prev, payload.new as unknown as Message]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [orderId, supabase]);

  return { messages, isLoading };
}
