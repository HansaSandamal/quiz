import React,{useState} from 'react';
import { Difficulty, fetchQuizQuestions } from './API';
//components
import QuestionCard from './components/QuestionCard';


const TOTAL_QUESTION=10;

const App=()=> {
   const [loading,setLoading]=useState(false);
   const[questions,setQuestions]=useState([]);
   const[questionNo,setQuestionNo]=useState(0);
   const[userAnswers,setUserAnswrs]=useState([]);
   const[score,setScore]=useState(0);
   const[gameOver,setGameOver]=useState(true);

   console.log(fetchQuizQuestions(TOTAL_QUESTION,Difficulty.EASY));
  
    const startQuiz=async ()=>{

    }
    const checkAnswer=(e:React.MouseEvent<HTMLButtonElement>)=>{

    }
    const nextQuestion=()=>{

    }
  return (
  <div className="App">
    <h1>Quiz</h1>
    <button className='start' onClick={startQuiz}>Start</button>
    <p className='score'>Score:</p>
    <p>Loading Questions.....</p>
    {/* <QuestionCard
      questionNumber={questionNo+1}
      totalQuestions={TOTAL_QUESTION}
      question={questions[questionNo].question}
      answers={questions[questionNo].answers}
      userAnswer={userAnswers?userAnswers[questionNo]:undefined}
      callback={checkAnswer}
    /> */}
    <button className='nextQuestion' onClick={nextQuestion}>Next Question</button>

  </div>
  );
}

export default App;
