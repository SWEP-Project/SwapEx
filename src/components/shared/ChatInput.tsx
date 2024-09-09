import  { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useUserContext } from '../../context/AuthContext';
import { useSendMessage } from '../../lib/react-query/queries';

function ChatInput() {
  const [message, setMessage] = useState('');
  const { id } = useParams()
  const { user } = useUserContext();

    // Hook to send a new message
    const { mutate: sendMessage } = useSendMessage();


  const handleSend = () => {
    // Handle the send message functionality
    sendMessage(
        { senderId: user.id,  content: message, chatId: id },
    )

    if (message.trim() === "") {
        console.log("Message can't be empty")
        return;
    }
    console.log('Message sent:', message);
    setMessage(''); // Clear the textarea after sending
  };

  return (
    <div className="fixed bottom-0  w-full bg-white border-gray-300 p-1">
      <div className="relative">
        <textarea
          className="w-1/2 p-3 pr-12 rounded-full border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-400 resize-none"
          placeholder="Type a message..."
          rows={1}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          className="absolute bottom-2 p-3 mx-1 rounded-full bg-gray-300 hover:bg-gray-400 text-white shadow-md focus:outline-none focus:ring-1 focus:ring-gray-500"
          onClick={handleSend}
        >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
            </svg>


        </button>
      </div>
    </div>
  );
}

export default ChatInput;
