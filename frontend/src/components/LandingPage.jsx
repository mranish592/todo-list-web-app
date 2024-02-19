import { LoginButton } from "./LoginButton";
import { SignupButton } from "./SignupButton";

export function LandingPage(){
    return <>
        <h1>Welcome to Todo App</h1>
        <LoginButton></LoginButton>
        <SignupButton></SignupButton>
    </>
}