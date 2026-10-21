import React,{useEffect,useState} from 'react';
import {createRoot} from 'react-dom/client';
import './style.css';

function App(){
 const [posts,setPosts]=useState([]);
 const [loading,setLoading]=useState(true);
 const [error,setError]=useState('');
 const [method,setMethod]=useState('GET');
 const [status,setStatus]=useState('');

 async function loadPosts(){
  setLoading(true);setError('');setStatus('');
  try{
   const r=await fetch('https://jsonplaceholder.typicode.com/posts?_limit=6');
   if(!r.ok) throw new Error('Request failed with status '+r.status);
   const data=await r.json();
   setPosts(data);setStatus('200 OK • JSON response received');
  }catch(e){setError(e.message)}
  finally{setLoading(false)}
 }
 useEffect(()=>{loadPosts()},[]);

 return <main>
  <div className="wrap">
   <div className="badge">REST API • GET REQUEST • JSON</div>
   <h1>REST API Explorer</h1>
   <p className="intro">A simple React application demonstrating GET requests, JSON response handling and visual API data.</p>
   <div className="bar">
    <select value={method} onChange={e=>setMethod(e.target.value)}><option>GET</option><option disabled>POST</option><option disabled>PUT</option><option disabled>DELETE</option></select>
    <code>https://jsonplaceholder.typicode.com/posts</code>
    <button onClick={loadPosts}>{loading?'Loading...':'Send Request'}</button>
   </div>
   {status&&<div className="status">{status}</div>}
   {error&&<div className="error">Error: {error}</div>}
   <h2>Response Data</h2>
   {loading?<p>Fetching API data...</p>:<div className="cards">{posts.map(p=><article key={p.id}><span>POST #{p.id}</span><h3>{p.title}</h3><p>{p.body}</p></article>)}</div>}
   <div className="report">
    <h2>REST API Summary</h2>
    <p><b>REST (Representational State Transfer)</b> is an architectural style for communication between applications over HTTP.</p>
    <p>This project uses a <b>GET</b> request to retrieve JSON data from a public API, checks the HTTP response, converts the response using <b>response.json()</b>, and displays the result in the React interface.</p>
    <ul><li>GET retrieves resources.</li><li>JSON provides a lightweight data format.</li><li>APIs allow applications to communicate and share services.</li><li>REST APIs are widely used in web, mobile, e-commerce and cloud applications.</li></ul>
   </div>
  </div>
 </main>
}
createRoot(document.getElementById('root')).render(<App/>);