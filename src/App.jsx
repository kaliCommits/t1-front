import { useState,useEffect } from 'react'
import axios from "axios";




function App() {
  const [users, setUsers] = useState([]);
  const [errors,setErrors] = useState(null);
  let url =
    import.meta.env.PROD
      ? import.meta.env.VITE_PRODUCTION_BACK_URL
      : import.meta.env.VITE_DEV_BACK_URL;
    console.log(url);
    const apiReq = axios.create({
        baseURL:url,
        withCredentials:true
    });
  useEffect(()=>{
    const ap = async()=>{
      try{
        const {data} = await apiReq.get(`/users`);
        setUsers(data.data);
      }catch(e){
        setErrors("something went wrong");
        console.log(e);
      }
    };
    ap();
  },[]);
  
  if(errors){
    return (
      <div>
        <h1>errors occures</h1>
      </div>
    )
  }

  return (
    <>
      <h1>hello</h1>
      {
        users.map(user=>{
          return(
            <div key={user.id}>
              <h1>{user.name}</h1>
            </div>
          )})
      }
    </>
  )
}

export default App
