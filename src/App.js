import React from "react";
import {BrowserRouter ,Route, Routes} from 'react-router-dom';
import Login from "./components/Login";
import SignUp from "./components/Signup";
import Feed from "./components/Feed";
import Task from "./components/Task";
import {auth,app} from './firebase';
import Notfications from "./components/Notfications";
function App() {
  const uid = auth.currentUser?.uid;
  return (
    <div >
        <BrowserRouter>
          <Routes>
            <Route exact path='/' element={<Login />}/>
            <Route  path='/signUp'element={<SignUp />} />
            <Route  path='/feed' element={<Feed />}/>
            {/* <Route  path='feed/popup' element={<PopupMsg />}/> */}
            <Route path="/feed/:name" element={<Task/>} />
            <Route path="/notifications" element={<Notfications />} />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
