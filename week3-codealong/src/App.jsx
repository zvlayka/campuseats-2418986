import { useState } from 'react' 
import SearchList from './SearchList.jsx' 
import Posts from './Posts.jsx' 

// Toggling Posts off and on shows the effect running again (and the cleanup when it unmounts). 

function App() {  
  const [showPosts, setShowPosts] = useState(true)  
  
  return (    
    <>      
      <h1>Week 3 code-along</h1>      
      <SearchList />      
      <button onClick={() => setShowPosts(!showPosts)}>{showPosts ? 'Hide' : 'Show'} 
posts</button>      
      {showPosts && <Posts />}    
    </>  
  ) 
} 

export default App