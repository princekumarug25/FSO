const mongoose = require('mongoose')

// if(process.argv.length < 3){
//     console.log('please enter password in the argument')
//     process.exit(1)
// }
const url = process.env.MONGODB_URI
mongoose.connect(url).then(() => {
  console.log('connected to mongoose')
})

const contactSchema = mongoose.Schema({
  name:{
    type:String,
    minLength:5,
    required:true,
  },
  number:{
    type:String,
    minLength:9,
    validate:{
      validator:function(item){
        return /^\d{2,3}-\d+$/.test(item)
      }
    },
    message:props => `${props.value} is not in the required Format!`
  }
})

module.exports = mongoose.model('Contact',contactSchema)