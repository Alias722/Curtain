const express = require('express')

const port = 21434
const app = express()

app.get('/',(req,res)=>{
	res.sendStatus(200);
})

app.listen(port,()=>{
	console.log("Server running on port "+port)
})
