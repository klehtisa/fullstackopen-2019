import React, { useState } from 'react'
import ReactDOM from 'react-dom'

// Button
const Button = ({ handleClick, text }) => (
  <>
  <button onClick={handleClick}>
  {text}
  </button>
  </>
)

// Statistic
const Statistic = ({ text, value, tailTxt }) => (
  <>
  <tr>
  <td>{text}</td><td>{value} {tailTxt}</td>
  </tr>
  </>
)

// Statistics
const Statistics = ({ good, neutral, bad }) => {
  if (good === 0 && neutral === 0 && bad === 0) {
    // yhtään palautetta ei ole annettu
    return (
      <div>
        <p>
        Ei yhtään palautetta annettu
        </p>
      </div>
    )
  }  
  
  // Statistiikka
  return (
    <div>      
      <table cellPadding="2">
        <tbody>
        <Statistic text="hyvä" value={good}/>
        <Statistic text="neutraali" value={neutral}/>
        <Statistic text="huono" value={bad}/>
        <Statistic text="yhteensä" value={good + neutral + bad}/>
        <Statistic text="keskiarvo" value={(good - bad) / (good + neutral + bad)}/>
        <Statistic text="positiivisia" 
          value={good * 100 / (good + neutral + bad)} tailTxt="%"/>
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  // nappien tapahtumat
  const goodClick = () => setGood(good + 1)
  const neutralClick = () => setNeutral(neutral + 1)
  const badClick = () => setBad(bad + 1)

  return (
    <div>
      <h1>Anna palautetta</h1>
      <Button handleClick={goodClick} text='hyvä'/>
      <Button handleClick={neutralClick} text='neutraali'/>
      <Button handleClick={badClick} text='huono'/>
      <h1>statistiikka</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
