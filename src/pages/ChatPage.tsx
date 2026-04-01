import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { chatThreads, chatMessages } from "@/data/mockData";
import { cn } from "@/lib/utils";

const ChatPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [newMessage, setNewMessage] = useState("");

  const thread = chatThreads.find((t) => t.id === id);
  const messages = chatMessages[id || ""] || [];

  if (!thread) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-muted-foreground">Chat not found</p>
      </div>
    );
  }

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    setNewMessage("");
  };

  return (
    <motion.div
      className="flex flex-col h-full"
      style={{ minHeight: "calc(100vh - 64px)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Header */}
      <div className="px-4 py-3 flex items-center gap-3 border-b border-border bg-card">
        <button onClick={() => navigate("/chats")} className="p-1 text-foreground">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <img
          src={thread.user.avatar}
          alt={thread.user.name}
          className="w-9 h-9 rounded-full object-cover"
        />
        <div>
          <h2 className="text-sm font-semibold text-foreground">{thread.user.name}</h2>
          <p className="text-[10px] text-muted-foreground">Online</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {messages.map((msg, i) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className={cn("flex", msg.sender === "me" ? "justify-end" : "justify-start")}
          >
            <div
              className={cn(
                "max-w-[75%] px-3.5 py-2.5 rounded-2xl text-sm",
                msg.sender === "me"
                  ? "bg-primary text-primary-foreground rounded-br-md"
                  : "bg-muted text-foreground rounded-bl-md"
              )}
            >
              <p>{msg.text}</p>
              <p className={cn(
                "text-[9px] mt-1",
                msg.sender === "me" ? "text-primary-foreground/60" : "text-muted-foreground"
              )}>
                {msg.time}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Input */}
      <form onSubmit={handleSend} className="p-3 border-t border-border bg-card flex gap-2">
        <Input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="rounded-full flex-1"
        />
        <Button type="submit" size="icon" className="rounded-full shrink-0">
          <Send className="w-4 h-4" />
        </Button>
      </form>
    </motion.div>
  );
};

export default ChatPage;
