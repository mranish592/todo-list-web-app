import { useNavigate } from "react-router-dom"
import { Button } from "./ui/button";
export function SignupButton(){
    const navigate = useNavigate();
    return <>
        <Button onClick={() => {navigate("/signup")}}>Signup</Button>
    </>
}