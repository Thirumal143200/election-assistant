import React, { useState } from 'react';
import { RefreshCcw, ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';
import './Flashcards.css';

const cardData = [
  { term: 'Electoral College', definition: 'A body of 538 electors in the U.S. who formally elect the President and Vice President. A candidate needs 270 electoral votes to win.' },
  { term: 'Absentee Ballot', definition: 'A vote cast by someone who cannot be physically present at the polling station, usually submitted by mail before Election Day.' },
  { term: 'Incumbent', definition: 'The current holder of a political office. Incumbents often have advantages in name recognition and fundraising.' },
  { term: 'Primary Election', definition: 'A preliminary election where voters choose their party\'s candidate for the general election. Can be open (any voter) or closed (party members only).' },
  { term: 'Gerrymandering', definition: 'The practice of drawing electoral district boundaries to give one party an unfair advantage over another.' },
  { term: 'Swing State', definition: 'A state where no single party has overwhelming support, making it a key battleground that could go to either candidate.' },
  { term: 'Filibuster', definition: 'A tactic used in legislatures to delay or block a vote by extending debate, often requiring a supermajority to override.' },
  { term: 'Caucus', definition: 'A meeting of party members to select candidates or decide policy. Unlike primaries, caucuses involve open discussion and group decision-making.' },
  { term: 'Ballot Initiative', definition: 'A process that allows citizens to propose new laws or constitutional amendments by collecting a required number of signatures.' },
  { term: 'Voter Turnout', definition: 'The percentage of eligible voters who actually cast a ballot in an election. Higher turnout generally indicates a more engaged electorate.' },
];

const Flashcards = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [learned, setLearned] = useState(new Set());

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % cardData.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev === 0 ? cardData.length - 1 : prev - 1));
  };

  const toggleLearned = (e) => {
    e.stopPropagation();
    setLearned(prev => {
      const next = new Set(prev);
      if (next.has(currentIndex)) next.delete(currentIndex);
      else next.add(currentIndex);
      return next;
    });
  };

  const current = cardData[currentIndex];
  const progress = Math.round((learned.size / cardData.length) * 100);

  return (
    <div className="flashcards-section animate-fade-in-up">
      <div className="flashcards-top">
        <h2 className="text-gradient"><BookOpen size={22} /> Election Vocabulary</h2>
        <div className="fc-meta">
          <span className="fc-counter">{currentIndex + 1} / {cardData.length}</span>
          <span className="fc-learned">{learned.size} learned</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="fc-progress-bar">
        <div className="fc-progress-fill" style={{ width: `${progress}%` }}></div>
      </div>

      <div className="flashcard-scene" onClick={() => setIsFlipped(!isFlipped)}>
        <div className={`flashcard ${isFlipped ? 'is-flipped' : ''}`}>
          <div className="flashcard-face flashcard-front">
            <span className="fc-side-label">TERM</span>
            <h3>{current.term}</h3>
            <div className="flip-hint"><RefreshCcw size={14} /> Tap to reveal definition</div>
          </div>
          <div className="flashcard-face flashcard-back">
            <span className="fc-side-label">DEFINITION</span>
            <p>{current.definition}</p>
            <button className={`mark-learned-btn ${learned.has(currentIndex) ? 'is-learned' : ''}`} onClick={toggleLearned}>
              {learned.has(currentIndex) ? '✓ Learned' : 'Mark as Learned'}
            </button>
            <div className="flip-hint"><RefreshCcw size={14} /> Tap to go back</div>
          </div>
        </div>
      </div>

      <div className="fc-controls">
        <button className="btn-icon" onClick={handlePrev}><ChevronLeft size={20} /></button>
        <button className="btn-icon" onClick={handleNext}><ChevronRight size={20} /></button>
      </div>

      {/* Dot indicators */}
      <div className="fc-dots">
        {cardData.map((_, i) => (
          <button
            key={i}
            className={`fc-dot ${i === currentIndex ? 'active' : ''} ${learned.has(i) ? 'learned' : ''}`}
            onClick={() => { setIsFlipped(false); setCurrentIndex(i); }}
          />
        ))}
      </div>
    </div>
  );
};

export default Flashcards;
