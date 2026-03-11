import { io, Socket } from "socket.io-client";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";
// Strip /api suffix for socket connection (connect to the root server)
const SOCKET_URL = BASE_URL.replace(/\/api$/, "");

let socket: Socket | null = null;

export const getSocket = (): Socket => {
  if (!socket) {
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("accessToken")
        : null;

    socket = io(SOCKET_URL, {
      auth: { token: token ?? "" },
      transports: ["websocket", "polling"],
      autoConnect: true,
    });

    socket.on("connect", () => {
      console.log("[Socket] Connected:", socket?.id);
    });

    socket.on("disconnect", (reason) => {
      console.log("[Socket] Disconnected:", reason);
    });

    socket.on("connect_error", (error) => {
      console.warn("[Socket] Connection error:", error.message);
    });
  }

  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

// ─── Chat helpers ────────────────────────────────────────────────────────────

export const buildConversationId = (myId: string, otherId: string) =>
  [myId, otherId].sort().join("_");

export interface ChatMessage {
  id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  created_at: string;
  conversation_id?: string;
}

export interface Conversation {
  id: string;
  other_user_id: string;
  other_user_name: string;
  last_message?: string;
  updated_at: string;
  unread_count?: number;
}

export const joinChat = (conversationId: string) => {
  getSocket().emit("chat:join", conversationId);
};

export const sendChatMessage = (receiverId: string, content: string) => {
  getSocket().emit("chat:message", { receiver_id: receiverId, content });
};

export const markChatRead = (conversationId: string) => {
  getSocket().emit("chat:read", { conversation_id: conversationId });
};

// ─── Notification helpers ─────────────────────────────────────────────────────

export interface RealtimeNotification {
  id: string;
  type: string;
  message: string;
  created_at: string;
  read: boolean;
}
