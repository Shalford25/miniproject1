import {useState, useContext} from "react";// Step 1
export default function Login(){
const [uname,setUname]=useState("");
const [pwd, setPwd]=useState("");
const [loginStatus, setLogin] = useState((sessionStorage.getItem("logged")!=null?sessionStorage.getItem(""):0));
function check(){
    if(uname.trim()==="user1"  && pwd.trim() === "test") alert("You have logged in");
    else alert("Your information is incorrect");
    }
    return(
      
                <div>
                <h1>Please Enter Login Information</h1>
                <div>
                <h2>Please enter Username: </h2> 
                <input className="border-2" type="text" id="uname" value={uname} onChange={(e)=>{setUname(e.target.value)}}/>
                <br/><h2>Please enter Password:  </h2>
                <input className="border-2" type="password" id="pwd" value={pwd} onChange={(e)=>{setPwd(e.target.value)}}/>
                <br></br>
                <input className="border-2" type="button" value="Login" onClick={check}/>
                </div>
                </div>
    )
            
    
    
    }