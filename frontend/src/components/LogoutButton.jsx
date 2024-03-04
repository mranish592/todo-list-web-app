import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export function LogoutButton(){
    const navigate = useNavigate(); 
    function logoutHandler(){
        Cookies.remove("accessToken");
        Cookies.remove("username");
        alert("User Logged out")
        navigate("/");
    }
    return <>
        <button onClick={logoutHandler}>Logout</button>
    </>
}