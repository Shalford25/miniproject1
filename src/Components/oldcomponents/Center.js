
import {useState} from "react";
export default function Center(){
   const [x,setX]=useState(0);
   function handler(e){
     setX(e.target.value);
   }
    return(
        <div>
            Please enter a number <input type="text" id="num" 
            onChange={handler}        />
            <h1>The value of X is {x}</h1>

            <h1>{x}</h1>
        </div>
    );
    
    }