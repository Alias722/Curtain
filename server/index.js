const express = require('express')
const {
	dialogflow,
	actionssdk,
	Image,
	Table,
	Carousel
} = require('actions-on-google')
const bodyParser = require('body-parser')
const port = 21434
const expressapp = express()
const app = dialogflow({
	debug: true
})

//If recieved GET request to '/'
//return good
//Any request to /webhook
//will be retreived to dialog
expressapp.get('/',(req,res)=>{
	res.sendStatus(200);
})

//express().use(bodyParser.json())
expressapp.post('/webhook',app)

app.intent('intent_name',(conv)=>{
	conv.ask('How are you?')
})

//expressapp('*',(req,res)=>{
//	res.redirect(302,'/')
//})



expressapp.listen(port,()=>{
	console.log("Server running on port "+port)
})
