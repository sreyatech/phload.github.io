import React, { useEffect, useState } from 'react'
import Header from './Header'
import { Table,Button,Modal } from 'react-bootstrap'
import axios from 'axios'
import {useHistory} from 'react-router-dom';

const UpdateImage = () => {
    const user = JSON.parse(localStorage.getItem('user_info'))
    const user_id = user.data.user.id;
    const [data, setData] = useState([]);
const [show, setShow] = useState(false)

const [name,setName] = useState("");
    const [category, setCategory] = useState("");
    const [file,setFile] = useState("");
    const [place,setPlace] = useState("");
    const [description,setDescription] = useState("");
    const history = useHistory();

useEffect(async()=>{
axios({
url:"http://127.0.0.1:8000/api/updateimage/"+user_id,
method : "POST",
}).then(function(res){
setData(res.data)
console.log(data)
}).catch(function(res){
console.log(res)
})
},[])

const handleClose = () => setShow(false);
  const showModal = () => setShow(true);

const editImage = (id) =>{

    const formData = new FormData();
    formData.append("file",file);
    formData.append("name",name);
    formData.append("category",category);
    formData.append("place",place);
    formData.append("description",description);


    axios({
        url : "http://127.0.0.1:8000/api/editimage/"+id,
        method : "POST",
        data: formData
    }).then(function(res){
      if(res.status == 200){
        alert(res.data.message)
        history.push("/");                        
    }else{
        alert('something went wrong please try again after refreshing the page...')
    }
    }).catch(function(res){
        console.log(res);
    })
}


function deleteImage(id){
    axios({
        url : "http://127.0.0.1:8000/api/deleteimage/"+id,
        method : "POST",
    }).then(function(res){
        window.location.reload();
    }).catch(function(res){
        console.log(res);
    })
}


return (
<>
    <Header />
    <div className="container" style={{
        marginTop:'5rem',
    }}>

    <Table striped bordered hover variant="dark">
  <thead>
    <tr>
      <th>No.</th>
      <th>Image Name</th>
      <th>Image Category</th>
      <th>Image</th>
      <th>Update</th>
      <th>Destroy</th>

    </tr>
  </thead>
  <tbody>

  {
      data.map((i,key)=>
      <>

        <tr>
      <td>{key+1}</td>
      <td>{i.name}</td>
      <td>{i.category}</td>
      <td><img src={`http://127.0.0.1:8000/gallary/${i.image}`} style={{
          height: '100px',
          width : '100px',
      }} alt={i.name} /></td>
      <td><a onClick={()=>showModal(i.id)} className="btn btn-warning">Edit</a></td>
      <td><a onClick={()=>window.confirm('Are you sure to delete this image??') ? deleteImage(i.id) : null} className="btn btn-danger">Delete</a></td>
    </tr>

<Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Modal heading</Modal.Title>
    </Modal.Header>
    <Modal.Body>

    <input type="text" className="form-control" value={user.data.user.id} readOnly name="user_id" /><br />

            <input type="text" className="form-control" value={user.data.user.name} readOnly name="user_name" /><br />

    <input type="text" className="form-control" placeholder={i.name} onChange={(e)=>setName(e.target.value)} name="name" /><br />

    <input type="text" className="form-control" placeholder={i.category} onChange={(e)=>setCategory(e.target.value)} name="category" /><br />

    <input type="file" className="form-control" onChange={(e)=>setFile(e.target.files[0])} name="file" /><br />

    <input type="text" className="form-control" placeholder={i.place} onChange={(e)=>setPlace(e.target.value)} name="place" /><br />

    <textarea type="text" className="form-control" placeholder={i.description} col="20" rows="5" onChange={(e)=>setDescription(e.target.value)} /><br />

    </Modal.Body>
    <Modal.Footer>
      <button className="btn btn-primary" onClick={()=>editImage(i.id)} >Update Product</button>
      <Button variant="secondary" onClick={handleClose}>
        Close
      </Button>
    </Modal.Footer>
  </Modal>
    </>
      )
  } 
  
  </tbody>
</Table>

    </div>
</>
)
}

export default UpdateImage