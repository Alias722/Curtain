const express = require('express')
const {
	dialogflow,
	actionssdk,
	Image,
	Table,
	Carousel
} = require('actions-on-google')

const port = 21434

const app = dialogflow({
	debug: true
})

express().get('/',(req,res)=>{
	res.sendStatus(200);
})

express().app.listen(port,()=>{
	console.log("Server running on port "+port)
})
