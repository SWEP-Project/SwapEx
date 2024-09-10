import { IChat, INewMessage, INewPost, INewUser, IUpdatePost, IUpdateUser } from "../types";
import { account, appwriteConfig, avatar, database, storage } from "./config";
import { ID, Query } from "appwrite"

export async function createUserAccount(user:INewUser) {
  try {
      const newAccount = await account.create(
          ID.unique(),
          user.email,
          user.password,
          user.name,
      )

      console.log("This is the newAccount value", newAccount)

      if(!newAccount) throw Error

      const avatarURL= avatar.getInitials(user.name)

      const newUser = await saveUserToDB({
          accountId: newAccount.$id,
          email: newAccount.email,
          name: newAccount.name,
          username: user.username,
          imageUrl: avatarURL
      })

      console.log("this is the value returned by createaccount", newUser)

      
      return newUser
      
  } catch (error) {

      console.log(error)
      return error
      
  }
  
}

export async function saveUserToDB(user: {
  accountId: string,
  email: string,
  name: string,
  imageUrl: URL,
  username?: string
}){
  try {

     /* const avatarURL= avatar.getInitials(user.name)
      user.ImageURL = avatarURL*/

      const newUser = await database.createDocument(
          appwriteConfig.databaseId,
          appwriteConfig.userCollectionId,
          ID.unique(),
          user,
      )
      console.log(newUser)

      if (newUser){
          console.log("created successfully", newUser)
      }

      return newUser
  } catch (error) {
      console.log(error)
      console.log("current user permissions:", user)
  }
}

export async function signInAccount(user: { email: string; password: string }) {
        try {
          const currentSession = await account.getSession('current')
          
          if (currentSession){
            await account.deleteSession('current')
          }
        } catch(error){
                console.log("Error logging out", error)
        }


        try {
                const session = await account.createEmailPasswordSession(user.email, user.password);
                return session;
            } catch(error){
                console.log("Error creating session", )
            }
  }
  
// ============================== GET ACCOUNT
export async function getAccount() {
try {
    const currentAccount = await account.get();
    console.log("This is from getAccount", currentAccount)


    return currentAccount;
} catch (error) {
    console.log(error);
}
}

// ============================== GET USER
export async function getCurrentUser() {
try {
    const currentAccount = await getAccount();

    if (!currentAccount) throw Error;



    const currentUser = await database.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.userCollectionId,
    [
      Query.equal('accountId', [currentAccount.$id, 'Lord of the Rings']),
        
    ]);
    console.log(currentUser)
    console.log("This is the value of not currentAccount3", !currentUser)
    if (!currentUser) throw Error;


    return currentUser.documents[0];
} catch (error) {
    console.log(error);
    return null;
}
}

// ============================== SIGN OUT
export async function signOutAccount() {
    try {
      const session = await account.deleteSession("current");
  
      return session;
    } catch (error) {
      console.log(error);
    }
  }


// ============================================================
// POSTS
// ============================================================

// ============================== CREATE POST
export async function createPost(post:INewPost) {
    try {
      // Upload file to appwrite storage
      const uploadedFile = await uploadFile(post.file[0]);
  
      if (!uploadedFile) throw Error;
  
      // Get file url
      const fileUrl = getFilePreview(uploadedFile.$id);
      if (!fileUrl) {
        await deleteFile(uploadedFile.$id);
        throw Error;
      }
  
      // Convert tags into array
      const tags = post.tags?.replace(/ /g, "").split(",") || [];
  
      // Create post
      const newPost = await database.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.postCollectionId,
        ID.unique(),
        {
          creator: post.userId,
          caption: post.caption,
          imageUrl: fileUrl,
          imageId: uploadedFile.$id,
          location: post.location,
          tags: tags,
          category: post.category,
          price: post.price
        }
      );
  
      if (!newPost) {
        await deleteFile(uploadedFile.$id);
        throw Error;
      }
  
      return newPost;
    } catch (error) {
      console.log(error);
    }
  }
  
  // ============================== UPLOAD FILE
  export async function uploadFile(file: File) {
    try {
      const uploadedFile = await storage.createFile(
        appwriteConfig.storageId,
        ID.unique(),
        file
      );
  
      return uploadedFile;
    } catch (error) {
      console.log(error);
    }
  }
  
  // ============================== GET FILE URL
  export function getFilePreview(fileId: string) {
    try {
      const fileUrl = storage.getFilePreview(
        appwriteConfig.storageId,
        fileId,
        2000,
        2000,
  
      );
  
      if (!fileUrl) throw Error;
  
      return fileUrl;
    } catch (error) {
      console.log(error);
    }
  }
  
  // ============================== DELETE FILE
  export async function deleteFile(fileId: string) {
    try {
      await storage.deleteFile(appwriteConfig.storageId, fileId);
  
      return { status: "ok" };
    } catch (error) {
      console.log(error);
    }
  }
  
  // ============================== GET POSTS
  export async function searchPosts(searchTerm: string) {
    try {
      const posts = await database.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.postCollectionId,
        [
          Query.or([Query.search('caption', searchTerm), Query.search('category', searchTerm)])
          
        ]
      );
  
      if (!posts) throw Error;
  
      return posts;
    } catch (error) {
      console.log(error);
    }
  }
  
  export async function getInfinitePosts({ pageParam }: { pageParam?: string }) {
    const queries: any[] = [Query.orderDesc("$updatedAt"), Query.limit(9)];
  
    if (pageParam) {
      queries.push(Query.cursorAfter(pageParam));
    }
  
    try {
      const posts = await database.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.postCollectionId,
        queries
      );
  
      if (!posts) throw new Error("No posts found");
  
      return posts;
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw new Error("Error fetching posts");
    }
  }
  
  
  // ============================== GET POST BY ID
  export async function getPostById(postId?: string) {
    if (!postId) throw Error;
  
    try {
      const post = await database.getDocument(
        appwriteConfig.databaseId,
        appwriteConfig.postCollectionId,
        postId
      );
  
      if (!post) throw Error;
  
      return post;
    } catch (error) {
      console.log(error);
    }
  }
  
  // ============================== UPDATE POST
  export async function updatePost(post:IUpdatePost) {
    const hasFileToUpdate = post.file.length > 0;
  
    try {
      let image = {
        imageUrl: post.imageUrl,
        imageId: post.imageId,
      };
  
      if (hasFileToUpdate) {
        // Upload new file to appwrite storage
        const uploadedFile = await uploadFile(post.file[0]);
        if (!uploadedFile) throw Error;
  
        // Get new file url
        const fileUrl = getFilePreview(uploadedFile.$id);
        if (!fileUrl) {
          await deleteFile(uploadedFile.$id);
          throw Error;
        }
  
        image = { ...image, imageUrl: fileUrl, imageId: uploadedFile.$id };
      }
  
      // Convert tags into array
      const tags = post.tags?.replace(/ /g, "").split(",") || [];
  
      //  Update post
      const updatedPost = await database.updateDocument(
        appwriteConfig.databaseId,
        appwriteConfig.postCollectionId,
        post.postId,
        {
          caption: post.caption,
          imageUrl: image.imageUrl,
          imageId: image.imageId,
          location: post.location,
          tags: tags,
        }
      );
  
      // Failed to update
      if (!updatedPost) {
        // Delete new file that has been recently uploaded
        if (hasFileToUpdate) {
          await deleteFile(image.imageId);
        }
  
        // If no new file uploaded, just throw error
        throw Error;
      }
  
      // Safely delete old file after successful update
      if (hasFileToUpdate) {
        await deleteFile(post.imageId);
      }
  
      return updatedPost;
    } catch (error) {
      console.log(error);
    }
  }
  
  // ============================== DELETE POST
  export async function deletePost(postId?: string, imageId?: string) {
    if (!postId || !imageId) return;
  
    try {
      const statusCode = await database.deleteDocument(
        appwriteConfig.databaseId,
        appwriteConfig.postCollectionId,
        postId
      );
  
      if (!statusCode) throw Error;
  
      await deleteFile(imageId);
  
      return { status: "Ok" };
    } catch (error) {
      console.log(error);
    }
  }
  
  // ============================== LIKE / UNLIKE POST
  export async function likePost(postId: string, likesArray: string[]) {
    try {
      const updatedPost = await database.updateDocument(
        appwriteConfig.databaseId,
        appwriteConfig.postCollectionId,
        postId,
        {
          likes: likesArray,
        }
      );
  
      if (!updatedPost) throw Error;
  
      return updatedPost;
    } catch (error) {
      console.log(error);
    }
  }
  
  // ============================== SAVE POST
  export async function savePost(userId: string, postId: string) {
    try {
      const updatedPost = await database.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.savesCollectionId,
        ID.unique(),
        {
          user: userId,
          post: postId,
        }
      );
  
      if (!updatedPost) throw Error;
  
      return updatedPost;
    } catch (error) {
      console.log(error);
    }
  }
  // ============================== DELETE SAVED POST
  export async function deleteSavedPost(savedRecordId: string) {
    try {
      const statusCode = await database.deleteDocument(
        appwriteConfig.databaseId,
        appwriteConfig.savesCollectionId,
        savedRecordId
      );
  
      if (!statusCode) throw Error;
  
      return { status: "Ok" };
    } catch (error) {
      console.log(error);
    }
  }
  
  // ============================== GET USER'S POST
  export async function getUserPosts(userId?: string) {
    if (!userId) return;
  
    try {
      const post = await database.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.postCollectionId,
        [Query.equal("creator", userId), Query.orderDesc("$createdAt")]
      );
  
      if (!post) throw Error;
  
      return post;
    } catch (error) {
      console.log(error);
    }
  }
  
  // ============================== GET POPULAR POSTS (BY HIGHEST LIKE COUNT)
  export async function getRecentPosts() {
    try {
      const posts = await database.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.postCollectionId,
        [Query.orderDesc("$createdAt"), Query.limit(20)]
      );
  
      if (!posts) throw Error;
  
      return posts;
    } catch (error) {
      console.log(error);
    }
  }
  
  // ============================================================
  // USER
  // ============================================================
  
  // ============================== GET USERS
  export async function getUsers(limit?: number) {
    const queries: any[] = [Query.orderDesc("$createdAt")];
  
    if (limit) {
      queries.push(Query.limit(limit));
    }
  
    try {
      const users = await database.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,
        queries
      );
  
      if (!users) throw Error;
  
      return users;
    } catch (error) {
      console.log(error);
    }
  }
  
  // ============================== GET USER BY ID
  export async function getUserById(userId: string) {
    try {
      const user = await database.getDocument(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,
        userId
      );
  
      if (!user) throw Error;
  
      return user;
    } catch (error) {
      console.log(error);
    }
  }
  
  // ============================== UPDATE USER
  export async function updateUser(user:IUpdateUser) {
    const hasFileToUpdate = user.file.length > 0;
    try {
      let image = {
        imageUrl: user.imageUrl,
        imageId: user.imageId,
      };
  
      if (hasFileToUpdate) {
        // Upload new file to appwrite storage
        const uploadedFile = await uploadFile(user.file[0]);
        if (!uploadedFile) throw Error;
  
        // Get new file url
        const fileUrl = getFilePreview(uploadedFile.$id);
        if (!fileUrl) {
          await deleteFile(uploadedFile.$id);
          throw Error;
        }
  
        image = { ...image, imageUrl: fileUrl, imageId: uploadedFile.$id };
      }
  
      //  Update user
      const updatedUser = await database.updateDocument(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,
        user.userId,
        {
          name: user.name,
          bio: user.bio,
          imageUrl: image.imageUrl,
          imageId: image.imageId,
        }
      );
  
      // Failed to update
      if (!updatedUser) {
        // Delete new file that has been recently uploaded
        if (hasFileToUpdate) {
          await deleteFile(image.imageId);
        }
        // If no new file uploaded, just throw error
        throw Error;
      }
  
      // Safely delete old file after successful update
      if (user.imageId && hasFileToUpdate) {
        await deleteFile(user.imageId);
      }
  
      return updatedUser;
    } catch (error) {
      console.log(error);
    }
  }

  
  export async function createChat(chat: IChat) {
    try {
      // Check if chat already exists between user and receiver
      const existingChats = await database.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.chatCollectionId,
        [
          Query.and([Query.equal('user', chat.userId), Query.equal('receiver', chat.receiverId)]),
        ]
      );
  
      // If a chat already exists, return the existing chat
      if (existingChats.documents.length > 0) {
        console.log('Chat already exists');
        return existingChats.documents[0];
      }
  
      // If no existing chat is found, create a new one
      const newChat = await database.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.chatCollectionId,
        ID.unique(),
        {
          user: chat.userId,
          receiver: chat.receiverId,
          lastMessage: chat.lastMessage,
          isSeen: chat.isSeen,
        }
      );
  
      if (!newChat) throw new Error('Failed to create chat');
  
      return newChat;
    } catch (error) {
      console.error('Error creating or fetching chat:', error);
      throw error;
    }
  }
  


  export async function getUserChats(userId?: string){
    if(!userId) return;

    try {
      const chat = await database.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.chatCollectionId,
        [
          Query.or([Query.equal('user', userId), Query.equal('receiver', userId)]),
          Query.orderDesc('$updatedAt'),
        ]
    )
  
    if (!chat) throw Error
  
    return chat
    } catch (error) {
      console.log(error)
    }
    
  }

  export async function getChatById(chatId?: string) {
    if (!chatId) throw Error;
  
    try {
      const chat = await database.getDocument(
        appwriteConfig.databaseId,
        appwriteConfig.postCollectionId,
        chatId
      );
  
      if (!chat) throw Error;
  
      return chat;
    } catch (error) {
      console.log(error);
    }
  }
  

export async function sendMessage(message: INewMessage) {
  try {
    const newMessage = await database.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.messageCollectionId,
      ID.unique(),
      {
        content: message.content,
        sender: message.senderId,
        chat: message.chatId,
        imageUrl: message.imageUrl
      }
    )

    if (!newMessage) throw Error

    return newMessage
  } catch (error) {
    console.log(error)
  }
}

export async function getMessage(chatId?: string){
  if (!chatId) throw Error

  try {
    const messages = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.messageCollectionId,
      [
        Query.equal('chat', chatId),
        Query.orderAsc("$createdAt"),
        Query.limit(100)
      ]
    )
    if (!messages) throw Error
    
    return messages
  } catch (error) {
    console.log(error)
  }
}