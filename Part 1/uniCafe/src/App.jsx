import { useState } from 'react'
const Header = ({text}) => {
  return (
    <h1>{text}</h1>
  )
}
const Button = ({onClick,text})=>{
  return(
    <button onClick={onClick}>{text}</button>
  )
}
const StatisticLine = ({text,value})=>{
  return(
  <tr>
  <td>{text}</td>
  <td>{value}</td>
  </tr>
  )
}
const Statistics = ({text,good,neutral,bad,all,average,positive})=>{
  return(
    <div>
      <h1>{text}</h1>
      <table>
      <tbody>
      <StatisticLine text="good" value={good}/>
      <StatisticLine text="neutral" value={neutral}/>
      <StatisticLine text="bad" value={bad}/>
      <StatisticLine text="all" value={all}/>
      <StatisticLine text="average" value={average}/>
      <StatisticLine text="positive" value={positive}/>
      </tbody>
      </table>
    </div>
  )

}
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all,setAll] = useState(0)
  const [average,setAverage] = useState(0)
  const [positive,setPositive] = useState(0)
  const handleGood = ()=>{
    setGood(good => good+1)
    setAll(all => all+1)
    handleAverage(good+1,neutral,bad)
  }
  const handleNeutral = ()=>{
    setNeutral(neutral => neutral+1)
    setAll(all => all+1)
    handleAverage(good,neutral+1,bad)
  }
  const handleBad = ()=>{
    setBad(bad => bad+1)
    setAll(all => all+1)
    handleAverage(good,neutral,bad+1)
  }
  const handleAverage = (good,neutral,bad)=>{
    const total = good + neutral + bad;
    const average = (good - bad)/total;
    const positive = (good/total)*100;
    setAverage(average);
    setPositive(positive);
  }
  return (
    <div>
      <Header text="give feedback" />
      <Button onClick={handleGood} text="Good"/>
      <Button onClick={handleNeutral} text="Neutral"/>
      <Button onClick={handleBad} text="Bad"/>
      <div>
      {all?<Statistics text="Statistics"
      good={good}
      neutral={neutral}
      bad={bad}
      all={all}
      average={average}
      positive={positive}  
      />:<h1>No Feed Back Given</h1>}
      </div>
    </div>
  )
}

export default App