import {Client, Account, Databases, Storage, Avatars} from "appwrite"

export const appwriteConfig = {
    projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
    url:import.meta.env.VITE_APPWRITE_ENDPOINT,
    databaseId:import.meta.env.VITE_APPWRITE_DATABASE_ID,
    userCollectionId:import.meta.env.VITE_APPWRITE_USERCOLLECTION_ID,
    postCollectionId:import.meta.env.VITE_APPWRITE_POSTCOLLECTION_ID,
    storageId:import.meta.env.VITE_APPWRITE_MEDIA,
    savesCollectionId:import.meta.env.VITE_APPWRITE_SAVECOLLECTION_ID,
}

export const client = new Client()


client.setProject(appwriteConfig.projectId)
client.setEndpoint(appwriteConfig.url)




export const account = new Account(client)
export const database = new Databases(client)
export const storage = new Storage(client)
export const avatar = new Avatars(client)