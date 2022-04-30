  import { PlusCircleIcon } from '@heroicons/react/outline';
  import {React,useState} from 'react'
  import Popup from 'reactjs-popup';
  import { useParams } from 'react-router-dom';
  import Navbar from './Navbar';
  import { AddForm } from './popupAdd';
  import CompleteTask from './RenderTask';




  const Task = () => {
    const {name} = useParams();
    var [tasks,setTasks] = useState([]);
    var removeId = 0; 
    


        


      const CreateTask = () =>{
        return (
          <Popup
            position="bottom left"
            trigger={<PlusCircleIcon className='cursor-pointer w-7 h-7' />}
            >
            <AddForm name={name} tasks={tasks}/>
          </Popup>
        );
      }


      

      


    return (
      <div className='m-auto  max-w-5xl'>
        <Navbar/>
          <div className=' m-auto max-w-5xl '>
            <h3 className='text-center text-fuchsia-900 pt-4 underline'>{name}</h3>
          </div>
          <div className='max-w-5xl m-auto p-4'>
              <div  className='bg-slate-300 flex items-stretch mb-10 w-32 h-12 rounded-md justify-center align-items-center'>
                <span className='mr-4 cursor-pointer'>add Task</span>
                <CreateTask />
              </div>
              <h2 className='font-mono'>Complete Tasks</h2>
            <CompleteTask  name={name} />
          </div>
      </div>
    );
    
  }
  
  export default Task;
  