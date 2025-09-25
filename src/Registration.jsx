import React,{ useState } from "react";
import "./assets/styles.css";
import {useNavigate} from "react-router-dom";
import Logo from './Logo';

export default function Registation() {
    const[userName, setUsername] = useState("");
    const[email,setEmail] = useState("");
    const[password,setPassword] = useState("");
    const[role, SetRole] = useState("CUSTOMER");
    const[error,setError] = useState(null);
      const API_BASE = import.meta.env.VITE_API_BASE_URL;

    const handleSignUp = async(e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await fetch(`${API_BASE}/api/users/register`, {
            method: "Post",
            headers : {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({userName,email,password,role}),
            });
            const data = await response.json();

            if(response.ok) {
                console.log("User registered successfully:",data);
                window.location.href="/Login";
            }

            else {
                throw new Error(data.error || "Registration Failed")
            }
        }  catch(err) {
              setError(err.message)
        }
    };

    return (
        <div className="l-page-wrapper">
        <div className="page-container">
            <div className="auth-page-logo">
                      <Logo />
                  </div>
            <div className="form-container">
                <h1 className="form-title">Register</h1>
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={handleSignUp} className="form-content">
                    <div className="form-group">
                        <label htmlFor="userName" className="form-label">
                            Username:
                        </label>
                        <input type="text" id="userName" placeholder="Enter your username" value={userName} onChange={(e)=>setUsername(e.target.value)} required className="form-input"/>     
                    </div>

                    <div className="form-group">
                        <label htmlFor="email" className="form-label">
                            Email:
                        </label>
                        <input type="email" id="email" placeholder="Enter your email" value={email} onChange={(e)=>setEmail(e.target.value)} required className="form-input"/>
                        
                    </div>

                     <div className="form-group">
                        <label htmlFor="password" className="form-label">
                            Password:
                        </label>
                        <input type="password" id="password" placeholder="Enter your password" value={password} onChange={(e)=>setPassword(e.target.value)} required className="form-input" pattern="^(?=.*[A-Za-z])(?=.*\d).{6,}$" title="Min 6 chars, include 1 letter & 1 number"></input>
                        
                    </div>

                       <div className="form-group">
                        <label htmlFor="role" className="form-label">
                            Role:
                        </label>
                        <select id="role" value={role} onChange={(e)=>SetRole(e.target.value)} required className="form-select">
                        <option value="CUSTOMER">CUSTOMER</option>
                          <option value="ADMIN">ADMIN</option>
                        </select> 
                    </div>

                    <button type="submit" className="form_button">Sign Up</button>
                </form>

                <p className="form-footer">
                    Already a user? {" "}
                    <a href="/Login" className="form-link">Login here</a>
                </p>
                
            </div>    
    
        </div>
        </div>

        
    );

}