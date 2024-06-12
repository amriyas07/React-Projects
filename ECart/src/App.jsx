import { createContext, useState } from "react";
import Cart from "./components/Cart";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import { BrowserRouter,Route,Routes } from "react-router-dom";
export const cartContext = createContext();
function App() {
  const [cart,setCart] = useState([]);
  return (
    <cartContext.Provider value={{cart,setCart}}>
      <BrowserRouter>
      <NavBar cart={cart}/>
      <div className="Container">
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/Cart" element={<Cart />}/>
      </Routes>
      </div>
      </BrowserRouter>
      </cartContext.Provider>

  );
}

export default App
