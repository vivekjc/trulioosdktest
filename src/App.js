import './App.css';
import { useState } from 'react';
import {Trulioo, event} from "@trulioo/docv"
import logo from "./img/logo.png"

function App() {
  
  const [shortCode, setShortCode] = useState("");
  const [savedShortCode, setSavedShortCode] = useState("");
  
  const elementID = "trulioo-sdk" // The HTML element id to attach to
  const host = "https://main.d2uvagyudr35kr.amplifyapp.com/" // Set the QR Code redirect url host
  
  // const queryString = window.location.search;
  // const urlParams = new URLSearchParams(queryString);
  // const shortCodeParam = urlParams.get("code");
  
  const initTruliooSdk = (code) => {
    
    // Setup the workflow configuration
    const workflowOption = Trulioo.workflow()
    .setShortCode(code)
    .setRedirectUrl(host)
    
    // Setup callbacks to get results and debugging errors
    const callbacks = new event.adapters.ListenerCallback({
      onComplete: (success) => {
          console.info(`Verification Successful: ${success.transactionId} `)
      },
      onError: (error) => {
          console.error(`Verification Failed with Error Code: ${error.code}, TransactionID: ${error.transactionId}, Reason: ${error.message}`)
      },
      onException: (exception) => {
          console.error("Verification Failed with Exception:", exception)
      }
    })
    const callbackOption = Trulioo.event().setCallbacks(callbacks)
    // Initialize the SDK with the workflow configuration
    Trulioo.initialize(workflowOption)
      .then(complete => {
          console.info("Initialize complete:", complete)
          // Launch the UI with the provided HTML element ID
          Trulioo.launch(elementID, callbackOption)
              .then(success => {
                  console.info("Launch success:", success)
              })
      })
      .catch(error =>
          console.error("Error:", error)
      )
  }
  
  // if (shortCodeParam !== null) {
  //   initTruliooSdk(shortCodeParam) // Use the obtained short code from the url param
  // }
  
  const handleOnClick = (e, code) => {
    e.preventDefault();
    setSavedShortCode(code);
    initTruliooSdk(code);
  };
  
  return (
    <div className="min-h-screen bg-gray-100 p-5 flex">
      <header className="App-header">
        <img class="max-h-12 pt-5 mb-5" src={logo} alt="logo" height="20px" />
        <form class="w-full max-w-sm" onSubmit={(e) => handleOnClick(e, shortCode)}>
          <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
            <input 
              class="bg-gray-200 appearance-none border-2 border-gray-200 mb-5 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              type="text" 
              name="name" 
              onInput={(e) => setShortCode(e.currentTarget.value)}/>
          </label>
          <input class="shadow bg-purple-500 hover:bg-purple-400 mb-5 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" 
          type="submit" value="Go" />
          <div>{savedShortCode}</div>
        </form>
        <div id="trulioo-sdk" class="bg-white-100"/>
    </header>
    </div>
  );
}

export default App;
