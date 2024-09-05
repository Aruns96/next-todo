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
        setTodos(prevState=>[...prevState,{task:input,completed:false}])
        location.reload()
       }
       console.log(response)
   }
   const notCompletedTodos = todos.filter(todo=>todo.completed===false) || []
  // console.log(notCompletedTodos)
   const handleChange = async(id) =>{
  
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo._id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );

    const checkedItem = todos.find(todo => todo._id === id);
    //console.log(checkedItem)
    
    if (!checkedItem.completed) {
     
      const res = await axios.put(`/api/todos/${id}`)
      console.log("edit",res)
      if(res.status){
        location.reload()
      }
    }
      
    
   }
   const handleDelete = async(id) =>{
    const res = await axios.delete(`/api/todos/${id}`)
    // console.log(res.data)
    if(res.status){
      location.reload()
    }
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
          required
        />
        <button onClick={addHandler} className="text-xl shadow-md rounded-md bg-blue-500 text-white p-3 ">Add</button>
      </div>
      <div className="flex flex-col gap-2">
          {notCompletedTodos.length>0 ? notCompletedTodos.map((todo,index)=>(
              <div key={index} className="flex gap-2 items-center">
                  
                    <input type="checkbox" id={`todo-${todo._id}`} checked={todo.completed}  onChange={()=>handleChange(todo._id)}/>

                    <div className="font-bold text-xl">{todo.task}</div>
                   
                    <button onClick={()=>handleDelete(todo._id)} className="text-sm shadow-sm rounded-md bg-red-500 text-white p-1">Delete</button>
                    
              </div>
          )) : ( <p>no todos ...</p>)}
      </div>
    </div>
  );
};

export default Todos;
