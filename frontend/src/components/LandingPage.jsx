import { LoginButton } from "./LoginButton";
import { SignupButton } from "./SignupButton";

export function LandingPage(){
    return <>
   <div className="h-screen flex justify-center items-center">
    <div className="text-center">
        <h1 className="text-4xl mb-12">Welcome to Todo App</h1>
        <div className="flex justify-center">
        <LoginButton className="mx-2"/>
        <SignupButton className="mx-2"/>
        </div>
    </div>
    </div>

        
    </>
}