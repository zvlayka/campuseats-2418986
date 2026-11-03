import { BrowserRouter, Routes, Route, NavLink, Link, useParams } from 'react-router' 
import { useLocalStorage } from './useLocalStorage.js' 

function Home() {  
  // Step 1 in use: type a name, refresh the page, it is still there.  
  const [name, setName] = useLocalStorage('demo-name', '')  
  return (    
  <div className="box">      
  <h2>Home</h2>      
  <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />      
  {name && <p><Link to={`/hello/${name}`}>Say hello to {name}</Link></p>}    
  </div>  
  ) 
} 

function About() {  
  return <div className="box"><h2>About</h2><p>A two-page demo of React Router.</p></div> 
} 

// Step 2: a dynamic segment. /hello/Aisyah gives { who: 'Aisyah' }. 
function Hello() {  
  const { who } = useParams()  
  return <div className="box"><h2>Hello, {who}!</h2></div> 
} 

function NotFound() {  
  return <div className="box"><h2>404</h2><p>No page here.</p></div> 
} 

// Step 3: routes. One <Route> per URL; path="*" catches everything else. 
function App() {  
  return (    
  <BrowserRouter>      
  <h1>Week 4 code-along</h1>      
  <nav>        
    <NavLink to="/" end>Home</NavLink>        
    <NavLink to="/about">About</NavLink>      
    </nav>      
    <Routes>        
      <Route path="/" element={<Home />} />        
      <Route path="/about" element={<About />} />        
      <Route path="/hello/:who" element={<Hello />} />        
      <Route path="*" element={<NotFound />} />      
      </Routes>    
      </BrowserRouter>  
    ) 
} 
    
export default App