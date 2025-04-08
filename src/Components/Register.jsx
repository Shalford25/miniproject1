import { useState, useEffect } from "react";

export default function Register() {
  const [fname, setFname] = useState(""), [lname, setLname] = useState(""), [id, setID] = useState(""), [email, setEmail] = useState(""), [zcode, setZcode] = useState(""), [uname, setUname] = useState(""), [pwd, setPwd] = useState(""), [role, setRole] = useState(""), [roles, setRoles] = useState([]);

  useEffect(() => {
    fetch("https://exp-server-mini-proj2.vercel.app/roles")
      .then((response) => response.json())
      .then((data) => {
        setRoles(data.rows);
        if (data.rows.length > 0) setRole(data.rows[0].role_id);
      })
      .catch((error) => {
        console.error("Error fetching roles:", error);
        alert("Failed to fetch roles.");
      });
  }, []);

  function validate() {
    const NoNumbers = /^[A-Za-z]+$/, EmailCheck = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/, NoWhitespace = /\s/, NoStart = /^[a-zA-Z0-9](.*[a-zA-Z0-9])?$/, CheckNumbers = /^-?\d+\.?\d*$/, CheckUppercase = /[A-Z]/, CheckLowercase = /[a-z]/, OneDigit = /\d/;

    if (!NoNumbers.test(fname)) alert("First name must not contain numbers");
    else if (!NoNumbers.test(lname)) alert("Last name must not contain numbers");
    else if (!CheckNumbers.test(id)) alert("ID must be numeric only");
    else if (!EmailCheck.test(email)) alert("Must contain both @ and . symbols, with @ appearing before");
    else if (!CheckNumbers.test(zcode)) alert("Zip code must be numeric only");
    else if (NoWhitespace.test(uname) || !NoStart.test(uname)) alert("Username cannot start with a number or special character, and cannot contain spaces");
    else if (pwd.length < 10 || !CheckUppercase.test(pwd) || !CheckLowercase.test(pwd) || !OneDigit.test(pwd)) alert("Password needs to be 10 characters or longer, contain one uppercase and one lowercase letter, and contain at least one digit");
    else {
      const city = document.getElementById("city").value;
      fetch("https://exp-server-mini-proj2.vercel.app/users/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fname, lname, user_id: id, email, city, zcode, uname, password_hash: pwd, role }),
      })
        .then((response) => {
          if (response.ok) alert("User registered successfully!");
          else alert("Failed to register user.");
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("An error occurred while registering.");
        });
    }
  }

  return (
    <div>
      <h1 className="headertext">Please Sign Up</h1>
      <div>
        <p>First Name:</p><input className="border-2" type="text" id="fname" value={fname} onChange={(e) => setFname(e.target.value)} />
        <p>Last Name:</p><input className="border-2" type="text" id="lname" value={lname} onChange={(e) => setLname(e.target.value)} />
        <p>ID:</p><input className="border-2" type="number" id="id" value={id} onChange={(e) => setID(e.target.value)} />
        <p>Email:</p><input className="border-2" type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <p>City:</p>
        <select className="border-2" id="city">
          <option value="Greenwood" selected>Greenwood</option>
          <option value="Columbia">Columbia</option>
          <option value="Charleston">Charleston</option>
          <option value="Clemson">Clemson</option>
        </select>
        <p>Zip Code:</p><input className="border-2" type="number" id="zcode" value={zcode} onChange={(e) => setZcode(e.target.value)} />
        <p>Username:</p><input className="border-2" type="text" id="uname" value={uname} onChange={(e) => setUname(e.target.value)} />
        <p>Password:</p><input className="border-2" type="password" id="pwd" value={pwd} onChange={(e) => setPwd(e.target.value)} />
        <p>Role:</p>
        <select className="border-2" id="role" value={role} onChange={(e) => setRole(e.target.value)}>
          {roles.map((r) => (<option key={r.role_id} value={r.role_id}>{r.role_name}</option>))}
        </select><br />
        <input className="border-2" type="button" value="Sign Up" onClick={validate} />
      </div>
    </div>
  );
}