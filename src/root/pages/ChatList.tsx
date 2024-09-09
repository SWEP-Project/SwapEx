import { useGetUserChats } from '../../lib/react-query/queries';
import { useUserContext } from '../../context/AuthContext';
import { Loader } from '../../components/shared';
import { Link, useLocation } from 'react-router-dom';
import { multiFormatDateString } from '../../lib/utils';

const ChatList = () => {
  const { pathname } = useLocation();
  const { user } = useUserContext();
  const { data: userChats, isLoading: isUserChatLoading } = useGetUserChats(user.id);

  // Sort chats based on the latest updated time
  const sortedChats = userChats?.documents.sort((a: any, b: any) => b.$updatedAt - a.$updatedAt);
  console.log('this is userchats', userChats);
  console.log("this is sorted chats", sortedChats);

  // Generate chat list items
  const chats = sortedChats?.map((chat: any) => {
    const isActive = pathname === `/message/${chat?.$id}`;
    console.log('This is the pathname', pathname);
    const otherUserId = (chat.user.$id === user.id) ? chat.receiver : chat.user;

    const latestMessage = chat?.lastMessage.sort((a: any, b: any) => b.$createdAt - a.$createdAt)[chat?.lastMessage.length - 1];

    return (
      <Link 
        to={`/message/chat/${chat?.$id}`}
        key={chat?.$id}
      >
        <li
          className={`flex items-center p-4 min-w-[270px] rounded-lg base-medium hover:bg-gray-300 transition cursor-pointer ${
            isActive && "bg-gray-200"
          }`}
        >
          <div className="flex-shrink-0 h-12 w-12 rounded-full flex items-center justify-center text-white">
            <img
              src={otherUserId.imageUrl}
              className="w-10 h-10 rounded-full"
              alt={otherUserId.name}
            />
          </div>
          <div className="ml-4 ">
            <div className="text-black font-semibold">{otherUserId.name}</div>
            <div className="text-black text-sm w-full flex justify-between items-end">
              <p className="flex-1">{latestMessage?.content || "No messages yet"}</p>
              <p className="text-blue-500 md:text-blue-800 text-xs ml-4 whitespace-nowrap">
                {multiFormatDateString(latestMessage?.$updatedAt)}
              </p>
            </div>
          </div>
        </li>
      </Link>
    );
  });

  return (
    <div className="w-full md:w-1/5 md:fixed top-0 h-full overflow-y-auto md:bg-slate-400">
      <ul className="space-y-2">
        {isUserChatLoading ? (
          <Loader />
        ) : (
          <>
            {chats && chats.length > 0 ? (
              chats
            ) : (
              <p className="text-center text-gray-500 md:text-white mt-4 text-base md:text-lg font-bold md:font-normal">
                  No chats available
                </p>

            )}
          </>
        )}
      </ul>
    </div>
  );
};

export default ChatList;

