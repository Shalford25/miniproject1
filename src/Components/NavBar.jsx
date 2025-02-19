import {useState, useContext} from "react";// Step 1
import {DataContext} from "../App" //Step 2
export default function NavBar(){
const [uname,setUname]=useState("");
const [pwd, setPwd]=useState("");
const {logStatus,setLogStatus}=useContext(DataContext); //Step 3
function check(){
if(uname.trim()==="user1"  && pwd.trim() === "test")
  setLogStatus(1);

}

function logout(){
  setLogStatus(0);
}

var login=<div>
  Please enter UserName
   <input className="border-2" type="text" id="uname" value={uname} onChange={(e)=>{setUname(e.target.value)}}/>
   <br></br>Please enter Password
   <input className="border-2" type="password" id="pwd" value={pwd} onChange={(e)=>{setPwd(e.target.value)}}/>
  <br></br>
  <input className="border-2" type="button" value="Login" onClick={check}/>
</div>


var logoutUser=<div>
You are logged in
<input type="button" value="Logout" onClick={logout}/>
</div>
  return(

    <div className="grid grid-cols-6 bg-blue-200 text-2xl px-10 py-20">
      <div><a href="/Home">Home</a></div>
       <div><a href="/Books">Books</a></div>
       
       <div><a href="/ContactUs">Contact Us</a></div>
       <div> </div>
       <div> </div>
       <div>{logStatus==0?login:logoutUser}</div>

    </div>
  );


}