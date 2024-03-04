import { useNavigate } from "react-router-dom"

export function SignupButton(){
    const navigate = useNavigate();
    return <>
        <button onClick={() => {navigate("/signup")}}>Signup</button>
    </>
}