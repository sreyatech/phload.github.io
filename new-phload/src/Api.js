import React, {useEffect, useState} from 'react'
import Header from './Header'
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import { Link, Redirect } from "react-router-dom" ;
// import Json from './Json';

const Api = () => {

const user = JSON.parse(localStorage.getItem('user_info'))
const [show,setShow] = useState(false);
const [users, setUsers] = useState([]);
const [request, setRequest] = useState();
const history = useHistory();
const [token,setToken] = useState();
const api = `your api key`;
const apiUrl = 'http://127.0.0.1:8000/api';
// const [block, setBlock] = useState({display : 'none'})


useEffect(async()=>{
    axios({
        method : "POST",
        url : "http://127.0.0.1:8000/api/api",
    }).then(function(response){
        if(response.status == 200){
            setToken(user.data.token);
            // console.log(token);
        }
    }).catch(function(response){
        // console.log(response);
    });
},[])  

    const authAxios = axios.create({
        baseURL : apiUrl,
        headers : {
            Authorization : `Bearer ${token}`
        }
    })


    const fetchData = (async(e)=>{
        e.preventDefault();
        try {
            const result = await authAxios.get(`${apiUrl}/getall`);
            let fetchData = JSON.stringify(result.data)
            setUsers(fetchData);
        }
        catch(err){
            setRequest(err.message)
        }
    })

    return (
        <>
        <Header />
        <br /><br />
        <div className="col-sm-6 offset-sm-3">  <br /><br />
        Default Api :      
      

        <input type="text" value={token} className="form-control" name="api" />

        


<br />
<br />

        <Link type="submit" className="btn btn-primary" to="/jsondata" onClick={fetchData}>Generate</Link><br /><br />

</div>
            {
                token ? 
                <div className="container bg-dark" style={{
                    padding : '1rem',
                    border : '1px solid black',
                    marginBottom : '1rem',
                    color : 'tomato',
                    borderRadius : '5px',
                    overflow : 'auto',
                }}>
               {users}
                </div> : null
            }
                <br/>

    
        </>
    )
}

export default Api
