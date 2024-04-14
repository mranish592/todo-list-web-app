import { useNavigate } from "react-router-dom"
import { Button } from "./ui/button";
export function SignupButton({className}){
    const navigate = useNavigate();
    className = className ? className : ""
    return <>
        <Button className={className} onClick={() => {navigate("/signup")}}>Signup</Button>
    </>
}