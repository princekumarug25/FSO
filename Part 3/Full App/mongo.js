const mongoose = require('mongoose')
if(process.argv.length < 3){
  console.log('Give the input properly')
  process.exit(1)
}
const password = process.argv[2];
const url = `mongodb+srv://princekumarug25:${password}@cluster0.yggmjxf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
mongoose.connect(url).then(()=>{
  console.log('mongoose connected')
})
mongoose.set('strictQuery',false)
const contactSchema = mongoose.Schema({
  id:String,
  name:String,
  number:String,
})
module.exports  = mongoose.model('Contact',contactSchema);