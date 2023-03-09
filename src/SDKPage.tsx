
import React, { useState } from "react"

export const SDKPage = React.Component => {
    
    
  const [shortCode, setShortCode] = useState("");
  const [savedShortCode, setSavedShortCode] = useState("");
  
  const handleOnClick = (code) => {
    setSavedShortCode(shortCode);
  };    
}