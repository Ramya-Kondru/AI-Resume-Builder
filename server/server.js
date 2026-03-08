import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './configs/db.js';
import userRouter from './routes/userRoutes.js';
import resumeRouter from './routes/resumeRoutes.js';
import aiRouter from './routes/aiRoutes.js';

const app=express();

// a port number to run the application locally
// if the port is available in environment variable we will use it else 3000
const PORT=process.env.PORT||3000;

// database connection
await connectDB()


// All the requests will be passed using json method for this express app
app.use(express.json())
app.use(cors())

app.get('/',(req,res)=>res.send("Server is live...."))
app.use('/api/users',userRouter)
app.use('/api/resumes',resumeRouter)
app.use('/api/ai',aiRouter)



app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})



// n210627_db_user
// n210627123

// userRouter-created API using that we can authenticate the user , user can login ,register and  display the user data using this API

