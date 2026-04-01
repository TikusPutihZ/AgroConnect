import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { chatThreads } from "@/data/mockData";

const ChatListPage = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      className="flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Header */}
      <div className="px-5 pt-6 pb-3 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-1 text-foreground">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-xl font-bold text-foreground">Messages</h1>
      </div>

      {/* Chat list */}
      <div className="flex flex-col">
        {chatThreads.map((thread, i) => (
          <motion.button
            key={thread.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => navigate(`/chat/${thread.id}`)}
            className="flex items-center gap-3 px-5 py-3.5 hover:bg-muted/50 transition-colors text-left border-b border-border"
          >
            <div className="relative">
              <img
                src={thread.user.avatar}
                alt={thread.user.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              {thread.unread > 0 && (
                <div className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">
                  {thread.unread}
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-foreground truncate">{thread.user.name}</h3>
                <span className="text-[10px] text-muted-foreground shrink-0 ml-2">{thread.time}</span>
              </div>
              <p className="text-xs text-muted-foreground truncate mt-0.5">{thread.lastMessage}</p>
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default ChatListPage;
