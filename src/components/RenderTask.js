import React, { useEffect, useState } from "react";
import {getDoc,doc,setDoc, onSnapshot, collection} from 'firebase/firestore'
import { MinusCircleIcon } from "@heroicons/react/outline";
import { auth,db } from "../firebase";
import { StreamBuilder } from "react-stream-builder";




const CompleteTask=(props)=>{

    // var tasks = [];
    var name= props.name; 
    var [tasks,setTasks]=useState([]);  
    const uid =  auth.currentUser?.uid; 


    const RetrieveData=async()=>{
      const myDocRef = await doc(db,name,uid);

      var temp ={};
     onSnapshot(myDocRef,(doc)=>{
        setTasks(doc.get("tasks"));
      });
      
  }


  
       RetrieveData();
  


     


    async function HandleRemove(props){
        const uid = auth.currentUser?.uid;
        const docRef = await doc(db,name,uid);
        const myDoc =  getDoc(docRef);
        var temp =[];
        temp =  await (await myDoc).get("tasks");
        var tempId={};
        // console.log("props.id",props.id);
        temp.map((m)=>{
          if(m.id===props.id){
            tempId=m;
          }  
        });
        tasks.pop(tempId);

        await setDoc(docRef,{tasks});
      }
    



    // console.log("main tasks",tasks);

      if(tasks.length===0){
      return(<div>no data</div>);
    }else{
      return(
        tasks.map((m)=>{
          var date = new Date(m.tasks_date * 1000);
          var temp = date.toString();      
                    
          
          return(
          <div key={m.id} className='p-1 m-auto shadow-lg mb-2 rounded-lg bg-orange-100'>
            <div  className='ml-5 flex justify-between'>
              <section>
              <h1 className='text-2xl text-blue-400'>{m.tasks_name}</h1>
              <h6>{m.task_time}</h6>
              <span>{temp}</span>
              
              {/* <h6>{m.id}</h6> */}
              </section>
              <MinusCircleIcon  onClick={()=>{setTimeout(HandleRemove(m.id),300);}} className='cursor-pointer w-7 h-7 translate-y-full -translate-x-5'/>
            </div>
            
            
          </div>);
        })
      );
    }
  }

  export default CompleteTask;