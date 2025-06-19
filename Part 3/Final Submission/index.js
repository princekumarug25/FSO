const express = require('express')
require('dotenv').config()
const morgan = require('morgan')
const cors = require('cors')
const app = express()
app.use(express.static('dist'))
app.use(express.json())
// const contentLogger = morgan('tiny')
app.use(cors())
const Contact = require('./models/contacts')
morgan.token('body',(request) => {
  console.log(request.body)
  return JSON.stringify(request.body)
})
const contentLogger = morgan(':body :method :url :status :res[content-length] - :response-time ms')
let contacts = [
  {
    id: '1',
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: '2',
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: '3',
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: '4',
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
]

app.get('/api/persons', (request, response,next) => {
  Contact.find({})
    .then(result => {
      response.json(result)
    })
    .catch((error) => {
      next(error)
    })
})
app.get('/info', (request, response) => {
  const total = contacts.length
  const date = new Date()
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ]
  response.send(`
        <p>Phonebook has info for ${total} people</p>
        <p> ${days[date.getDay()]} ${
          months[date.getMonth()]
        } ${date.getDate()} ${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} IST</p>
    `)
})
app.delete('/api/persons/:id', (request, response,next) => {
  const id = request.params.id
  // if (id) {
  //   contacts = contacts.filter((contact) => contact.id !== id);
  //   response.status(204).end()
  // } else {
  //   response.status(404).end()
  // }
  Contact.findByIdAndDelete(id)
    .then(() => {
      console.log('note deleted')
    })
    .catch((error) => {
      next(error)
    })
})
app.get('/api/persons/:id',(request,response,next) => {
  Contact.findById(request.params.id).then(note => {
    response.json(note)
  })
    .catch((error) => {
      next(error)
    })
})
app.post('/api/persons', contentLogger ,(request,response,next) => {
  const body = request.body
  // if(!body){
  //     return response.status(404).json({
  //         error:'content missing'
  //     })
  // }
  // if(!body.name){
  //     return response.status(400).json({error:'name is missing'})
  // }
  // if(!body.number){
  //     return response.status(400).json({error:'number is missing'})
  // }
  // const user = contacts.find(contact => contact.name === body.name)
  // if(user){
  //     return response.status(400).json({error:'user is already present'})
  // }
  const contact = new Contact({
    name:body.name,
    number:body.number
  })
  contact.save().then(() => {
    console.log('contact saved!')
    response.status(201).json('request sent')
  })
    .catch((error) => {
      next(error)
    })
    // const contact = {id:id,name:body.name,number:body.number}
    // contacts = contacts.concat(contact);
    // response.json(contact)

})
app.put('/api/persons/:id',async (request,response) => {
  const id = request.params.id
  const update = request.body
  try{
    const updatedUser = await Contact.findByIdAndUpdate(id,update,{
      new:true,
      runValidators:true,
    })
    if(!updatedUser){
      return response.status(404).json({ message:'User not found' })
    }
    response.json(updatedUser)
  }
  catch (err){
    response.status(500).send({ error: err.message })
  }
})
const errorHandler = (error, request, response, next) => {
  if (error.name === 'CastError') {
    return response.status(400).json({ error: 'malformed id' })
  }

  next(error) // pass unhandled errors to the default handler
}

app.use(errorHandler)
const PORT = 3001
app.listen(PORT)
