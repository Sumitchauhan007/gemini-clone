import React, { useContext } from 'react'
import'./Main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/context';
 


const Main = () => {
   
    const {onSent,recentPrompt,showResult,loading,resultData,setInput,input} =useContext(Context);
  return (
    <div className="main">
        <div className="nav">
            <p>Gemini</p>
            <img src={assets.user_icon} alt="" />
        </div>
        <div className="main-container">
           {!showResult
           ? <>
           <div className="greet">
                <p><span>Hello, Bal Buddhi</span></p>
                <p>Ajj Kya Poochega?</p>
            </div>
            <div className="cards">
                    <div className="card">
                        <p>who is the owner of chatgpt</p>
                        <img src={assets.compass_icon} alt="" />
                    </div>
                     <div className="card">
                        <p>Give me an example of saving account</p>
                        <img src={assets.bulb_icon} alt="" />
                    </div>
                     <div className="card">
                        <p>Give me a gd topic</p>
                        <img src={assets.message_icon} alt="" />
                    </div>
                     <div className="card">
                        <p>Change the code language to c</p>
                        <img src={assets.code_icon} alt="" />
                    </div>
            </div>
           </>
           :<div className='result'>
            <div className="result-title">
                <img src={assets.user_icon} alt="" />
                <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
                <img src={assets.gemini_icon} alt="" />
                {loading 
                ?<div className='loader'>
                   <hr />
                   <hr />
                   <hr />
                </div>
                :<p dangerouslySetInnerHTML={{__html:resultData}}></p>
                }
                
            </div>
           </div>
        }

             <div className="main-bottom">
                <div className="search-box">
                    <input onChange={(e)=>setInput(e.target.value)}  
                    value={input}
                    type="text" placeholder='likh jo poochna h' />
                    <div>
                        <img src={assets.gallery_icon} alt="" />
                        <img src={assets.mic_icon} alt="" />
                        {input?<img   onClick={()=>onSent()} src={assets.send_icon} alt="" />:null}
                    </div>
                </div>
                <p className="bottom-info">
                    Gemini is a large language model developed by Google AI, designed to understand and generate human-like text. It can assist with a wide range of tasks, including answering questions, providing explanations, and generating creative content.
                </p>
             </div>
        </div>
         </div>
  )
}

export default Main