import {useState} from "react";
export default function Home(){

    const [name,setName]=useState("");
    // function nameHandler(e){
    //     setName(e.target.value);
    // }
    return(
      
                <div>
                <h1>Welcome {name} </h1>
                Please enter your name
                <input type="text" id="uname" value={name} onChange={(e)=>{setName(e.target.value);}}></input>
               <h2> You are {name}</h2>
                </div>
    )
            
    
    
    }