import { useState } from "react";
const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [votes,setVotes] = useState(new Array(anecdotes.length).fill(0));
  const [maxVotes,setMaxVotes] = useState(0)
  const handleClick = () => {
    const randomNumber = Math.floor(Math.random() * 8);
    setSelected(randomNumber);
  };
  
  const handleVotes = (selected) =>{
    let copy = []
    setVotes(prevState=>{
      copy = [...prevState]
      copy[selected]+=1
      console.log(copy,"copy inside")
      handleMaxVotes(copy)
      return copy
    })
    console.log(copy, "copy outside")
    console.log(votes,"votes")
  }
  const handleMaxVotes = (votes)=>{  
  let currmax = 0;
  let idx = 0;
  console.log(votes,"from the handler")
  for(let i = 0;i<8;i++){
    if(votes[i]>currmax){
      currmax = votes[i]
      idx = i;
    }
  }
  setMaxVotes(idx)
}

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Button onClick={handleClick} text="next anecdote" />
      <div>{anecdotes[selected]}</div>
      <Button onClick={()=>handleVotes(selected)} text="vote" /> 
      <div>This has {votes[selected]} votes</div> 
      <h1>Anecdote with most votes</h1>
      {console.log(maxVotes)}
      <div>{anecdotes[maxVotes]} this has {votes[maxVotes]}</div>
      
    </div>
  );
};

export default App;
