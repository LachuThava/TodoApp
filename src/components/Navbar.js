import React from 'react';
import {BellIcon, CheckCircleIcon, HomeIcon, PlusIcon} from '@heroicons/react/outline'
import { getAuth, signOut } from 'firebase/auth';
import PopupMsg from './PopupMsg';
import Popup from 'reactjs-popup';
import Notfications, {Notifications} from './Notfications';
import NotifiAdd from './NotifiAdd';

const Navbar = () => {


  function handleSignOut(e){
    const auth = getAuth();
    signOut(auth)
    .then((res)=>{
      console.log("signout");
      window.location.href ="/";
    }).catch((err)=>{
      console.log(err.message);
    })
  }


  function backToFeed(){
    window.location.href="/feed";
  }
  

  function Notification(){
    window.location.href = "/notifications"
  }

  return (
    <div className='border-b-rose-50 shadow-md content-center min-w-fit max-w-5xl p-2 flex justify-between bg-slate-100 h-16 m-auto'>
        <div className='p-2'>
            <h1 className='text-2xl font-semibold'>My ToDO</h1>
        </div>
        <div className='p-2 flex'>
            <HomeIcon onClick={backToFeed} className='w-5 h-5 mr-4 mt-2 cursor-pointer'   />
            <Popup
            position="bottom right"
            trigger={<PlusIcon className='w-5 h-5  mr-2 mt-2 cursor-pointer' />}>
            <NotifiAdd />
            </Popup>
            <Popup 
            position="bottom right"
             trigger={<BellIcon className='w-5 h-5  mr-2 mt-2 cursor-pointer' />}
            >
             <Notfications /> 
          </Popup>
          {/* <BellIcon onClick={Notification} className='w-7 h-7 mr-2 mt-2 cursor-pointer' /> */}
        <img src='https://pngset.com/images/circle-profile-picture-face-person-human-clothing-transparent-png-488441.png'
            className='h-8 w-10 rounded-full border-0 cursor-pointer'
            alt='avatar' onClick={handleSignOut}/>
        </div>
    </div>
  )
}

export default Navbar