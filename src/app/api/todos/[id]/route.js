import { NextResponse } from "next/server"
import connect from "../../../../dbConfig/db"
import Todo from "../../../../models/todo"

connect()

function getIdFromPathname(s){
    let parts = s.split("/")
    return parts[parts.length-1]
}

export async function DELETE (req){
    try{
            const path = (req.nextUrl.pathname)
            const  id = getIdFromPathname(path)
            console.log(id)
           const todos = await Todo.findByIdAndDelete(id)
          return NextResponse.json({message:"todo deleted"},{status:200})
       

    }catch(error){
      console.log(error)
    }
}

export async function PUT (req){
    try{
            const path = (req.nextUrl.pathname)
            const  id = getIdFromPathname(path)
            console.log("put id",id)
           const todos = await Todo.findByIdAndUpdate({_id:id},{
            completed:true
           })
           console.log("put",todos)
          return NextResponse.json({message:"todo updated"},{status:200})
       

    }catch(error){
      console.log(error)
    }
}