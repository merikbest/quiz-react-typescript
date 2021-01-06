import React from 'react';

import {AnswerObject} from "../App";
import {ButtonWrapper, Wrapper} from './QuestionCard.styles';

type Props = {
    question: string;
    answers: string[];
    callback: (event: React.MouseEvent<HTMLButtonElement>) => void;
    userAnswer: AnswerObject | undefined;
    questionNumber: number;
    totalQuestions: number;
};

const QuestionCard: React.FC<Props> = (
    {
        question,
        answers,
        callback,
        userAnswer,
        questionNumber,
        totalQuestions
    }) => {
    return (
        <div>
            <Wrapper>
                <p className="number">Question: {questionNumber} / {totalQuestions}</p>
                <p dangerouslySetInnerHTML={{__html: question}}/>
                <div>
                    {answers.map((answer) => (
                        <ButtonWrapper
                            key={answer}
                            correct={userAnswer?.correctAnswer === answer}
                            userClicked={userAnswer?.answer === answer}>
                            <div key={answer}>
                                <button disabled={userAnswer ? true : false} value={answer} onClick={callback}>
                                    <span dangerouslySetInnerHTML={{__html: answer}}/>
                                </button>
                            </div>
                        </ButtonWrapper>
                    ))}
                </div>
            </Wrapper>
        </div>
    );
};

export default QuestionCard;