import axios from 'axios';
import React, { useState } from 'react'
import Header from './Header'
import {useHistory} from 'react-router-dom';

const AddImage = () => {

    const user = JSON.parse(localStorage.getItem('user_info'))

    const [name,setName] = useState("");
    const [category, setCategory] = useState("");
    const [file,setFile] = useState("");
    const [place,setPlace] = useState("");
    const [description,setDescription] = useState("");
    const history = useHistory();


async function addImage(e){
    e.preventDefault();

    const formData = new FormData();
    formData.append("file",file);
    formData.append("name",name);
    formData.append("category",category);
    formData.append("place",place);
    formData.append("description",description);
    formData.append("user_id",user.data.user.id)
    formData.append("user_name",user.data.user.name)

    axios({
        method:"POST",
        url:"http://127.0.0.1:8000/api/addimage",
        data: formData
    }).then(function(response){
        if(response.status == 200){
            alert('your data has been saved and safe with us...')
            history.push("/");                        
        }else{
            alert('something went wrong please try again after refreshing the page...')
        }
    }).catch(function(response){
        console.log(response);
    })

}

    return (
        <>
        <Header />
        <br /><br />
        <div className="col-sm-6 offset-sm-3">
            <br /><br />
            <form>

            <input type="text" className="form-control" placeholder="Image name" onChange={(e)=>setName(e.target.value)} name="name" /><br />
            <input type="text" className="form-control" placeholder="category" onChange={(e)=>setCategory(e.target.value)} name="category" /><br />
            <input type="file" className="form-control" placeholder="file" onChange={(e)=>setFile(e.target.files[0])} name="file" /><br />
            <input type="text" className="form-control" placeholder="place" onChange={(e)=>setPlace(e.target.value)} name="place" /><br />
            <input type="text" className="form-control" value={user.data.user.id} readOnly name="user_id" /><br />
            <input type="text" className="form-control" value={user.data.user.name} readOnly name="user_name" /><br />
            <textarea type="text" className="form-control" placeholder="description" col="20" rows="5" onChange={(e)=>setDescription(e.target.value)} /><br />
            <button className="btn btn-primary" onClick={addImage} >Add Product</button>
            </form>
        </div>
        </>
    )
}

export default AddImage
