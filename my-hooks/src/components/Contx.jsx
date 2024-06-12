import React, { createContext, useContext, useState } from 'react'

const userContext = createContext();
export default function Contx() {
    const [user] = useState('React');
  return (
    <userContext.Provider value={user}>

    <h1>{`Value is ${user}`}</h1>
    <Component1/>

    </userContext.Provider>
  );
}

function Component1(){
    return (
        <>
        <h2></h2>
        <Component2/>
        </>
    );
}
false
function Component2(){
    const user = useContext(userContext);
    return (
    <>
    <h3>{`Value is ${user}`}</h3>
    </>
    );
}
