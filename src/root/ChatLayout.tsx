import { Outlet, useLocation } from "react-router-dom";
import ChatList from "./pages/ChatList";
import { useMediaQuery } from 'react-responsive'

const ChatLayout = () => {
  const isSmallScreen = useMediaQuery({ maxWidth: 767 }); // Media query for small screens
  const { pathname } = useLocation();

  const isChatRoomOpen = pathname.includes('/chat/');

  return (
    <div className="flex flex-1 flex-col md:flex-row h-screen w-full">
      {isSmallScreen ? (
        // For small screens, show either the ChatList or ChatRoom depending on the route
        <>
          {!isChatRoomOpen ? (
            <ChatList />
          ) : (
            <section className="w-full h-full">
              <Outlet />
            </section>
          )}
        </>
      ) : (
        // For larger screens, show both ChatList and ChatRoom side by side
        <>
          <ChatList />
          <section className="ml-[23%] w-full">
            <Outlet />
          </section>
        </>
      )}
    </div>
  );
}

export default ChatLayout;
