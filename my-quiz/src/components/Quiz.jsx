import React, { useEffect, useState } from 'react';
import "../components/qiz.css";
import questionsData from "./questions.json";

function Quiz() {
    const [currentQuest,setCurrentQuest] = useState(0);
    const [score,setScore] = useState(0);
    const [showScore,setShowScore] = useState(false);
    const [timer,setTimer] = useState(10);

    useEffect(()=>{
        let interval;
        if(timer>0 && !showScore){
            interval=setInterval(()=>{
                setTimer((prevTimer)=>prevTimer-1);
            },1000)
        }else{
            clearInterval(interval);
            setShowScore(true);
        }
        return ()=> clearInterval(interval);
    },[timer,showScore]);
    const handleAnswerClick=(selectedOption)=>{
        if(selectedOption==questionsData[currentQuest].correctOption){
            setScore((prevScore)=>prevScore+1);
        }
        if(currentQuest<questionsData.length-1){
            setCurrentQuest((prevQuestion)=>prevQuestion+1);
            setTimer(10);
        }else{
            setShowScore(true);
        }
    }

    const handleRestartClick=()=>{
        setCurrentQuest(0);
        setScore(0);
        setShowScore(false);
        setTimer(10);
    }
  return (
    <>
    <div className="quiz-app">

        {showScore ? (
        <div className="score-sec">
        <h2>    Your Score is : {score}/{questionsData.length} </h2>
        <button onClick={handleRestartClick}>restart</button>
        </div>
        ):
        (
        <div className="quest-sec">
            <h3>Question {currentQuest+1}</h3>
        <h5>{questionsData[currentQuest].questions}</h5>
        <div className="options">
            {questionsData[currentQuest].options.map((option,index)=>(
                <button key={index} onClick={()=>handleAnswerClick(option)}>{option}</button>
            ))}
        </div>

        <div className="timer">
            <p><span>Time Left : </span> {timer}s</p>
        </div>
        </div>)}


    </div>
    </>
  );
}

export default Quiz