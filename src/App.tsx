import React,{useState} from 'react';
import { Difficulty, fetchQuizQuestions,QuestionsState } from './API';
//styles
import { GlobalStyle,Wrapper } from './App.styles';
//components
import QuestionCard from './components/QuestionCard';


const TOTAL_QUESTION=10;

export type AnswerObject={
  question:string;
  answer:string;
  isCorrect:boolean;
  correctAnswer:string;
}

const App=()=> {
   const [loading,setLoading]=useState(false);
   const[questions,setQuestions]=useState<QuestionsState[]>([]);
   const[questionNo,setQuestionNo]=useState(0);
   const[userAnswers,setUserAnswrs]=useState<AnswerObject[]>([]);
   const[score,setScore]=useState(0);
   const[gameOver,setGameOver]=useState(true);

   console.log(questions);
  
    const startQuiz=async ()=>{
      setLoading(true);
      setGameOver(false);

      const newQuestions=await fetchQuizQuestions(
        TOTAL_QUESTION,
        Difficulty.EASY
      );

      setQuestions(newQuestions);
      setScore(0);
      setUserAnswrs([]);
      setQuestionNo(0);
      setLoading(false);


    };
    const checkAnswer=(e:React.MouseEvent<HTMLButtonElement>)=>{
      if(!gameOver){
        //get user answer
        const answer=e.currentTarget.value;
        //check answer against correct answer
        const isCorrect=questions[questionNo].correct_answer===answer;
        //add score if answer is correct
        if(isCorrect){
          setScore(prev=>prev+1);

        }
        //save user answers in arrray
        const answerObject={
          question:questions[questionNo].question,
          answer,
          isCorrect,
          correctAnswer:questions[questionNo].correct_answer
        };
        setUserAnswrs(prev=>[...prev,answerObject]);

      }
    }
    const nextQuestion=()=>{
      const nextQuestion=questionNo+1;
      if(nextQuestion===TOTAL_QUESTION){
        setGameOver(true);

      }else{
        setQuestionNo(nextQuestion);
      }

    }
  return (
    <>
    <GlobalStyle/>
    <Wrapper>
    <h1>Quiz</h1>
    {gameOver||userAnswers.length===TOTAL_QUESTION ? (
      <button className='start' onClick={startQuiz}>Start</button>
    ):null}
    
    {!gameOver?<p className='score'>Score:{score}</p>:null}
    {loading && <p>Loading Questions.....</p>}
    {!loading && !gameOver &&(
    <QuestionCard
      questionNumber={questionNo+1}
      totalQuestions={TOTAL_QUESTION}
      question={questions[questionNo].question}
      answers={questions[questionNo].answers}
      userAnswer={userAnswers?userAnswers[questionNo]:undefined}
      callback={checkAnswer}
    /> 
    )}
    {!loading && !gameOver && userAnswers.length === questionNo+1 && questionNo !== TOTAL_QUESTION-1 ? (
    <button className='next' onClick={nextQuestion}>Next Question</button>
    ):null}
  </Wrapper>
  </>
  );
}

export default App;
