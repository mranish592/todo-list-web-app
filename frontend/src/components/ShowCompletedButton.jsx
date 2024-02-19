export function ShowCompletedButton({showCompleted, setShowCompleted}){
    if(showCompleted === true) {
        return <button onClick={() => {
            console.log("show completed true")
            setShowCompleted(false)
        }}>Hide Completed</button>
    } else {
        return <button onClick={() => {
            console.log("show completed false")
            setShowCompleted(true)
        }}>Show Completed</button>
    }
    
}

