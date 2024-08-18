import { useState } from "react";
import axios from "axios";

function Signup(){
    const [user, setUser] = useState("");
    const handleSubmit = (event) => {
        event.preventDefault();
        let {fullname, username, password, cpassword, email, mobile} = event.target;
        fullname = fullname.value;
        username = username.value;
        password = password.value;
        cpassword = cpassword.value;
        email = email.value;
        mobile = mobile.value;
        if(fullname == "" || username == "" || password =="") alert("Fullname or Username or password must not be empty");
        else if(password!=cpassword) setUser("Password & Confirm Password mismatched");
        else if(isNaN(mobile)) setUser("Mobile number should contain numeric characters only");
        else if(mobile.length!=10) setUser("Mobile number should contain 10 digits");
        else{
            axios.post('http://localhost:3036/userRegister', {fullname, username, password, email, mobile})
            .then(res => {
                if(res.data===true) {
                    alert("You have successfully registered");
                    window.location.href = './login';
                }
                else setUser("User already exists");
            }).catch(setUser("Could not process your request! Please try after some time"))
        }
    }
    return(
        <div id='signuppage'>
            <h4 id='loginPath'><a onClick={() => {window.location.href = './login'}}>{"< Go to login"}</a></h4>
            <div id='signup'>
                <h3>Signup</h3>
                <form onSubmit={handleSubmit}>
                    <tr>
                        <td><label htmlFor="fullname">Full Name: </label></td>
                        <td><input name = 'fullname' type="text" placeholder=" Enter your name"></input></td>
                    </tr>
                    <tr>
                        <td><label htmlFor="username">Username: </label></td>
                        <td><input name = 'username' type="text" placeholder=" username"></input></td>
                    </tr>
                    <tr>
                        <td><label htmlFor="password">Password: </label></td>
                        <td><input name = 'password' type="text" placeholder=" password"></input></td>
                    </tr>
                    <tr>
                        <td><label htmlFor="cpassword">Confirm Password: </label></td>
                        <td><input name = 'cpassword' type="text" placeholder=" confirm password"></input></td>
                    </tr>
                    <tr>
                        <td><label htmlFor="email">Email: </label></td>
                        <td><input name = 'email' type="text" placeholder=" email"></input></td>
                    </tr>
                    <tr>
                        <td><label htmlFor="mobile">Mobile: </label></td>
                        <td><input name = 'mobile' type="text" placeholder=" mobile"></input></td>
                    </tr>
                    <tr><td colSpan={2} id='submit'><input type="submit" value="Create Account"></input></td></tr>
                </form>
                <center><p className='invalid'>{user}</p></center>
            </div>
        </div>
    )
}
export default Signup;