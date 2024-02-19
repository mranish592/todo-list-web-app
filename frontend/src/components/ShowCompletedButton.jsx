export function ShowCompletedButton({showCompleted, setShowCompleted}){
    if(showCompleted === true) {
        return <button onClick={() => {
            setShowCompleted(false)
        }}>Hide Completed</button>
    } else {
        return <button onClick={() => {
            setShowCompleted(true)
        }}>Show Completed</button>
    }
    
}

