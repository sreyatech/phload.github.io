import React,{useState} from 'react'
import Header from './Header'
import {useHistory} from 'react-router-dom';
// import { toast } from 'react-toastify';
import axios from 'axios';

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();

    const formData = new FormData();
    formData.append("name",name);
    formData.append("email",email);
    formData.append("password",password);

async function signUp(){
    axios({
        method:"POST",
        url:"http://127.0.0.1:8000/api/register",
        data:formData,
    }).then(function(response){
        if(response.status == 202){
         alert(response.data.message)
        }else if(response.status == 202){
            alert(response.data.message)            
        }else if(response.status == 200){
            // console.log(response);
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

        <input type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder="name" className="form-control" name="name" /><br />
        <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="email" className="form-control" name="email" /><br />
        <input type="password" onChange={(e)=>setPassword(e.target.value)} placeholder="password" value={password} className="form-control" name="password" /><br />
        <button type="submit" className="btn btn-primary" onClick={signUp}>Sign Up</button>
    </form>
</div>
        </>
    )
}

export default Register
