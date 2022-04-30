  import React, { useState } from 'react';
  import { PlusCircleIcon} from "@heroicons/react/outline";
  import {Popup} from 'reactjs-popup';
  import Message from './PopupMsg';
  import { auth, db} from '../firebase';
  import { doc,getDoc} from 'firebase/firestore';

import { Link } from 'react-router-dom';





  const CreateCategories=()=>{
    return (
      <div className='p-5'>
      <div className=' h-60 w-44 flex  shadow-md relative rounded-3xl bg-neutral-50'>
        <Popup 
          trigger={<PlusCircleIcon className='cursor-pointer h-10 w-10 absolute text-gray-300 top-24 left-16'/>}
          position="right center"
          >
        <Message />
        </Popup>
      </div>
    </div>
    );
  }



  const Home = () => {
    // const[cate,setCate] = useState();
    const [name,setName] = useState("");
    const uid = auth.currentUser?.uid;

    const categories = [
      {
        "id": "0",
        "name":"Assignments"
      },
      {
        "id":"1",
        "name":"HomeWorks"
      },
      {
        "id":"2",
        "name":"Workout"
      }
    ];

    // const uid  = auth.currentUser?.uid;

   


    const   MyCategories = () =>{
    return(
      categories.map((cat)=>{
        return(
          <div key={cat.id} className='p-5'>
            <div className='text-center p-5 h-30 cursor-pointer rounded-3xl bg-sky-200 shadow-sm'>
                <Link to={`/feed/${cat.name}`} className='no-underline text-white text-lg'>
                  {cat.name}
                </Link>
            </div>
          </div>
        );
      })
    );

    
    }

    
      
    const Username = () =>{
      // const db =  getDatabase();
      // console.log(uid);
      
      
      const getUserName = async () =>{
        const uid  = await auth.currentUser?.uid;
        console.log(uid);
        const docRef = doc(db,`Users/${uid}`);
        const snapshot = await getDoc(docRef);
        // console.log(snapshot.data());
        
        if(snapshot.exists){
          const name = snapshot.get("name");
          console.log(name);
          return (
            setName(name)
              // <h1 className='text-lg text-blue-500'>{name}</h1>
          );
        }else{
          return(
            setName("empty")
          );
        }
      }  

      getUserName()



    }
    
  Username()

    return (
      <div className='p-2 max-w-5xl m-auto mt-1' >

          <div className="row flex">
          <div className=' p-2 text-center flex mb-40'>
            <div className='col-6 '>
                <h1 className='text-9xl text-start text-purple-500   '>Welcome<br/>{name}</h1>
            </div>
            <div className='col-6 hidden md:block '>
                <img 
                className='rounded-xl h-80 ml-20'
                  src='https://cdn.dribbble.com/users/1040016/screenshots/15597808/media/a51fafa981c9de62661dc14a7e588f51.gif'
                />
            </div>
            </div>
          </div>
          {/* <hr/> */}
          {/* <Message /> */}
          <div className='flex justify-center items-center translate-x-16  m-auto '>
              <img 
              src="https://cdn.dribbble.com/users/1304297/screenshots/5083263/media/9b6f983ddbc034ac946fd5775c22f694.gif"
              className=' w-6/12 rounded-md '
              />
              <h1 className='text-9xl hidden md:block xs:invisible'>START<br/> YOUR DAY</h1>
          </div>
          <div className='mt-40'>
            <h1 className='text-neutral-700 text-7xl text-center'>Categories</h1>
               <div className='flex scroll '>
                  <div className='h-auto m-auto flex overflow-x-auto'>
                   <MyCategories uid={uid} />
                   </div>
              </div>  
          </div>
      </div>
    ) 
  }

  export default Home