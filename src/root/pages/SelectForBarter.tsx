import { Models } from "appwrite";

import { PostStats } from "../../components/shared";
import { useUserContext } from "../../context/AuthContext";
import { useState } from "react";

type SelectForBarterProps = {
  posts: Models.Document[];
  showUser?: boolean;
  showStats?: boolean;
  onSelect: (imageUrl: string)=> void,
};

const SelectForBarter = ({
  posts,
  showUser = true,
  showStats = true,
  onSelect,
}: SelectForBarterProps) => {

    const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

    const handlePostClick = (postId: string) => {
        setSelectedPostId(postId === selectedPostId ? null : postId);
        console.log('The handle post works')
      };

    const handleChooseClick = () => {
        const selectedPost = posts.find((post) => post.$id === selectedPostId);
        if (selectedPost) {
          console.log(selectedPost.imageUrl)
          console.log(selectedPost)
          onSelect(selectedPost.imageUrl)
        }
      };


  const { user } = useUserContext();

  return (
    <div className="mb-16">
      <h1 className="text-center xl:text-left h3-bold md:h1-semibold w-full mb-2" >
        Choose an item to barter with!!!
      </h1>
        <ul className="grid-container">
      {posts.map((post) => (
        <li key={post.$id} className={`relative min-w-80 h-80 ${
            selectedPostId === post.$id ? "border-4 border-blue-500" : ""
          }`} onClick={() => handlePostClick(post.$id)} >
          <div className="grid-post_link">
            <img
              src={post.imageUrl}
              alt="post"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="grid-post_user">
            {showUser && (
              <div className="flex items-center justify-start gap-2 flex-1">
                <img
                  src={
                    post.creator.imageUrl ||
                    "/assets/icons/profile-placeholder.svg"
                  }
                  alt="creator"
                  className="w-8 h-8 rounded-full"
                />
                <p className="line-clamp-1">{post.creator.name}</p>
              </div>
            )}
            {showStats && <PostStats post={post} userId={user.id} />}
          </div>
        </li>
      ))}
    </ul>
          {selectedPostId && (
            <button
              onClick={handleChooseClick}
              className="mt-4 bg-blue-500 text-white p-2 rounded"
              >
              Choose
            </button>
          )}
    </div>
    
  );
};


export default SelectForBarter;