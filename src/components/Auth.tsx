import { useState } from "react";
import { signUp, login } from "../AuthService";
import { Link } from "react-router-dom";
interface AuthForms {
    darkMode: boolean
    setDarkMode: (darkmode: boolean) => void
    onAuthSuccess: () => void;
    
}
export default function Auth({ onAuthSuccess, darkMode, setDarkMode } : AuthForms) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSignUp, setIsSignUp] = useState(false);
    const [error, setError] = useState('');
    const [successLink, setSuccessLink] = useState('/auth')
    const handleAuth = async () => {
        try {
            setSuccessLink('/')
            if (isSignUp) {
                await signUp(email, password);
                
            } else {
                await login(email, password);
                setSuccessLink('/')
            }
            onAuthSuccess();
        } catch (err) {
            setError("Authentication failed. Check your credentials.");
            setSuccessLink('/auth')
        }
    }

    return (
        <div>
            <div className={`${darkMode ? 'bg-blur1': 'bg-blur2'}  flex  sm:gap-0  justify-between items-center pt-5 px-10 pb-5 border-b-[1px] border-[#5a626957]`}>
                <Link to='/'>
                    <h1 className="text-sm sm:text-xl flex-1 justify-center"><i className="fa-solid fa-hippo"></i> PomoTodo</h1>
                </Link>
                <div className='flex gap-2 items-center text-sm sm:text-xl'>       
                    <button className='cursor-pointer' onClick={() => {setDarkMode(!darkMode)}}>{darkMode ? 'Theme 🌞' : 'Theme 🌙'}</button>
                </div>
            </div>
            <div className="p-4 max-w-sm mx-auto mt-20">
                <h2 className="text-xl font-bold mb-2">{isSignUp ? "Sign Up" : "Login"}</h2>
                {error && <p className="text-red-500">{error}</p>}
                <input
                type="email"
                placeholder="Email"
                className="border p-2 w-full mb-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
                <input
                type="password"
                placeholder="Password"
                className="border p-2 w-full mb-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
                <Link to={successLink}>
                    <button onClick={handleAuth} className="bg-blue-500 text-white p-2 w-full cursor-pointer">
                    {isSignUp ? "Sign Up" : "Login"}
                    </button>
                </Link>
                
                <p
                className="text-sm text-blue-500 cursor-pointer mt-2"
                onClick={() => setIsSignUp(!isSignUp)}
                >
                {isSignUp ? "Already have an account? Login" : "Don't have an account? Sign Up"}
                </p>
            </div>
        </div>
        
  )
}