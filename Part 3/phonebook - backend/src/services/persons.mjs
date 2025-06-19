import axios from "axios";
const baseUrl ="http://localhost:3001/persons" 
const getAll = () => {
    const data = axios
    .get(baseUrl)
    return data.then(response => response.data)
}
const create = (data)=>{
    const response = axios
    .post(baseUrl,data)
    return response.then(response => response.data)
}
const remove = (id)=>{
    axios.delete(`${baseUrl}/${id}`)
}
const update = (id,data) =>{
    const response = axios
    .put(`${baseUrl}/${id}`,data)
    return response.then(response => response.data)
}
export default {getAll,create,remove,update}