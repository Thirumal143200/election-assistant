import React, { useState } from 'react';
import { CheckCircle2, XCircle, ArrowRight, RotateCcw, Trophy } from 'lucide-react';
import './Quiz.css';

const quizData = [
  {
    question: "What is the minimum age required to register as a voter in most democracies, including India?",
    options: ["16 years", "18 years", "21 years", "25 years"],
    correct: 1,
    explanation: "In India and most democracies, a citizen must be at least 18 years old on the qualifying date to be eligible to vote."
  },
  {
    question: "What does EVM stand for?",
    options: [
      "Election Verification Module",
      "Electronic Voting Machine",
      "Electoral Vote Manager",
      "Early Voting Mechanism"
    ],
    correct: 1,
    explanation: "EVM stands for Electronic Voting Machine, which has replaced paper ballots in many countries to make voting faster and more secure."
  },
  {
    question: "What is the purpose of VVPAT?",
    options: [
      "To count the votes instantly",
      "To provide a paper trail for the voter to verify their vote",
      "To verify the voter's identity",
      "To broadcast election results"
    ],
    correct: 1,
    explanation: "VVPAT (Voter Verifiable Paper Audit Trail) prints a slip showing the candidate chosen, allowing the voter to verify their vote before it drops into a sealed box."
  },
  {
    question: "During an election, what is the 'Model Code of Conduct'?",
    options: [
      "A dress code for politicians",
      "A set of guidelines for political parties and candidates",
      "The software running on EVMs",
      "The oath taken by the winner"
    ],
    correct: 1,
    explanation: "The Model Code of Conduct is a set of guidelines issued by the Election Commission to ensure free and fair elections, preventing misuse of official machinery."
  },
  {
    question: "What happens if no candidate gets an absolute majority in a proportional representation system?",
    options: [
      "The election is cancelled",
      "A coalition government may be formed",
      "The President takes over",
      "The Supreme Court decides the winner"
    ],
    correct: 1,
    explanation: "If no single party gets a majority, multiple parties can join together to form a coalition government that collectively holds the majority."
  }
];

const Quiz = () => {
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const handleOptionClick = (index) => {
    if (isAnswered) return;
    setSelectedOpt(index);
    setIsAnswered(true);
    
    if (index === quizData[currentQ].correct) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQ < quizData.length - 1) {
      setCurrentQ(prev => prev + 1);
      setSelectedOpt(null);
      setIsAnswered(false);
    } else {
      setShowResult(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQ(0);
    setScore(0);
    setShowResult(false);
    setSelectedOpt(null);
    setIsAnswered(false);
  };

  if (showResult) {
    const percentage = Math.round((score / quizData.length) * 100);
    return (
      <div className="quiz-container result-view glass animate-fade-in-up">
        <div className="score-ring-container">
          <svg viewBox="0 0 36 36" className="circular-chart">
            <path className="circle-bg"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path className="circle"
              strokeDasharray={`${percentage}, 100`}
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <text x="18" y="20.35" className="percentage">{percentage}%</text>
          </svg>
        </div>
        
        <h2 className="text-gradient"><Trophy className="inline-icon" /> Quiz Completed!</h2>
        <p className="score-text">You scored {score} out of {quizData.length}</p>
        
        <div className="result-feedback">
          {percentage === 100 ? "Perfect! You're an election expert! 🌟" :
           percentage >= 60 ? "Great job! You know your stuff! 👍" :
           "Good effort! Time to review the flashcards! 📚"}
        </div>

        <button className="btn btn-primary mt-4" onClick={restartQuiz}>
          <RotateCcw size={16} /> Retake Quiz
        </button>
      </div>
    );
  }

  const q = quizData[currentQ];

  return (
    <div className="quiz-container glass animate-fade-in-up">
      <div className="quiz-header">
        <span className="q-counter">Question {currentQ + 1} of {quizData.length}</span>
        <div className="q-progress-bg">
          <div className="q-progress-fill" style={{width: `${((currentQ) / quizData.length) * 100}%`}}></div>
        </div>
      </div>

      <h3 className="question-text">{q.question}</h3>

      <div className="options-grid">
        {q.options.map((opt, i) => {
          let stateClass = '';
          if (isAnswered) {
            if (i === q.correct) stateClass = 'correct';
            else if (i === selectedOpt) stateClass = 'wrong';
            else stateClass = 'dimmed';
          }

          return (
            <button
              key={i}
              className={`option-btn ${stateClass}`}
              onClick={() => handleOptionClick(i)}
              disabled={isAnswered}
            >
              <span className="opt-letter">{String.fromCharCode(65 + i)}</span>
              {opt}
              {isAnswered && i === q.correct && <CheckCircle2 size={18} className="opt-icon correct" />}
              {isAnswered && i === selectedOpt && i !== q.correct && <XCircle size={18} className="opt-icon wrong" />}
            </button>
          );
        })}
      </div>

      {isAnswered && (
        <div className="explanation-box animate-fade-in">
          <h4>Explanation:</h4>
          <p>{q.explanation}</p>
        </div>
      )}

      <div className="quiz-footer">
        <button
          className="btn btn-primary next-btn"
          disabled={!isAnswered}
          onClick={handleNext}
        >
          {currentQ === quizData.length - 1 ? 'See Results' : 'Next Question'} <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default Quiz;
