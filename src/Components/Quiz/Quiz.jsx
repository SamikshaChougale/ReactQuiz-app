import React, { useRef, useState } from 'react'
import './Quiz.css'
import { data } from '../Assets/data';

const Quiz = () => {

let[index,setIndex] = useState(0);
let [Question, setQuestion] = useState(data[index]);
let [lock, setLock] = useState(false);
let [score,setScore] = useState(0);
let [result,setResult] = useState(false);

let Opton1 = useRef(null);
let Opton2 = useRef(null);
let Opton3 = useRef(null);
let Opton4 = useRef(null);

let option_array = [Opton1,Opton2,Opton3,Opton4];

const checkAns = (e,ans) => {
    if (lock === false) {
        if (Question.ans===ans) {
            e.target.classList.add("correct");
            setLock(true);
            setScore(prev=>prev+1);
        }
        else{
            e.target.classList.add("wrong");
            setLock(true);
            option_array[Question.ans-1].current.classList.add("correct");
        } 
    } 
}

const next = ()=>{
    if (lock===true) {
        if (index === data.length -1) {
            setResult(true);
            return 0;
        }
        setIndex(++index);
        setQuestion(data[index]);
        setLock(false);
        option_array.map((option)=>{
            option.current.classList.remove("wrong");
            option.current.classList.remove("correct");
            return null;
        })
    }
}

const reset = () => {
    setIndex(0);
    setQuestion(data[0]);
    setScore(0);
    setLock(false);
    setResult(false);
}

  return (
    <div className='container'>
      <h1>Quiz App</h1>
      <hr />
      {result?<></>:<><h2>{index+1}. {Question.question}</h2>
      <ul>
        <li ref={Opton1} onClick={(e)=>{checkAns(e,1)}}>{Question.option1}</li>
        <li ref={Opton2} onClick={(e)=>{checkAns(e,2)}}>{Question.option2}</li>
        <li ref={Opton3} onClick={(e)=>{checkAns(e,3)}}>{Question.option3}</li>
        <li ref={Opton4} onClick={(e)=>{checkAns(e,4)}}>{Question.option4}</li>
      </ul>
      <button onClick={next}>Next</button>
      <div className="index">{index+1} of {data.length} Questions</div>
      </>}
      {result?<>
        <h2>You Scored {score} out of {data.length} </h2>
      <button onClick={reset}>Reset</button>
      </>:<></>}
    </div>
  )
}

export default Quiz
