import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "../components/ui/button"
import { Form, FormControl,FormField, FormItem, FormLabel, FormMessage, } from "../components/ui/form"
import { Input } from "../components/ui/input"
import { Loader, SignupValidation } from "../components/shared"
import { useCreateUserAccount, useSignInAccount } from "../lib/react-query/queries";
import { useToast } from "../components/ui/use-toast"
import { useNavigate, Link } from "react-router-dom"
import { useUserContext } from "../context/AuthContext"





const SignupForm = () => {

  const { toast } = useToast();
  const navigate = useNavigate();
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();

  const { mutateAsync: createUserAccount, isPending: isCreatingAccount } = useCreateUserAccount();
  const { mutateAsync: signInAccount, isPending: isSigningInUser } = useSignInAccount();




      // 1. Define your form.
  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      username: "",
      name: "",
      email: "",
      password: "",
    },
  })


 
  // 2. Define a submit handler.
  const handleSignup = async (user: z.infer<typeof SignupValidation>) => {
    const emailDomain = user.email.split('@')[1];
    const allowedDomain = 'student.oauife.edu.ng';
  
    if (emailDomain !== allowedDomain) {
      toast({
        variant: "destructive",
        title: "Please use your student email",
      });
      return; // Prevent form submission if the email domain is not allowed
    }
  
    try {
      const newUser = await createUserAccount(user);
  
      if (!newUser) {
        toast({ title: "Sign up failed. Please try again."  });
        return;
      }
  
      const session = await signInAccount({
        email: user.email,
        password: user.password,
      });
  
      if (!session) {
        toast({
          title: "Something went wrong. Please log in with your new account"
        });
        navigate("/sign-in");
        return;
      }
  
      const isLoggedIn = await checkAuthUser();
  
      if (isLoggedIn) {
        form.reset(); // Reset form only after a successful login
        navigate("/");
      } else {
        toast({ title: "Login failed. Please try again.",  });
        return;
      }
    } catch (error) {
      console.log({ error });
      toast({ title: "An error occurred. Please try again later.",  });
    }
  };
  
  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col">
        <img src="/images/logo.jpg" alt="logo" className="w-20" />
  
        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12 text-white">
          Create a new account
        </h2>
        <p className="text-gray-400 small-medium md:base-regular mt-2">
          To use snapgram, please enter your details
        </p>
  
        <form
          onSubmit={form.handleSubmit(handleSignup)}
          className="flex flex-col gap-5 w-full mt-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Name</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
  
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Username</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
  
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Email</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
  
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Password</FormLabel>
                <FormControl>
                  <Input type="password" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
  
          <Button type="submit" className="shad-button_primary">
            {isCreatingAccount || isSigningInUser || isUserLoading ? (
              <div className="flex-center gap-2">
                <Loader /> Loading...
              </div>
            ) : (
              "Sign Up"
            )}
          </Button>
  
          <p className="text-small-regular text-light-2 text-center mt-2">
            Already have an account?
            <Link
              to="/sign-in"
              className="text-blue-500 text-small-semibold ml-1"
            >
              Log in
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
}
  
export default SignupForm;