const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 5000;
const cors = require("cors")

app.use(cors());
app.use(express.json()); //to stringify our data in json format

//connect to mongo
mongoose.connect('mongodb://127.0.0.1:27017/crud', {
    // useNewUrlParser: true,
    // useUnifiedTopology: true
})
.then(()=>{
    console.log("db connected");
})
.catch((e)=>{
    console.log(e);
});

//create user schema
const userSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        require:true
    }
},
{timestamps: true}
);

//create collection model 
const User = mongoose.model("User", userSchema);

//create the user
app.post("/createuser",async (req, res) =>{ //req-get the value which be send in the form
    try{
        const bodyData = req.body; //get the user data
        const user = new User(bodyData); // corrected from `new user()`
        const userData = await user.save();
        res.send(userData);   //send the user data
    } catch(e){
        res.send(e);
    }
}); 

//read all users
app.get("/readalluser",async(req,res)=>{
    try{
         const userData = await User.find({});
         res.send(userData);
        }
    catch(e){
         res.send(e);
    }
})

// read single  user by id
app.get("/readuser/:id", async(req, res)=>{
    try{
         const id = req.params.id;
         const user = await User.findById({_id:id})
         res.send(user);
    }catch(e){
        res.send(e);
    }
});

//update a user
app.put('/updateuser/:id', async (req, res) => {
    try{
        const id = req.params.id;
        const user = await User.findByIdAndUpdate({_id:id},req.body , {new:true} );
        res.send(user);
    }catch(e){
        res.send(e);
    }   
});

// delete user
app.delete("/delete/:id", async(req,res)=>{
    try{
       const id = req.params.id;
       const user = await User.findByIdAndDelete({_id:id});
       res.send(user);
    }catch(e){
        res.send(e);
    }
})


//get connection 
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
});
