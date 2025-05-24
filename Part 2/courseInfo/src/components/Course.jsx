const Course = ({course})=>{
  const total = course.parts.reduce((prev,curr)=>{
    return prev + curr.exercises
  },0)
  return(
  <>
  <Header heading={course.name}/>
  <Content parts={course.parts}/>
  <strong>Total exercises {total}</strong>
  </>
  )
  
}
const Header = ({heading}) =>{
  return(
    <h1>{heading}</h1>
  )
}
const Part = ({part,exercise})=>{
  return(
    <p>
      {part} {exercise}
    </p>
  )
}
const Content = ({parts})=>{
  return(
    <>
    {parts.map(part =>(
      <Part part={part.name} exercise={part.exercises} key={part.id}/>
    ))}
    </>
  )
}
export default Course 