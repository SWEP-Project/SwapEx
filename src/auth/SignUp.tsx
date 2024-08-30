import SignupForm from "./SignupForm"


const SignUp = () => {
  return (
    <div className="flex min-h-screen">
        <div className="hidden lg:flex w-2/3 bg-cover bg-center bg-[url('/images/image3.jpg')] "> This is a text</div>
        <div className="flex flex-col justify-center items-center w-full lg:w-1/2 bg-white p-8">
        <SignupForm />
        </div>
    </div>
  )
}

export default SignUp