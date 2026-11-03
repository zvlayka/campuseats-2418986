import { useState } from 'react' 
const fruits = ['Durian', 'Rambutan', 'Mangosteen', 'Papaya', 'Pineapple', 
'Jackfruit', 'Banana', 'Mango'] 

// Step 1: a controlled input. The input shows `query`; typing updates `query`. 
// The filtered list is DERIVED from state on every render, not stored in state. 
function SearchList() {  
    const [query, setQuery] = useState('')  
    const visible = fruits.filter((f) => f.toLowerCase().includes(query.toLowerCase()))   
    
    return (    
      <div className="box">      
        <h2>Search</h2>      
        <input value={query} onChange={(e) => setQuery(e.target.value)} 
placeholder="Type a fruit…" />      
        <p>{visible.length} match(es)</p>      
        <ul>        
          {visible.map((f) => (          
            <li key={f}>{f}</li>        
          ))}      
        </ul>    
      </div>  
    ) 
} 

export default SearchList