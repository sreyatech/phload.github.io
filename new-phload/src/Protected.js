import React, { useEffect } from 'react'
import { useHistory } from 'react-router';

const Protected = (props) => {

let Cmp = props.Cmp;
const history = useHistory();

useEffect(()=>{
    if(!localStorage.getItem("user_info")){
        history.push("/");
    }
})

    return (
        <>
            <Cmp />
        </>
    )
}

export default Protected
