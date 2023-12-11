const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 8080

const schemaData = mongoose.Schema({
    marca : String,
    modelo : String,
    memoria : String,
    lancamento : String
},{
    timestamps : true
})

const celularModel = mongoose.model("celular", schemaData)

//​http://localhost:8080/
app.get("/", async (req,res) => {
    const data = await celularModel.find({})
    res.json({success : true, data : data})
}) 

//​http://localhost:8080/create
/*

*/
app.post("/create", async(req,res) =>{
    console.log(req.body)
    const data = new celularModel(req.body)
    await data.save()
    res.send({succes : true, message : "data save successfully", data : data})
})

//​http://localhost:8080/update
app.put("/update", async(req,res) =>{
    console.log(req.body)
    const { id,...rest} = req.body

    console.log(rest)
    const data = await celularModel.updateOne({_id : req.body.id}, rest)
  
    res.send({succes : true, message : "data update successfully", data : data})
})

//​http://localhost:8080/delete/id
app.delete("/delete/:id", async(req,res) =>{
    const id = req.params.id
    console.log(id)
    const data = await celularModel.deleteOne({_id : id})
    res.send({succes : true, message : "data delete successfully", data : data})
    
})




mongoose.connect("mongodb://localhost:27017/projetocelular")
.then(() => { 
    console.log("connect do db")
    app.listen(PORT,() => console.log("Server is running"))
})
.catch((err) => console.log(err))
