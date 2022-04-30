  import React from 'react';
  import signup from '../assets/signup.jpg';
  import {createUserWithEmailAndPassword} from 'firebase/auth';
  import { useState } from 'react';
  import { auth,db } from '../firebase';
  import {
    addDoc,
    collection,
    doc,
    serverTimestamp,
    setDoc
    }  from 'firebase/firestore';







  const SignUp = () => {
    const [email,setEmail] = useState();
    const [name,setName] = useState();
    const[password,setPassword]= useState();
    
   const  createUser = async (e) => {
    console.log("working");
    e.preventDefault(); 
    await createUserWithEmailAndPassword(auth,email,password)
    .then(async () =>{
      const uid = auth.currentUser?.uid;
      console.log("uid "+uid);
      let docRef = doc(db,`Users/${uid}`);
        try {
        await setDoc(docRef, 
          {
              "name" : name,
              "uid ": uid,
              "email":email,
              "createdTime" : serverTimestamp()
            }
            );
        
        alert("congratulations you successfully created your account :)")
        
        } catch (error) {
          console.log(error);
        }

        try {
          await setDoc(await doc(db,"Assignments",uid),{tasks:[]});
          await setDoc(await doc(db,"Workout",uid),{tasks:[]});
          await setDoc(await doc(db,"HomeWorks",uid),{tasks:[]});
        } catch (error) {
          console.log("databases not created");
        }
      
    
    }).catch((err)=>{
        console.log(err.message);
      })
      window.location.href = '/'; 
    }
    


  function handleSetEmail(event){
    setEmail(event.target.value);
  }
  function handleSetPassword(event){
    setPassword(event.target.value);
  }

  function handleSetName(event){
    setName(event.target.value);
  }


    return (
    //  <span>lachu</span>
          <div className='mt-2 m-auto max-w-xl h-auto p-5 border-2 bg-transparent border-b-white shadow-md flex-col'>
              <h1 className='text-3xl mb-7 text-center p-2 text-blue-700 font-semibold'>SignUp</h1>
              <img src={signup} alt="logo" className='w-60 h-48 p-2 m-auto' />
              <form className='flex flex-col' onSubmit={createUser} >
                  <label className='text-2xl mb-2'>Name</label>
                  <input placeholder=' John Wick' className='p-2 rounded-md h-10 bg-gray-100' value={name} onChange={handleSetName} type="text"></input>
                  <label className='text-2xl mb-2'>Email</label>
                  <input placeholder=' example@sample.com' className='p-2 rounded-md h-10 bg-gray-100' value={email} onChange={handleSetEmail} type="email"></input>
                  <label className='text-2xl  mb-2'>Password</label>
                  <input className='p-2 rounded-md h-10 rounded-md h-10 bg-gray-100' type="password" value={password} onChange={handleSetPassword} ></input>
                  <button className='mt-5 bg-green-500 rounded-lg m-auto mt-10 h-10 w-48 text-xl ' type='submit'>create</button>
            </form>
      </div>
    
    )
  }

  export default SignUp