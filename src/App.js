import React from "react";
import StudentData from "./components/StudentData";

const URL = process.env.NODE_ENV === 'development' 
  ? 'https://gremar.onrender.com' 
  : '';
function App() {
  
  const url = URL;
  return (
    <div className="App">
        
        <StudentData  URL={url}/>
    </div>
  );
}

export default App;
