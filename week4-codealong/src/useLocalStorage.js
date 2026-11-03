import { useEffect, useState } from "react"; 

// Step 1: a custom hook. Same shape as useState, but the value survives a page refresh. 
export function useLocalStorage(key, initialValue) {  
    const [value, setValue] = useState(() => {    
        const saved = localStorage.getItem(key)    
        return saved !== null ? JSON.parse(saved) : initialValue  
    })  
    
    useEffect(() => {    
        localStorage.setItem(key, JSON.stringify(value))  
    }, [key, value])  
    
    return [value, setValue] 
}
