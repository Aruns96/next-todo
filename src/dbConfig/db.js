import mongoose  from "mongoose";

const connect = ()=>{
    try {
        
         mongoose.connect(process.env.MONGO_URL)
         mongoose.connection.on("connected",()=>{
            console.log('connected to mongo')
         })
    } catch (error) {
        console.log(error)
    }
}

export default connect;
