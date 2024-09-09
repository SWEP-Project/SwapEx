
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {  useCreateChat, useGetUserById, useSendMessage } from "../../lib/react-query/queries";
import SelectForBarter from "./SelectForBarter";
import { useUserContext } from "../../context/AuthContext";
import { toast } from "../../components/ui/use-toast";


const BarterRedirect = () => {

    const { id } = useParams();
    const { user } = useUserContext();
    const navigate = useNavigate()

    const { mutateAsync: createChat } =
    useCreateChat();

    const location = useLocation();
    const { postCreatorId } = location.state;
    const { mutate: sendMessage } = useSendMessage();
    
    const { data: currentUser } = useGetUserById(id || "");
  const handleImageSelect = async (newimageUrl: string) => {
    console.log("Selected image URL:", newimageUrl);
    // Use the imageUrl in another component for further operations

    console.log("This is to test navigate, state", postCreatorId)

  
    //Handler
  

      const newChat = await createChat({
        userId: user.id,
        receiverId: postCreatorId,
        lastMessage:null,
        isSeen: false
      });
  
      if (!newChat) {
        toast({
          title: `Failed to create chat`,
        });
      }
     sendMessage({senderId: user.id,  content:
       "I'd like to barter this item with you!" , chatId:newChat?.$id, imageUrl: newimageUrl } );
      navigate(`/message/chat/${newChat?.$id}`);
    
  }
  return (
    <div>
        <SelectForBarter posts={currentUser?.posts} showUser={false} onSelect={handleImageSelect} />
    </div>

  )
}

export default BarterRedirect