"use client";
import { useState, useEffect } from "react";
import axios from "axios";

const Todos = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    getTodos();
  }, []);

  const getTodos = async () => {
    const response = await axios.get("/api/todos");
    console.log(response);
    setTodos(response.data.data);
  };
  const completedTodos = todos.filter(todo=>todo.completed===true)
  return (
    <div className="flex flex-col items-center gap-8 pt-8 ">
      <div className="text-4xl">completed Todos List</div>

    
        <ul>
        {todos.length > 0 ? (
          completedTodos.map((todo, index) => (
            
              <li key={index} className="font-bold text-xl">{todo.task}</li>
           
          ))
        ) : (
          <p>no todos ...</p>
        )}
        </ul>
     
    </div>
  );
};

export default Todos;
