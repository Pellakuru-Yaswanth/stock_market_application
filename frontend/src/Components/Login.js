import axios from "axios";
import { useState } from "react";

function Login(){
    const [invalid, setInvalid] = useState("");
    const handleSubmit = (event) => {
        event.preventDefault();
        let username = event.target.username.value;
        let password = event.target.password.value;
        if(username==="" || password === "") setInvalid("Username/Password must not be empty");
        else{
        axios.post('http://localhost:3036/login', {username, password})
        .then(res => {
            if(res.data === true) {
                sessionStorage.setItem('user', 'user');
                setInvalid("")
                window.location.href = '/dashboard';
            }
            else{
                setInvalid("Username/Password incorrect")
            }
        }).catch((err) =>{
            setInvalid("Could not process your request! Try after some time")

        });
    }
    }
    const signup = () => {
        window.location.href = './signup';
    }
    return(
        <div id='loginpage'>
        <div id='login'>
            <h3>Login</h3>
            <form onSubmit={handleSubmit}>
                <tr>
                    <td><label htmlFor="username">Username: </label></td>
                    <td><input name = 'username' type="text" placeholder=" username"></input></td>
                </tr>
                <tr>
                    <td><label htmlFor="password">Password: </label></td>
                    <td><input name = 'password' type="text" placeholder=" password"></input></td>
                </tr>
                <tr><td colSpan={2} id='submit'><input type="submit"></input></td></tr>
            </form>
            <center><p className='invalid'>{invalid}</p></center>
            <div id='signupb'>
                Don't have an account?
                <a onClick={signup}>Signup</a>
            </div>
        </div>
        </div>
    )
}
export default Login;