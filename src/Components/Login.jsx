import { useState } from "react";

export default function Login() {
  const [uname, setUname] = useState("");
  const [pwd, setPwd] = useState("");
  const [loginStatus, setLogin] = useState(sessionStorage.getItem("logged") !== null ? sessionStorage.getItem("logged") : 0);

  async function check() {
    try {
      const response = await fetch("https://exp-server-mini-proj2.vercel.app/users");
      const data = await response.json();

      const user = data.rows.find(
        (user) => user.username === uname.trim() && user.password_hash === pwd.trim()
      );

      if (user) {
        sessionStorage.setItem("logged", 1);
        setLogin(1);
        alert("You have logged in");
      } else {
        alert("Your information is incorrect");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred while trying to log in.");
    }
  }

  function logout() {
    setLogin(0);
    sessionStorage.setItem("logged", 0);
  }

  const login = (
    <div>
      <h1 className="headertext">Please Enter Login Information</h1>
      <div>
        <h2>Please enter Username: </h2>
        <input className="border-2" type="text" id="uname" value={uname} onChange={(e) => {setUname(e.target.value);}}/>
        <br/>
        <h2>Please enter Password: </h2>
        <input className="border-2" type="password" id="pwd" value={pwd} onChange={(e) => {setPwd(e.target.value);}}/>
        <br/>
        <input className="border-2" type="button" value="Login" onClick={check} />
      </div>
    </div>
  );

  const logoutUser = (
    <div>
      <h1 className="headertext">You are logged in</h1>
      <input type="button" value="Logout" onClick={logout} />
    </div>
  );

  return <div>{loginStatus == 0 ? login : logoutUser}</div>;
}