import { useState } from 'react'
import '../index.css'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import auth from '../../firebase';
import { useNavigate } from 'react-router-dom';
const Home = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoginActive, setIsLoginActive] = useState(true);
    const [error, setError] = useState();
    const navigate = useNavigate();

    const handleEmail = (e) => {
        setEmail(e.target.value)
    }
    const handlePassword = (e) => {
        setPassword(e.target.value)
    }
    const handleChangeForm = () => {
        setIsLoginActive(!isLoginActive)
        setError("")
    }
    const handleLogin = (e) => {
        e.preventDefault();
        if (!email || !password) {
            setError("Please enter email & password")
        }
        else {
            signInWithEmailAndPassword(auth, email, password).then(response => {
                const user = response.user
                navigate("/private")
                alert("successfully loged in")
            }).catch(error => {
                const errorMessage = error.message;
                navigate("/")
                setError(errorMessage)
            })
        }
    }
    const handleSignUp = (e) => {
        e.preventDefault();
        if (!email || !password) {
            setError("Please enter email & password")
        }
        else {
            createUserWithEmailAndPassword(auth, email, password).then(response => {
                const user = response.user
            }).catch(error => {
                const errorMessage = error.message;
                setError(errorMessage)
            })
            setIsLoginActive(true)
        }
    }

    return (
        <>
            <form>
                {isLoginActive ? <h2>Login Form</h2> : <h2>Sign Up Form</h2>}
                {error && <h4>{error}</h4>}
                <input type="email" placeholder="Email" onChange={handleEmail} />
                <input type="password" placeholder="Password" onChange={handlePassword} />
                {isLoginActive ? <button onClick={handleLogin}>Login</button> : <button onClick={handleSignUp}>Sign Up</button>}
                {isLoginActive ? <p>Don't have an account? <span onClick={handleChangeForm}>Sign Up</span></p> : <p>Already have an account! <span onClick={handleChangeForm}>Login</span></p>}
            </form>
        </>
    )
}
export default Home