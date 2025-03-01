import mongoose from"mongoose";

export const connection =()=>{
    mongoose.connect(process.env.MONGO_URI,{
        dbName:"JOB_PORTAL_FULL_STACK"
 }).then(()=>{
    console.log("connected to database.")
 }).catch(err=>{
    console.log(`Error occured..!!! Cannot connect to the database :${err}`)
 })
}
