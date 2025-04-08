import { useState, useEffect } from "react";

export default function Register() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [id, setID] = useState("");
  const [email, setEmail] = useState("");
  const [zcode, setZcode] = useState("");
  const [uname, setUname] = useState("");
  const [pwd, setPwd] = useState("");
  const [role, setRole] = useState(""); // Selected role
  const [roles, setRoles] = useState([]); // List of roles

  // Fetch roles from the server
  useEffect(() => {
    fetch("https://exp-server-mini-proj2.vercel.app/roles")
      .then((response) => response.json())
      .then((data) => {
        setRoles(data.rows); // Populate roles from the response
        if (data.rows.length > 0) {
          setRole(data.rows[0].id); // Set default role to the first one
        }
      })
      .catch((error) => {
        console.error("Error fetching roles:", error);
        alert("Failed to fetch roles.");
      });
  }, []);

  function validate() {
    const NoNumbers = /^[A-Za-z]+$/;
    const EmailCheck = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    const NoWhitespace = /\s/;
    const NoStart = /^[a-zA-Z0-9](.*[a-zA-Z0-9])?$/;
    const CheckNumbers = /^-?\d+\.?\d*$/;
    const CheckUppercase = /[A-Z]/;
    const CheckLowercase = /[a-z]/;
    const OneDigit = /\d/;

    if (!NoNumbers.test(fname) || fname == null) {
      alert("First name must not contain numbers");
    } else if (!NoNumbers.test(lname)) {
      alert("Last name must not contain numbers");
    } else if (!CheckNumbers.test(id)) {
      alert("ID must be numeric only");
    } else if (!EmailCheck.test(email)) {
      alert("Must contain both @ and . symbols, with @ appearing before");
    } else if (!CheckNumbers.test(zcode)) {
      alert("Zip code must be numeric only");
    } else if (NoWhitespace.test(uname) || !NoStart.test(uname)) {
      alert("Username cannot start with a number or special character, and cannot contain spaces");
    } else if (
      pwd.length < 10 ||
      !CheckUppercase.test(pwd) ||
      !CheckLowercase.test(pwd) ||
      !OneDigit.test(pwd)
    ) {
      alert(
        "Password needs to be 10 characters or longer, contain one uppercase and one lowercase letter, and contain at least one digit"
      );
    } else {
      const city = document.getElementById("city").value;

      // Send data to the server
      fetch("https://exp-server-mini-proj2.vercel.app/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fname,
          lname,
          user_id: id,
          email,
          city,
          zcode,
          uname,
          password_hash: pwd,
          role, // Selected role
        }),
      })
        .then((response) => {
          if (response.ok) {
            alert("User registered successfully!");
          } else {
            alert("Failed to register user.");
          }
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
        <p>First Name: </p>
        <input
          className="border-2"
          type="text"
          id="fname"
          value={fname}
          onChange={(e) => setFname(e.target.value)}
        />

        <p>Last Name: </p>
        <input
          className="border-2"
          type="text"
          id="lname"
          value={lname}
          onChange={(e) => setLname(e.target.value)}
        />

        <p>ID: </p>
        <input
          className="border-2"
          type="number"
          id="id"
          value={id}
          onChange={(e) => setID(e.target.value)}
        />

        <p>Email: </p>
        <input
          className="border-2"
          type="text"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <p>City: </p>
        <select className="border-2" id="city">
          <option value="Greenwood" selected>
            Greenwood
          </option>
          <option value="Columbia">Columbia</option>
          <option value="Charleston">Charleston</option>
          <option value="Clemson">Clemson</option>
        </select>

        <p>Zip Code: </p>
        <input
          className="border-2"
          type="number"
          id="zcode"
          value={zcode}
          onChange={(e) => setZcode(e.target.value)}
        />

        <p>Username: </p>
        <input
          className="border-2"
          type="text"
          id="uname"
          value={uname}
          onChange={(e) => setUname(e.target.value)}
        />

        <p>Password: </p>
        <input
          className="border-2"
          type="password"
          id="pwd"
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
        />

        <p>Role: </p>
        <select
          className="border-2"
          id="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          {roles.map((r) => (
            <option key={r.id} value={r.id}>
              {r.name || r.id} {/* Display role name if available */}
            </option>
          ))}
        </select>
        <br />

        <input className="border-2" type="button" value="Sign Up" onClick={validate} />
      </div>
    </div>
  );
}