import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button"


export function LogoutButton(){
    const navigate = useNavigate(); 
    function logoutHandler(){
        Cookies.remove("accessToken");
        Cookies.remove("username");
        alert("User Logged out")
        navigate("/");
    }
    return <>
        <Button onClick={logoutHandler}>Logout</Button>
    </>
}