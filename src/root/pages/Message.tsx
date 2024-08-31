import React, { useState, useEffect } from "react";
import { Send, User } from "lucide-react";
import { io } from "socket.io-client";

// server url
const socket = io("");

interface Message {
  id: number;
  sender: string;
  text: string;
  timestamp: string;
}

interface ChatItem {
  id: number;
  name: string;
  lastMessage: string;
  messages: Message[];
}

// Dummy data for chat list with messages
const initialChatList: ChatItem[] = [
  {
    id: 1,
    name: "John Doe",
    lastMessage: "Hey, how's it going?",
    messages: [
      { id: 1, sender: "John Doe", text: "Hey, how's it going?", timestamp: "2023-08-31T10:00:00" },
    ],
  },
  {
    id: 2,
    name: "Jane Smith",
    lastMessage: "Can we meet tomorrow?",
    messages: [
      { id: 1, sender: "Jane Smith", text: "Can we meet tomorrow?", timestamp: "2023-08-31T11:00:00" },
    ],
  },
  {
    id: 3,
    name: "drimes drimes",
    lastMessage: "a tuber for 5 shekels?",
    messages: [
      { id: 1, sender: "drimes drimes", text: "a tuber for 5 shekels?", timestamp: "2023-08-31T12:00:00" },
    ],
  },
];

const MessageComponent: React.FC = () => {
  const [chatList, setChatList] = useState<ChatItem[]>(initialChatList);
  const [selectedChat, setSelectedChat] = useState<ChatItem | null>(null);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    console.log(socket);
    socket.on("connect", () => {
      console.log("connected");
    });
    // Uncomment this when the backend is ready
    // socket.on("message", (message: Message) => {
    //   console.log("message", message);
    //   if (selectedChat) {
    //     updateChatMessages(selectedChat.id, message);
    //   }
    // });

    return () => {
      socket.off("connect");
      socket.off("message");
    };
  }, [selectedChat]);

  const handleSendMessage = () => {
    if (newMessage.trim() !== "" && selectedChat) {
      const newMsg: Message = {
        id: selectedChat.messages.length + 1,
        sender: "User", // This would be dynamic in a real app
        text: newMessage,
        timestamp: new Date().toISOString(),
      };
      updateChatMessages(selectedChat.id, newMsg);
      setNewMessage("");
      // Uncomment this when the backend is ready
      // socket.emit("sendMessage", { chatId: selectedChat.id, message: newMsg });
    }
  };

  const updateChatMessages = (chatId: number, newMessage: Message) => {
    setChatList((prevList) => {
      const updatedList = prevList.map((chat) =>
        chat.id === chatId
          ? {
              ...chat,
              lastMessage: newMessage.text,
              messages: [...chat.messages, newMessage],
            }
          : chat
      );
      
      // Update selectedChat if it's the one being modified
      if (selectedChat && selectedChat.id === chatId) {
        setSelectedChat(updatedList.find((chat) => chat.id === chatId) || null);
      }
      
      return updatedList;
    });
  };

  const handleChatSelect = (chat: ChatItem) => {
    setSelectedChat(chat);
    // In a real app, you would fetch messages for this chat here
  };

  return (
    <div className="flex h-svh w-[80%] ">
      {/* Chat List Sidebar */}
      <div className=" border-r">
        <div className="p-4 font-bold border-b">Chats</div>
        <div className="overflow-y-auto h-full w-[10rem]">
          {chatList.map((chat) => (
            <div
              key={chat.id}
              className={`p-4 hover:bg-gray-100 cursor-pointer ${
                selectedChat?.id === chat.id ? "bg-blue-100" : ""
              }`}
              onClick={() => handleChatSelect(chat)}
            >
              <div className="font-semibold">{chat.name}</div>
              <div className="text-sm text-gray-500 truncate ">{chat.lastMessage}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex flex-col w-3/4">
        {/* Top Section - Current Chat */}
        <div className="p-4 border-b flex items-center">
          <User size={24} className="mr-2" />
          <span className="font-semibold">
            {selectedChat ? selectedChat.name : "Select a chat"}
          </span>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {selectedChat ? (
            selectedChat.messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "User" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[60%] px-4 py-2 rounded-lg break-words ${
                    message.sender === "User"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  <p>{message.text}</p>
                  <p className="text-xs mt-1 opacity-75 text-end">
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              Select a chat to start messaging
            </div>
          )}
        </div>

        {/* Message Input */}
        <div className="border-t p-4">
          <div className="flex items-center gap-1">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Type a message..."
              className="flex-1 border rounded-[8px] px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={!selectedChat}
            />
            <button
              onClick={handleSendMessage}
              className="bg-blue-500 text-white rounded-[8px] px-4 py-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400"
              disabled={!selectedChat}
            >
              <Send size={25} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageComponent;