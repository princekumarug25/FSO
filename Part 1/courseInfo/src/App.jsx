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
const Content = ({part1 ,part2 , part3 })=>{
  return(
    <>
    <Part part={part1.name} exercise={part1.exercises} />
    <Part part={part2.name} exercise={part2.exercises}/>
    <Part part={part3.name} exercise={part3.exercises}/>
    </>
  )
}
const Total = ({exercises1,exercises2,exercises3})=>{
return(
  <p>
    Number of exercises {exercises1 + exercises2 + exercises3}
  </p>
)
}
const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header heading = {course.name}/>
      <Content part1={course.parts[0]}  part2={course.parts[1]}  part3={course.parts[2]}  />
      <Total exercises1={course.parts[0].exercises} exercises2={course.parts[1].exercises} exercises3={course.parts[2].exercises}/>
    </div>
  )
}

export default App