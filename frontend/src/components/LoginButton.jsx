import { useNavigate } from "react-router-dom";

export function LoginButton(){
    const navigate = useNavigate();

    return <>
        <button onClick={() => {navigate("/login")}}>Login</button>
    </>
}