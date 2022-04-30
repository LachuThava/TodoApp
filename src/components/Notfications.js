import { Button } from 'react-bootstrap';
// import 'bootstrap/css/bootstrap.min.css';
import { collection, doc, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { auth, db } from '../firebase';
import { async } from '@firebase/util';

const Notfications = () => {

    var [tasks,setTasks]=useState([]);
    var[temp1,setTemp1] =useState([]);
    var[temp2,setTemp2] =useState([]);
    var[temp3,setTemp3] =useState([]);

    const uid  = auth.currentUser?.uid;


    const RetrieveData=async()=>{
        
        // var myAssi = await doc(db,"Assignments",uid);
        // var myWork = await doc(db,"Workout",uid);
        // var myHome = await doc(db,"HomeWorks",uid);
        // onSnapshot(myHome,(doc)=>{
        //   // setTasks(doc.get("tasks"));
        //   setTemp1(doc.get("tasks"));
        // })
        // onSnapshot(myAssi,(doc)=>{
        //   // setTasks(doc.get("tasks"));
        //   setTemp2(doc.get("tasks"));
        // })
        // onSnapshot(myWork,(doc)=>{
        //   // setTasks(doc.get("tasks"));
        //   setTemp3(doc.get("tasks"));
        // })
        // tasks = temp;
        // console.log("tasksks",tasks);
        // console.log("temp",temp);
        // console.log("temp1",temp1);
        // console.log("temp2",temp2);
        // console.log("temp3",temp3);
      }

      const RetrieveData1=async()=>{
        var myAssi = await doc(db,"Assignments",uid);
       await  onSnapshot(myAssi,(doc)=>{
          // setTasks(doc.get("tasks"));
          setTemp1(doc.get("tasks"));
        })
        console.log("temp1",temp1);
      }

      const RetrieveData2=async()=>{
        var myWork = await doc(db,"Workout",uid);
        await onSnapshot(myWork,(doc)=>{
          // setTasks(doc.get("tasks"));
          setTemp2(doc.get("tasks"));
        })

        console.log("temp2",temp2);
      }

      const RetrieveData3=async()=>{
        var myHome = await doc(db,"HomeWorks",uid);
        await onSnapshot(myHome,(doc)=>{
          // setTasks(doc.get("tasks"));
          setTemp3(doc.get("tasks"));
        })
        console.log("temp3",temp3);
      }

      useEffect(()=>{
        RetrieveData1();
        // RetrieveData2();
        // RetrieveData3();
      },[])
      
      const ListData=()=>{
          // RetrieveData();
          
          if(temp1.length===0 && temp2.length===0 && temp3.length===0){
            return(
              <span>no data</span>
            );
          }
          else{
            return (
              temp1.map((task)=>{
              console.log("task",task);
              var temp = new Date(task.tasks_date * 1000).toDateString();
              return (
                <div key={task.id} className='flex border-b-2 bg-cyan-900 max-w-xs p-2 justify-between'>
                <div className='w-auto' >
                  <h5 className='text-blue-500'>{task.tasks_name}</h5>
                  <span className='text-slate-500'>{temp}</span>
                </div>
                <div className='mt-3 text-orange-400 -translate-x-3'>{task.task_time}</div>
              </div>
            )
          })
            );
          }
      }
      
      return(
        <div className='max-w-5xl m-auto scroll'>
            {/* <Button className="p-2 bg-blue-500">Click me </Button> */}
        <div className='flex-row overflow-y-auto h-64 w-80'>
        <ListData />
        </div>
        </div>
      );
}

export default Notfications