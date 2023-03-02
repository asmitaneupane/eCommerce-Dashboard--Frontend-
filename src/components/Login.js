import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ email, setEmail, password, setPassword }) => {

    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate('/')
        }
    }, [])

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log(email, password);
        let result = await fetch('http://localhost:5001/login', {
            method: 'post',
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        result = await result.json();
        console.log(result);
        if (result.name) {
            localStorage.setItem("user", JSON.stringify(result));
            navigate('/');
        } else {
            alert("Please Enter Correct Details");
        }
    }

    return (
        <div className="container">
            <h1>Login</h1>
            <form action="post">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    placeholder="Enter Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    placeholder="Enter Your Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={handleLogin}
                >
                    Log In
                </button>
            </form>
        </div>
    )
}

export default Login