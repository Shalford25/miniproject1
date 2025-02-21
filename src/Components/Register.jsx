import {useState, useContext} from "react";// Step 1
export default function Register(){
    const [fname,setFname]=useState("");
    const [lname,setLname]=useState("");
    const [id,setID]=useState("");
    const [email,setEmail]=useState("");
    const [zcode,setZcode]=useState("");
    const [uname,setUname]=useState("");
    const [pwd,setPwd]=useState("");

    function validate(){
        var NoNumbers = /^[A-Za-z]+$/;
        var EmailCheck = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        var NoWhitespace = /\s/;
        var NoStart = /^[a-zA-Z0-9](.*[a-zA-Z0-9])?$/;
        var CheckNumbers = /^-?\d+\.?\d*$/;
        var CheckUppercase = /[A-Z]/;
        var CheckLowercase = /[a-z]/;
        var OneDigit = /\d/;
        if(!NoNumbers.test(fname) || fname == null) alert("First name must not contain numbers");
        else if(!NoNumbers.test(lname)) alert("Last name must not contain numbers");
        else if(!CheckNumbers.test(id)) alert("ID must be numeric only");
        else if(!EmailCheck.test(email)) alert("Must contain both @ and . symbols, with @ appearing before");
        else if(!CheckNumbers.test(zcode)) alert("Zip code must be numeric only");
        else if(NoWhitespace.test(uname) || !NoStart.test(uname)) alert("Username cannot start with a number or special character, and cannot contain spaces");
        else if(pwd.length<10 || !CheckUppercase.test(pwd) || !CheckLowercase.test(pwd) || !OneDigit.test(pwd)) alert("Password needs to be 10 characters or longer, contain one uppercase and one lowercase letter, and contain at least one digit");
        else alert("First Name: "+fname+"\nLast Name: "+lname+"\nID: "+id+"\nEmail: "+email+"\nCity: "+document.getElementById('city').value+"\nZip Code: "+zcode+"\nUsername: "+uname+"\nPassword: "+pwd);
        }

    return(
      
                <div>
                <h1>Future Home of Register</h1>
                <div>
                <p>First Name: </p>
                <input className="border-2" type="text" id="fname" value={fname} onChange={(e)=>{setFname(e.target.value)}}/>

                <p>Last Name: </p>
                <input className="border-2" type="text" id="lname" value={lname} onChange={(e)=>{setLname(e.target.value)}}/>

                <p>ID: </p>
                <input className="border-2" type="number" id="id" value={id} onChange={(e)=>{setID(e.target.value)}}/>

                <p>Email: </p>
                <input className="border-2" type="text" id="email" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>

                <p>City: </p>
                <select className="border-2" type="text" id="city">
                    <option value="Greenwood" selected>Greenwood</option>
                    <option value="Columbia">Columbia</option>
                    <option value="Charleston">Charleston</option>
                    <option value="Clemson">Clemson</option>
                </select>

                <p>Zip Code: </p>
                <input className="border-2" type="number" id="zcode" value={zcode} onChange={(e)=>{setZcode(e.target.value)}}/>

                <p>Username: </p>
                <input className="border-2" type="text" id="uname" value={uname} onChange={(e)=>{setUname(e.target.value)}}/>

                <p>Password: </p>
                <input className="border-2" type="password" id="pwd" value={pwd} onChange={(e)=>{setPwd(e.target.value)}}/>
                <br></br>

                <input className="border-2" type="button" value="Sign Up" onClick={validate}/>
                </div>
                </div>
    )
            
    
    
    }