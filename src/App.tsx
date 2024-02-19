import { useState } from "react"
import "./App.css"
import constants_untyped from "./constants.json"

interface Constant {
  expression: string
  value: number
}

interface Answer {
  expression: string
  value: number
  correct: boolean
}

const constants = constants_untyped as Constant[]

function generateAnswers(num: number): [Answer[], Answer] {
  const options = sample(constants, num)
  let answers = options.map((val) => {
    return { ...val, correct: false }
  })
  answers[0].correct = true
  const correctAnswer = answers[0]
  answers = sample(answers, num)
  return [answers, correctAnswer]
}

function App() {
  return (
    <>
      <h1>Constants Quiz</h1>
      <Quiz />
    </>
  )
}

function Quiz() {
  const [[answers, correctAnswer], setAnswerTuple] = useState(
    generateAnswers(6),
  )
  const decimal_places = 3 + Math.floor(3 * Math.random())
  const approximation = correctAnswer.value.toFixed(decimal_places)
  function handler(correct: boolean): undefined {
    if (correct) {
      alert("Yes")
    } else {
      alert(`No. The answer was ${correctAnswer.expression}`)
    }
    setAnswerTuple(generateAnswers(6))
  }
  return (
    <div className="quiz-base">
      <p>{approximation}</p>
      <div className="answers">
        {answers.map(({ expression, correct }) => (
          <Button
            key={expression}
            text={expression}
            correct={correct}
            handler={handler}
          />
        ))}
      </div>
    </div>
  )
}

function Button({
  text,
  correct,
  handler,
}: {
  text: string
  correct: boolean
  handler: (correct: boolean) => undefined
}) {
  return <button onClick={() => handler(correct)}>{text}</button>
}

function sample<T>(arr: T[], size: number): T[] {
  const shuffled = arr.slice(0)
  let i = arr.length
  let temp, index
  while (i--) {
    index = Math.floor((i + 1) * Math.random())
    temp = shuffled[index]
    shuffled[index] = shuffled[i]
    shuffled[i] = temp
  }
  return shuffled.slice(0, size)
}

export default App
