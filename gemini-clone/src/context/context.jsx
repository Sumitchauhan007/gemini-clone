import React, { useState, createContext } from "react";
import runChat from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  const delayPara = (index, nextChar) => {
    setTimeout(() => {
      setResultData((prev) => prev + nextChar);
    }, 20 * index); // reduced for smoother animation
  };

  const onSent = async (prompt) => {
    

    setResultData("");
    setLoading(true);
    setShowResult(true);
    setRecentPrompt(input);
    setPrevPrompts((prev) => [...prev, input]);

    try {
      const response = await runChat(input);

      // Step 1: Convert markdown-like text to HTML with <br> and <strong>
      let responseArray = response.split("**");
      let formattedResponse = "";

      for (let i = 0; i < responseArray.length; i++) {
        if (i % 2 === 1) {
          formattedResponse += `<strong>${responseArray[i]}</strong>`;
        } else {
          formattedResponse += responseArray[i];
        }
      }

      // Step 2: Replace remaining `*` with line breaks
      formattedResponse = formattedResponse.replace(/\*/g, "<br>");

      // Step 3: Animate character-by-character
      const chars = formattedResponse.split("");
      chars.forEach((char, i) => delayPara(i, char));

    } catch (error) {
      console.error("Error from Gemini:", error);
      setResultData("Something went wrong. Please try again.");
    }

    setLoading(false);
    setInput("");
  };

  const contextValue = {
    input,
    setInput,
    recentPrompt,
    setRecentPrompt,
    prevPrompts,
    setPrevPrompts,
    showResult,
    setShowResult,
    loading,
    setLoading,
    resultData,
    setResultData,
    onSent,
  };

  return (
    <Context.Provider value={contextValue}>
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;
