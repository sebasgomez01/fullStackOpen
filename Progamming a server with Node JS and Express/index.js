const express = require('express');
const app = express();

let notes = {

}

let persons = [
	{
		"id": 1,
		"name": "Arturo Hellas",
		"number": "040-123456"
	},
	{
		"id": 2,
		"name": "Ada Lovelace",
		"number": "39-44-5323523"
	},
	{
		"id": 3,
		"name": "Dan Abramov",
		"number": "12-43-234345"
	},
	{
		"id": 4,
		"name": "Mary Poppendieck",
		"number": "39-23-6423122"
	}

]





app.get('/', (request, response) => {
	response.send('<h1>Hello World</h1>')
})

app.get('/api/notes', (request, response) => {
	response.json(notes)
})

app.get('/api/persons', (request, response) => {
	response.json(persons)
})

app.get('/info', (request, response) => {
	let date = new Date();
	response.send(`<p>Phonebook has info for ${persons.length} people</p> <br/>
		<p>${date.toString()}</p>`)
})

app.get('/api/persons/:id', (request, response) => {
	const id = Number(request.params.id);
	const person = persons.find(person => person.id === id)
  	if(person) {
  		response.json(person);
  	} else {
  		response.status(404).end()
  	}
})

app.delete('/api/persons/:id', (request, response) => {
	const id = Number(request.params.id);
	console.log(persons)
	const person = persons.filter(person => person.id != id)
	console.log(persons)
	console.log(person)
  	response.status(204).end()
})

app.post('/api/persons', (request, response) => {

	const body = request.body
	const id = getRandomInt(1000);
	const personsWithSameName = persons.filter(person => person.name == body.name)

	if(!body.name || !body.number) {
		response.status(404).json({error: 'content missing'})
	} else if(person.length != 0) {
		response.status(404).json({error: 'name must be unique'})
	} 
	
	const personToAdd = { 
		"id": id,
		"name": body.name,
		"number": body.name
	}

	persons = persons.concat(personToAdd)
	response.json(persons)
})

const PORT = 3001
app.listen(PORT, () => {
	console.log(`Hola Sebastián, tu server está andando en el puerto ${PORT}`)
})