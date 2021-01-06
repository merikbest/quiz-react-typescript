import React from 'react';
import {useState} from 'react';

import QuestionCard from "./components/QuestionCard";
import {Difficultly, fetchQuizQuestions, QuestionsState} from "./API";
import {GlobalStyle, Wrapper} from './App.styles';

const TOTAL_QUESTIONS = 10;

export type AnswerObject = {
    question: string;
    answer: string;
    correct: boolean;
    correctAnswer: string;
};

const App = () => {
    const [loading, setLoading] = useState(false);
    const [questions, setQuestions] = useState<QuestionsState[]>([]);
    const [number, setNumber] = useState(0);
    const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(true);

    const startTrivia = async () => {
        setLoading(true);
        setGameOver(false);

        const newQuestions = await fetchQuizQuestions(TOTAL_QUESTIONS, Difficultly.EASY);
        setQuestions(newQuestions);
        setScore(0);
        setUserAnswers([]);
        setNumber(0);
        setLoading(false);
    };

    const checkAnswer = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (!gameOver) {
            const answer = event.currentTarget.value;
            const correct = questions[number].correct_answer === answer;

            if (correct) {
                setScore((prevScore) => prevScore + 1);
            }

            const answerObject = {
                question: questions[number].question,
                answer,
                correct,
                correctAnswer: questions[number].correct_answer
            };

            setUserAnswers(perv => [...perv, answerObject]);
        }
    };

    const nextQuestion = () => {
        const nextQuestion = number + 1;

        if (nextQuestion === TOTAL_QUESTIONS) {
            setGameOver(true);
        } else {
            setNumber(nextQuestion);
        }
    };

    return (
        <>
            <GlobalStyle/>
            <Wrapper>
                <h1>React quiz</h1>
                {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
                    <button className="start" onClick={startTrivia}>
                        Start
                    </button>
                ) : null}
                {!gameOver ? (<p className="score">Score: {score}</p>) : null}
                {loading && (<p>Loading Questions ...</p>)}
                {!loading && !gameOver && (
                    <QuestionCard
                        questionNumber={number + 1}
                        totalQuestions={TOTAL_QUESTIONS}
                        question={questions[number].question}
                        answers={questions[number].answers}
                        userAnswer={userAnswers ? userAnswers[number] : undefined}
                        callback={checkAnswer}/>
                )}
                {!gameOver && !loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS - 1 ? (
                    <button className="next" onClick={nextQuestion}>
                        Next Question
                    </button>
                ) : null}
            </Wrapper>
        </>
    );
}

export default App;
