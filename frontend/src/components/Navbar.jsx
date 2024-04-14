import { LogoutButton } from "./LogoutButton"
export function Navbar({username}){
    return <>
        <div className="grid sm:grid-cols-12 my-4">
            <div className="sm:col-span-2 text-2xl font-bold my-1.5">Hi {username}</div>
            <div className="sm:col-span-9"></div>
            <div className="sm:col-span-1"> <LogoutButton></LogoutButton></div>
        </div>
    </>
}