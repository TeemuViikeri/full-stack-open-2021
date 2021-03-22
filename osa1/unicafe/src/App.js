import React, { useState } from 'react'

const Header = ({ header }) => {
  return <h1>{header}</h1>
}

const Button = ({ btnText, handleClick }) => {
  return <button onClick={handleClick}>{btnText}</button>
}

const Statistic = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({ feedback }) => {
  const total = feedback.good + feedback.neutral + feedback.bad
  const value = feedback.good * 1 + feedback.neutral * 0 + feedback.bad * -1

  return (
    <>
      <Header header='statistics' />
      <table>
        <tbody>
          {total === 0 ? (
            <tr>
              <td>No feedback given</td>
            </tr>
          ) : (
            <>
              <Statistic text='good' value={feedback.good} />
              <Statistic text='neutral' value={feedback.neutral} />
              <Statistic text='bad' value={feedback.bad} />
              <Statistic text='all' value={total} />
              <Statistic text='average' value={value / total} />
              <Statistic
                text='positive'
                value={(feedback.good / total) * 100 + '%'}
              />
            </>
          )}
        </tbody>
      </table>
    </>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header header='give feedback' />
      <Button btnText='good' handleClick={() => setGood(good + 1)} />
      <Button btnText='neutral' handleClick={() => setNeutral(neutral + 1)} />
      <Button btnText='bad' handleClick={() => setBad(bad + 1)} />
      <Statistics feedback={{ good: good, neutral: neutral, bad: bad }} />
    </div>
  )
}

export default App
