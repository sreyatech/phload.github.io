import React, {useState} from 'react'
import Header from './Header'
import axios from 'axios';
import {useHistory} from 'react-router-dom';

const Login = () => {

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const history = useHistory();

async function login(e){
    e.preventDefault();
    let item = {email, password}
    axios({
        method: "POST",
        url : "http://127.0.0.1:8000/api/login",
        data : item,
    }).then(function(response){
        if(response.status == 201){
            alert(response.data.message)
        }else if(response.status == 202){
            alert(response.data.message)            
            }else if(response.status == 200){
                localStorage.setItem("user_info",JSON.stringify(response))
                history.push("/");                        
           }
    }).catch(function(response){
        console.log(response);
    })
}

    return (
        <>
         <Header />
         <div className="col-sm-6 offset-sm-3">
         <br />
         <br />
        <form action="" className="p-5 form">
                <input type="email" className="form-control" placeholder="email" value={email} onChange={(e)=>setEmail(e.target.value)}
                required /> <br/>
                <input type="password" className="form-control" placeholder="password" value={password}
                    onChange={(e)=>setPassword(e.target.value)} /><br />
                <button type="submit" className="btn btn-primary" onClick={login}>Login</button>
            </form>
    </div>
        </>
    )
}

export default Login
