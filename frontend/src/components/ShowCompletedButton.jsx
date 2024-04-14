import { Button } from "./ui/button"
export function ShowCompletedButton({showCompleted, setShowCompleted}){
    if(showCompleted === true) {
        return <Button variant="outline" onClick={() => {
            setShowCompleted(false)
        }}>Hide Completed</Button>
    } else {
        return <Button variant="outline" onClick={() => {
            setShowCompleted(true)
        }}>Show Completed</Button>
    }
    
}

