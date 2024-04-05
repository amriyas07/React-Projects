import React from 'react'
import "../components/Fq.css";
import { useState } from 'react';
const FaqItem = ({question,answer})=>{
    const [show,setShow] = useState(false);
    const toggleShow = ()=>{
        setShow(!show);
    };
    return(
        <div className={`faq-item-container ${show ?"active":""}`}>
            <div className="faq-item-header" onClick={toggleShow}>{question}</div>
            <div className="faq-item-body">
            <div className="faq-item-body-content">{answer}</div></div>
        </div>
    );
};
const FaqAccordian = ({data})=>{
    return(
        <div className="faq-accord-container">
            {data.map((item)=>(
                <FaqItem key={item.id} question={item.question} answer={item.answer}/>
            ))}
        </div>
    );
};
const data = [{id:1,question:"Why is Java a platform independent language?",answer:"Java language was developed so that it does not depend on any hardware or software because the compiler compiles the code and then converts it to platform-independent byte code which can be run on multiple systems."},
{id:2,question:"Why is Java not a pure object oriented language?",answer:"Java supports primitive data types - byte, boolean, char, short, int, float, long, and double and hence it is not a pure object oriented language."},
{id:3,question:"What do you mean by data encapsulation?",answer:"Data Encapsulation is an Object-Oriented Programming concept of hiding the data attributes and their behaviours in a single unit."},
{id:4,question:"What is the main objective of garbage collection?",answer:" The process is to free up the memory space occupied by the unnecessary and unreachable objects during the Java program execution by deleting those unreachable objects."}];
function Faq() {
  return (
    <>
    <div className="faq-app-container">
    <h1>FAQs</h1>
    <FaqAccordian data={data}/>
    </div>
    </>
  );
}

export default Faq