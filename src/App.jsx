
import './App.css';
import {useState, createContext} from "react" //Step 1
import {BrowserRouter, Routes,Route} from "react-router-dom";
import NavBar from './Components/NavBar';
import Home from "./Components/Home"
import {items} from "./Model/items.json"; //Step2
import AboutUs from "./Components/AboutUs";
import ContactUs from "./Components/ContactUs";
import Login from "./Components/Login"
import Register from "./Components/Register"
export const DataContext=createContext(""); //Step3
export default function App() {

  const [itemList,setItemList]=useState(items); //Step 5

  return (
    <div><DataContext.Provider value={{itemList:itemList,setItemList:setItemList}}>


    <div className='w-[100vw] h-[120vh] bg-amber-100'>
          <NavBar/>    
      <div className='text-center'>
        <BrowserRouter>
          <Routes>
          <Route path="/*" element={<Home/>}/>
          <Route path="/Home" element={<Home/>}/>
          <Route path="/AboutUs" element={<AboutUs/>}/>
          <Route path="/ContactUs" element={<ContactUs/>}/>
          <Route path="/Login" element={<Login/>}/>
          <Route path="/Register" element={<Register/>}/>
          </Routes>
        </BrowserRouter>
      </div>

      </div>
      </DataContext.Provider>
    </div>
   );
}

