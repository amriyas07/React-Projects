import React, { useState } from 'react'

function States() {
    const [text,setText] = useState("Hello World");
    let texts = "Hello World";
    const changeHandler1 = () =>{
        setText("Welcome");
        texts = "Welcome";
    };

    const changeHandler2 = () =>{
        setText("Hello World");
        texts = "Hello World";
    };
  return (
    <>
    <h1>{text} {texts}</h1>
    <button onClick={changeHandler1}>Change</button>
    <button onClick={changeHandler2}>Reverse</button>
    </>
  );
}

export default States