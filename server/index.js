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

app.intent('Default Welcome Intent',(conv)=>{
	conv.ask("Is it good to it?")
})

app.intent('bye',(conv)=>{
	conv.close('See you later!')
})

app.catch((conv,error)=>{
	console.log(error)
	conv.ask('Wow a big glitch. Maybe I will check it later')
})

app.fallback((conv)=>{
	conv.ask('I don\'t really get what you said.')
})

//expressapp('*',(req,res)=>{
//	res.redirect(302,'/')
//})



expressapp.listen(port,()=>{
	console.log("Server running on port "+port)
})
