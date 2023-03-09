import './App.css';
import { useState } from 'react';
// import { Trulioo } from "@trulioo/docv"

function App() {
  
  const [shortCode, setShortCode] = useState("");
  const [savedShortCode, setSavedShortCode] = useState("");
  
  const handleOnClick = (code) => {
    setSavedShortCode(shortCode);
  };
  
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="App-header">
        <form>
          <label>
            <input type="text" name="name" onInput={(e) => setShortCode(e.currentTarget.value)}/>
          </label>
          <input type="submit" value="Submit" onClick={() => handleOnClick(shortCode)}/>
          <div>{savedShortCode}</div>
        </form>
        {}
      </header>
    </div>
  );
}

export default App;
