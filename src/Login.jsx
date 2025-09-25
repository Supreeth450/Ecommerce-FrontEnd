import React,{ useState } from "react"
import { useNavigate } from "react-router-dom"
import './assets/styles.css'
import Logo from './Logo';

export default function LoginPage(){
    
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [error,setError] = useState(null)
    const navigate = useNavigate()
    const API_BASE = import.meta.env.VITE_API_BASE_URL;

    const handleSignIn = async (e) => {
        e.preventDefault()
        setError(null)


        try {

            const response = await fetch(`${API_BASE}/api/auth/login`,{
             method:"Post",
             headers: {
                'Content-Type': 'application/json',
             },
             credentials: 'include',
             body: JSON.stringify({email,password}),
            });

            const data = await response.json()

            if(response.ok) {
                console.log("User Loggedin Successfully:" ,data);

                if(data.role==="CUSTOMER"){
                    navigate("/customerhome")
                }

                else if(data.role==="ADMIN"){
                    navigate("/admindashboard")
                }

                else {
                    throw new Error('Invalid user role')
                }

            } else {
                throw new Error(data.error || 'Login Failed')
            }

        }
        catch(err) {
            setError(err.message)
        }
    };

    return(
       <div className="l-page-wrapper">
      
<div className="page-container">
      <div className="auth-page-logo">
          <Logo />
      </div>
    <div className="form-container">
        <h1 className="form-title">Login</h1>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSignIn} className="form-content">
            <div className="form-group">
                <label htmlFor="email" className="form-label">Email:</label>
                <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="form-input"
                />
            </div>
            <div className="form-group">
                <label htmlFor="password" className="form-label">Password:</label>
                <input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="form-input"
                />
            </div>
            <button type="submit" className="form_button">Sign In</button>
        </form>
        {/* <div className="form-footer">
            <a
              href="#"
              className="form-link"
              onClick={(e) => {
                e.preventDefault()
                navigate("/forgot-password")
              }}
            >
              Forgot Password?
            </a>
          </div> */}
        <div className="form-footer">
            New User?
            <a href="/" className="form-link"> Sign up here</a>
        </div>
    </div>
    </div>
</div>
 
    );
}