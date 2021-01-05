import {shuffleArray} from "./utils";

export type Question = {
    category: string;
    correct_answer: string;
    difficulty: string;
    incorrect_answers: string[];
    question: string;
    type: string;
};

export type QuestionsState = Question & {
    answers: string[]
};

export enum Difficultly {
    EASY = "easy",
    MEDIUM = "medium",
    HARD = "hard"
}

// 39:05 https://www.youtube.com/watch?v=F2JCjVSZlG0&ab_channel=freeCodeCamp.org
export const fetchQuizQuestions = async (amount: number, difficultly: Difficultly) => {
    const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficultly=${difficultly}&type=multiple`;
    const data = await (await fetch(endpoint)).json();
    return data.results.map((question: Question) => ({
        ...question,
        answers: shuffleArray([...question.incorrect_answers, question.correct_answer])
    }));
};
