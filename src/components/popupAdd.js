
  import { auth, db } from "../firebase";
  import { useState } from "react";
  import { doc ,getDoc ,setDoc  } from "firebase/firestore";
  import { Form,Button } from "react-bootstrap";
  import Calendar from 'react-calendar';
  import 'react-calendar/dist/Calendar.css';
import CompleteTask from "./RenderTask";

    
  export const AddForm=(props)=>{
    const [task,setTask] = useState();
    const [date,setDate] = useState();
    const[time,setTime] = useState(); 
    const name = props.name;



    function handleSetTask(event){
        setTask(event.target.value);
      }
      function handleSetTime(event){
        setTime(event.target.value);
      }



      const handleSubmit1 = async (event)=>{
        // await setTimeout(()=>{},2000);
        event.preventDefault();   
        const uid = await auth.currentUser?.uid;
        var tasks = [];
        console.log("name",name);
        console.log("uid",uid);

        const myDocRef = await doc(db, name, uid);
        const myDoc = await getDoc(myDocRef);  
        tasks = await myDoc.get("tasks");
        
        console.log(myDoc.get("tasks"));
        var len = tasks.length;
        console.log("len",len);
          len = len +1;
        var m = {
          "tasks_name":task,
          "tasks_date":date,
          "task_time":time,
          "id":len
        }
        console.log("tasks type",typeof(tasks));
        console.log("m",m);
        tasks.push(m);

        console.log("tasks",tasks);
        console.log("x",tasks);
        await setDoc(myDocRef,{tasks});
      }








    return(
       <Form className='bg-slate-100 p-5 flex flex-col' onSubmit={handleSubmit1}>
          <Form.Label>Task Name</Form.Label>
          <Form.Control className='h-8 mb-4' type="text" onChange={handleSetTask} value={task} ></Form.Control>
          <Calendar
          className="mb-4"
          onChange={setDate}
          value={date}
          />
          {/* <label>{date}</label> */}
          <Form.Label>select Time</Form.Label>
          <Form.Control placeholder='Time' type="time" value={time} onChange={handleSetTime}></Form.Control>
          <Button className="mt-3" type='submit'>submit</Button>
        </Form>);
  }

  