"use client"
import { useState ,useEffect} from "react";
import axios from "axios"

const Todos = () => {
  const [input, setInput] = useState("");
  const [todos,setTodos] = useState([])
  useEffect(() => {
    getTodos()
  
   
  }, [])
  
   const getTodos = async()=>{
           const response = await axios.get("/api/todos")
           console.log(response)
           setTodos(response.data.data)
   }
   const addHandler =  async()=>{
       console.log(input)
       const response = await axios.post("/api/todos",{task:input})
       if(response.status){
        setInput("")
        location.reload()
       }
       console.log(response)
   }
  return (
    <div className="flex flex-col items-center gap-8 pt-8 ">
      <div className="text-4xl">Todo List</div>
      <div className="flex gap-2">
        <input
         className="text-xl rounded-md shadow-md "
          type="text"
          placeholder="Enter todo"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={addHandler} className="text-xl shadow-md rounded-md bg-blue-500 text-white p-3 ">Add</button>
      </div>
      <div className="flex flex-col gap-2">
          {todos.map((todo,index)=>(
              <div key={index} className="flex gap-2 items-center">
                  
                    <input type="checkbox" />

                    <div className="font-bold text-xl">{todo.task}</div>
                    <button className="text-sm shadow-sm rounded-md bg-green-500 text-white p-1">Edit</button>
                    <button className="text-sm shadow-sm rounded-md bg-red-500 text-white p-1">Delete</button>
                    
              </div>
          ))}
      </div>
    </div>
  );
};

export default Todos;
