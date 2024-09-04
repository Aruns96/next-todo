import { NextResponse } from "next/server"
import connect from "../../../dbConfig/db"
import Todo from "../../../models/todo"

connect()

export async function GET (req){
     try{
       
            const todos = await Todo.find()
           return NextResponse.json({message:"success",data:todos},{status:200})
        

     }catch(error){
       console.log(error)
     }
}
export async function POST (req){
    try{
       
           const body = await req.json()
          
           const {task,completed} = body
           console.log("body",task)
           const newTodo = new Todo({
               task:task,
               completed:completed
           })
           const savedTodo = await newTodo.save()
           return NextResponse.json({message:"success",data:savedTodo},{status:201})
   
      

    }catch(error){
      console.log(error)
    }
}





