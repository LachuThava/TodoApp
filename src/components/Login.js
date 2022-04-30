import {React,useState} from 'react';
import {  signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import GoogleLogin from 'react-google-login';


function handleSignup  (e) {
    window.location.href= "/signUp";
    e.preventDefault();
}

const Login = () => {
    const [email,setEmail] = useState();
    const [password,setPassword]= useState();

    function handleSetEmail(event){
        setEmail(event.target.value);
      }
      function handleSetPassword(event){
        setPassword(event.target.value);
      }
      
      const handleSignIn = (e) => {
          e.preventDefault(); 
        signInWithEmailAndPassword(auth,email,password)
        .then((res)=>{
            console.log(res);
            window.location.href="/feed";
        }).catch((err)=>{
            console.log(err.message);
        })
    }

    const responseGoogle = (response) =>{
        console.log(response);
        window.location.href="/feed";
        response.preventDefault();
    }


    return (
      <div className='col content-center mt-20'>
          <div className= 'row text-purple-500 text-center font-bold '>
              <h1 className='text-7xl'>Todo App</h1>
          </div>
          <div className='row max-w-md bg-white-50 shadow-md m-auto mt-14 p-10'>
              <form onSubmit={handleSignIn} className='flex flex-col justify-center items-center'>
                  <label className='font-semibold text-lg font-sans'>Email</label>
                  <input className='p-2 w-60 rounded-sm h-8 border-2 shadow-md' type="email" value={email} onChange={handleSetEmail}></input>
                  <label className='font-semibold text-lg font-sans mt-3'>Password</label>
                  <input className='p-2 w-60 rounded-sm h-8 border-2 shadow-md  ' type="password" value={password} onChange={handleSetPassword}></input>
                  
                  <button  type="submit" className='mt-8  mb-4 mr-2 font-thin h-10 text-lg bg-indigo-200 w-48 rounded-sm shadow-lg '>Sign In</button>
                  
              </form>
              <div className="flex flex-col">
                  <GoogleLogin
                   className='m-auto mt-8 w-48 mb-4'
                    clientId='508724601905-25jgp5qpio276u2trn2l5gg2026rvpfg.apps.googleusercontent.com' 
                    onSuccess={responseGoogle}
                     onFailure={responseGoogle} />
                  {/* <button className='mt-8 m-auto font-thin h-10 bg-blue-500 text-lg w-40 rounded-md shadow-lg '>Signin with Google</button>     */}
                  <div className="mt-0  m-auto justify-between flex-row">
                      <span className=' text-xs'>you don't have account</span>
                    <button onClick={handleSignup}  className='ml-2 underline font-thin h-10 text-lg bg-none  '>Sign Up</button>
                  </div>

              </div>
          </div>

      </div>    
  );
}

export default Login;