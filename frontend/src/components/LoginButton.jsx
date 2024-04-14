import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button"

export function LoginButton(){
    const navigate = useNavigate();

    return <>
        <Button onClick={() => {navigate("/login")}}>Login</Button>
    </>
}