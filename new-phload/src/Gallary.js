
import axios from 'axios';
import React,{useState,useEffect} from 'react'
import Header from './Header'


const Gallary = () => {

const [data, setData] = useState([]);

useEffect(async()=>{
let result = await fetch("http://127.0.0.1:8000/api/imagelist");
result = await result.json();
setData(result);
},[])

 function download(index){
    index = index+1;
    axios({
        url : "http://127.0.0.1:8000/api/download/"+index,
        method : "GET",
        responseType : 'blob',
    }).then(response=>{
        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download",'image.jpg')
        document.body.appendChild(link)
        link.click()
    });
}


return (
<>
    <Header />
    <br /><br />
        <h1 style={{
            marginTop: '2rem',
            marginBottom: '2rem',
        }}>Our Images</h1>
            <hr />
    <div className="gallary">
            
      
                {
                data.map((data,index)=>            
                    <>
                    <div className="pics" key={index}>

                    <a href={"http://127.0.0.1:8000/gallary/"+data.image} target="_blank"><img style={{width:'100%'}}
                            src={"http://127.0.0.1:8000/gallary/"+data.image} alt={data.category} onClick={()=>download(index)} /> </a>
                    </div>

                </>
                )
                }


    </div>



   














</>
)
}

export default Gallary