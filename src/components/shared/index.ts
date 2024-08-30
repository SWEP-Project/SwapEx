import { z } from "zod"

export const SignupValidation = z.object({
    username: z.string().min(4, {message: "Too short"}),
    name: z.string().min(3,{ message: "Too short"}),
    email: z.string().email({message: "Invalid email. Use student Email"}),
    password: z.string().min(8,{message: "Password must be at least 8 characters"}),
  })

  export const SigninValidation = z.object({
    email: z.string().email(),
    password: z.string().min(8, { message: "Password must be at least 8 characters." }),
  });

  export const PostValidation = z.object({
    caption: z.string().min(5, { message: "Minimum 5 characters." }).max(2200, { message: "Maximum 2,200 caracters" }),
    file: z.custom<File[]>(),
    location: z.string().min(1, { message: "This field is required" }).max(1000, { message: "Maximum 1000 characters." }),
    tags: z.string(),
  });

  export const ProfileValidation = z.object({
    file: z.custom<File[]>(),
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    username: z.string().min(2, { message: "Name must be at least 2 characters." }),
    email: z.string().email(),
    bio: z.string(),
  });


  export {default as FileUploader} from './FileUploader'
  export { default as Loader } from './Loader'
  export { default as PostCard } from "./PostCard";
  export { default as GridPostList } from "./GridPostList";
  export { default as UserCard } from "./UserCard";
 export { default as ProfileUploader } from "./ProfileUploader";
export { default as PostStats } from "./PostStats"