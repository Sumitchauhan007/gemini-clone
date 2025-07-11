// /context/ContextProvider.jsx

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
    }, 20 * index); // animation speed
  };

  const newChat = () => {
    setLoading(false);
    setShowResult(false);
  };

  const onSent = async (prompt) => {
    setResultData("");
    setLoading(true);
    setShowResult(true);

    let response;

    try {
      if (prompt !== undefined) {
        response = await runChat(prompt);
        setRecentPrompt(prompt);
      } else {
        if (!input.trim()) {
          setResultData("Please enter a prompt.");
          setLoading(false);
          return;
        }
        setPrevPrompts((prev) => [...prev, input]);
        setRecentPrompt(input);
        response = await runChat(input);
      }

      // Convert markdown-like to HTML
      let responseArray = response.split("**");
      let formattedResponse = "";

      for (let i = 0; i < responseArray.length; i++) {
        if (i % 2 === 1) {
          formattedResponse += `<strong>${responseArray[i]}</strong>`;
        } else {
          formattedResponse += responseArray[i];
        }
      }

      formattedResponse = formattedResponse.replace(/\*/g, "<br>");

      const chars = formattedResponse.split("");
      chars.forEach((char, i) => delayPara(i, char));
    } catch (error) {
      console.error("Error from Gemini:", error.message);
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
    newChat,
  };

  return (
    <Context.Provider value={contextValue}>
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;
