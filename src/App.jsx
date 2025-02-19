import './App.css';
import {useState, createContext} from "react" //Step 1
import {BrowserRouter, Routes,Route} from "react-router-dom";
import NavBar from './Components/NavBar';
import Home from "./Components/Home"
import {books} from "./Model/books.json"; //Step2
import Books from './Components/Books';
import ContactUs from "./Components/ContactUs";
export const DataContext=createContext(""); //Step3
export default function App() {
  const [logStatus,setLogStatus]=useState(0); //Step4
  const [booklist,setBookList]=useState(books); //Step 5
  console.log("This got logged");

  return (
    <div>
    <DataContext.Provider value={{logStatus:logStatus, setLogStatus:setLogStatus,
      booklist:booklist,setBookList:setBookList}}>
    <div className='w-[100vw] h-[120vh] bg-amber-100'>
          <NavBar/>    
      <div className='text-center'>
        <BrowserRouter>
          <Routes>
          <Route path="/*" element={<Home/>}/>
          <Route path="/Home" element={<Home/>}/>
          <Route path="/Books" element={<Books/>}/>
          <Route path="/ContactUs" element={<ContactUs/>}/>
          </Routes>
        </BrowserRouter>
      </div>

      </div>
      </DataContext.Provider>
    </div>
   );
}

