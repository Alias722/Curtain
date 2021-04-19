const express = require('express')
const {
	dialogflow,
	actionssdk,
	Image,
	Table,
	Carousel
} = require('actions-on-google')
const bodyParser = require('body-parser')

express().use(bodyParser.json())

const port = 21434
const app = dialogflow({
	debug: true
})
//If recieved GET request to '/'
//return good
//Any request to /webhook
//will be retreived to dialog
express().get('/',(req,res)=>{
	res.sendStatus(200);
})
express().post('/webhook',app)
express().get('*',(req,res)=>{
	res.redirect(302,'/')
})
express().listen(port,()=>{
	console.log("Server running on port "+port)
})



app.intent('intent_name',(conv)=>{
	conv.ask('How are you?')
})
