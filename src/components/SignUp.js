import { useEffect } from "react"
import { useNavigate } from 'react-router-dom'

const SignUp = ({ name, email, password, setName, setEmail, setPassword }) => {

    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate('/')
        }
    })

    const collectData = async (e) => {
        e.preventDefault();
        console.log(name, email, password);
        let result = await fetch('http://localhost:5001/register', {
            method: 'post',
            body: JSON.stringify({
                name,
                email,
                password
            }),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        result = await result.json()
        console.log(result);
        localStorage.setItem("user", JSON.stringify(result));
        navigate('/')
    }

    return (
        <div className="container">
            <h1>Register</h1>
            <form
                action="post"
                onSubmit={collectData}
            >
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    placeholder="Enter Your Fullname"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
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
                    onClick={collectData}
                >
                    Sign Up
                </button>
            </form>
        </div>
    )
}

export default SignUp