import React from 'react';
// import { ToastContainer } from 'react-toastify';
import './App.css';
import { Switch, Route } from "react-router-dom" ;
import Gallary from './Gallary';
import Login from './Login'
import Register from './Register'
import AddImage from './AddImage'
import UpdateImage from './UpdateImage'
import Api from './Api'
import Protected from './Protected';


function App() {
  return (
   <>
   <div> 
      <Switch>
    
    <Route exact path="/">
      <Gallary />
    </Route>
    <Route exact path="/login">
      <Login />
    </Route>
    <Route exact path="/register">
      <Register />
    </Route>
    <Route exact path="/addimage">
    <Protected Cmp={AddImage} />
    </Route>
    
    <Route exact path="/api">
    <Protected Cmp={Api} />
    </Route>
        
    <Route exact path="/updateimage">
      <Protected Cmp={UpdateImage} />
     </Route>

     </Switch>
   </div>

   {/* <ToastContainer /> */}
   </>
  );
}

export default App;
