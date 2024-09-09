import { useParams } from "react-router-dom";
import ChatInput from "../../components/shared/ChatInput";
import { useGetMessages } from "../../lib/react-query/queries";
import { useUserContext } from "../../context/AuthContext";
import { Loader } from "../../components/shared";
import { Models } from "appwrite";

const ChatSet = () => {
  const { id } = useParams();
  const { user } = useUserContext();

  const {
    data: messages,
    isLoading: isMessagesLoading,
  } = useGetMessages(id);

  // Assuming `receiver` is accessible from the first message or message.chat
  const receiver = messages?.documents[0]?.chat?.receiver;

  return (
    <main className="chat-room-container">
      {/* Chat Header with Receiver's Profile */}
      <header className="chat-header flex items-center p-4 bg-gray-100 border-b border-gray-300">
        {receiver && (
          <>
            <img
              src={receiver.imageUrl}
              alt={receiver.name}
              className="h-10 w-10 rounded-full"
            />
            <div className="ml-4">
              <h2 className="text-lg font-semibold">{receiver.name}</h2>
            </div>
          </>
        )}
      </header>

      {/* Messages Container */}
      <div className="messages-container">
        {isMessagesLoading ? (
          <Loader />
        ) : (
          <div className="messages-container">
            {isMessagesLoading ? (
              <Loader />
            ) : (
              <ul className="message-list">
                {messages?.documents.map((message: Models.Document) => (
                  <li
                    key={message.$id}
                    className={`message-item ${
                      message.sender.$id === user.id
                        ? "message-sent"
                        : "message-received"
                    }`}
                  >
                    {/* Render message content here */}
                    <p>{message.content}</p>
                    {message.imageUrl && (
                      <img
                        src={message.imageUrl}
                        alt="Barter item"
                        className="message-image"
                      />
                    )}
                    <span className="timestamp">
                      {new Date(message.$createdAt).toLocaleTimeString()}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>

      {/* Chat Input */}
      <ChatInput />
    </main>
  );
};

export default ChatSet;
