import {useState, useContext} from "react";// Step 1
import {DataContext} from "../App" //Step 2
export default function NavBar(){
const [uname,setUname]=useState("");
const [pwd, setPwd]=useState("");
const {logStatus,setLogStatus}=useContext(DataContext); //Step 3

  return(

    <div className="grid grid-cols-7 bg-blue-200 text-2xl px-10 py-10">
      <div><a href="/Home">Home</a></div>
       <div><a href="/AboutUs">About Us</a></div>
       <div><a href="/ContactUs">Contact Us</a></div>
       <div><a href="https://www.youtube.com">Youtube</a></div>
       <div/>
       <div><a href="/Register">Register</a></div>
       <div><a href="/Login">Login</a></div>

    </div>
  );


}