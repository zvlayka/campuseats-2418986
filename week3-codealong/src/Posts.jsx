import { useEffect, useState } from "react"; 

// Step 2: fetching data in useEffect, with loading and error states and a cleanup. 
// If the lab network blocks this API, switch the URL to a local file in /public. 
const URL = 'https://jsonplaceholder.typicode.com/posts?_limit=5' 

function Posts() {  
  const [posts, setPosts] = useState([])  
  const [loading, setLoading] = useState(true)  
  const [error, setError] = useState(null)   
  
  useEffect(() => {    
    const controller = new AbortController()     
    
    fetch(URL, { signal: controller.signal })      
      .then((res) => {        
        if (!res.ok) throw new Error(`HTTP ${res.status}`)        
        return res.json()      
      })      
      .then(setPosts)      
      .catch((err) => {      
        if (err.name !== 'AbortError') setError(err.message)      
      })      
      .finally(() => {        
        if (!controller.signal.aborted) setLoading(false)      
      })     
    
    return () => controller.abort() // runs if the component disappears before the fetch finishes  
  }, []) // [] = run once, after the first render   
  
  if (loading) return <p>Loading…</p>  
  if (error) return <p className="error">Error: {error}</p>   
  
  return (    
    <div className="box">      
      <h2>Latest posts</h2>      
      <ul>        
        {posts.map((p) => (          
          <li key={p.id}>{p.title}</li>       
        ))}      
      </ul>    
    </div>  
  ) 
} 

export default Posts
