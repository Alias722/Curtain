const express = require('express')
const {
	dialogflow,
	actionssdk,
	Image,
	Table,
	Carousel
} = require('actions-on-google')
const bodyParser = require('body-parser')
const crypto = require('crypto')
const shell = require('shelljs')

const config = require('./config.json')
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

//if route == //webhook
//throw file to dialogflow(app)
expressapp.post('/webhook',bodyParser.json(),app)

app.intent('Default Welcome Intent',(conv)=>{
	conv.ask("Is it good to it?")
})

app.intent('open the curtain',(conv)=>{
	if(conv['user']['raw']['userVerificationStatus'] == "VERIFIED"){
		let hashsum = crypto.createHash('sha256').update(conv.user['storage']).digest('base64')
		if(hashsum == config['hashsum']){
			shell.exec('./script/open.sh')
			conv.ask('opening the curtain')
		}else{
			conv.ask("permission deny")
		}
	}
})

app.intent('close the curtain',(conv)=>{
	if(conv['user']['raw']['userVerificationStatus'] == "VERIFIED"){
		let hashsum = crypto.createHash('sha256').update(conv.user['storage']).digest('base64')
		if(hashsum == config['hashsum']){
			shell.exec('./script/close.sh')
			conv.ask('closing the curtain')
		}else{
			conv.ask("permission deny")
		}
	}
})

app.catch((conv,error)=>{
	console.log(error)
	conv.ask('Wow a big glitch. Maybe I will check it later')
})

app.fallback((conv)=>{
	if(conv.query == "GOOGLE_ASSISTANT_WELCOME"){
		conv.ask("Hello there")
	}else{
		conv.ask("I don't really get what you said")
	}
})

expressapp.listen(port,()=>{
	console.log("Server running on port "+port)
})
