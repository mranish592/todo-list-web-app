import Cookies from "js-cookie";

export function LogoutButton(){
    function logoutHandler(){
        Cookies.remove("accessToken");
        Cookies.remove("username");
        alert("User Logged out")
    }
    return <>
        <a href="/">
            <button onClick={logoutHandler}>Logout</button>
        </a>
    </>
}