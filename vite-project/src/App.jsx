import React from "react"
import Intro from "./Components/Intro"
import Questions from "./Components/Questions"

export default function App() {
    const [start, setStart] = React.useState(false)
    const [questions, setQuestions] = React.useState()
    function startGame() {
        setStart()
    }
    // console.log("component rendered")
    
    React.useEffect(() => {
        console.log("effect used")
        fetch('https://opentdb.com/api.php?amount=5&type=multiple')
            .then(res => res.json())
            .then(data => setQuestions(data))
    }, [])



    if (questions){
        var fuckingQuestions = (questions.results).map(item => {
            return (
                <Questions 
                q = {item.question} 
                correctAns = {item.correct_answer}
                incorrectAns = {item.incorrect_answers}/>
            )
        })
    }
        

    return (
        <main>
            {fuckingQuestions}
           
          
        </main>
    )
}
    //  {questionElements}
//        <pre>{JSON.stringify(questions.results, null, 2)}</pre>



//  {start && <Intro onClick={startGame} />}
//  <Questions />
            // {fuckingQuestions}