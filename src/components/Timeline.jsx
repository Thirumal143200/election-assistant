import React, { useState } from 'react';
import { CheckCircle2, Circle, ArrowRight, ArrowLeft, Clock, MapPin } from 'lucide-react';
import './Timeline.css';

const steps = [
  {
    id: 1,
    title: 'Announcement & Notification',
    description: 'The Election Commission announces the election schedule, including key dates for nominations, polling phases, and counting. The Model Code of Conduct comes into effect immediately.',
    date: '6–8 weeks before election',
    icon: '📢',
    details: ['Schedule is published', 'Model Code of Conduct activated', 'Government ad spending is restricted'],
  },
  {
    id: 2,
    title: 'Voter Registration',
    description: 'Citizens register to vote by verifying their eligibility and ensuring their names appear on the electoral roll. Voter ID cards are issued.',
    date: 'Ongoing / Deadline-based',
    icon: '📝',
    details: ['Check eligibility (age, citizenship)', 'Register online or at local offices', 'Receive Voter ID / EPIC card'],
  },
  {
    id: 3,
    title: 'Nomination of Candidates',
    description: 'Candidates file nomination papers with the Returning Officer. Papers are scrutinized, and a window is provided for withdrawals before the final candidate list is published.',
    date: '2–4 weeks before polling',
    icon: '🏅',
    details: ['File nomination papers', 'Scrutiny by Returning Officer', 'Withdrawal period', 'Final candidate list published'],
  },
  {
    id: 4,
    title: 'Election Campaigning',
    description: 'Parties and candidates campaign through rallies, debates, advertisements, and door-to-door outreach. Campaigning must cease 48 hours before polling.',
    date: 'Until 48 hrs before polls',
    icon: '📣',
    details: ['Rallies and public meetings', 'TV/radio/digital ads', 'Door-to-door canvassing', 'Campaign silence period enforced'],
  },
  {
    id: 5,
    title: 'Polling Day (Voting)',
    description: 'Voters cast their ballots at designated polling stations using EVMs (Electronic Voting Machines). Voter identity is verified and ink is applied to prevent duplicate voting.',
    date: 'Election Day (may span phases)',
    icon: '🗳️',
    details: ['Identity verification at booth', 'Vote via EVM + VVPAT', 'Indelible ink applied', 'Booths open 7 AM – 6 PM typically'],
  },
  {
    id: 6,
    title: 'Counting & Results',
    description: 'After all polling phases conclude, sealed EVMs are transported to counting centers. Postal ballots are counted first, followed by EVM votes round by round.',
    date: 'Days after final polling phase',
    icon: '📊',
    details: ['EVMs stored in strongrooms under guard', 'Postal ballots counted first', 'EVM counting in rounds', 'VVPAT audit of random booths'],
  },
  {
    id: 7,
    title: 'Government Formation',
    description: 'The party or coalition with a majority of seats is invited to form the government. The winning leader is sworn in by the head of state.',
    date: 'Within days of results',
    icon: '🏛️',
    details: ['Majority = right to form govt', 'Coalition negotiations if needed', 'Swearing-in ceremony', 'New government takes office'],
  },
];

const Timeline = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="timeline-section animate-fade-in-up">
      <div className="timeline-top-bar">
        <h2 className="text-gradient">Election Process Timeline</h2>
        <p className="timeline-subtitle">Follow each stage of a democratic election from start to finish.</p>
      </div>

      {/* Horizontal step indicators */}
      <div className="timeline-stepper">
        {steps.map((step, i) => (
          <React.Fragment key={step.id}>
            <button
              className={`stepper-dot ${i <= activeStep ? 'active' : ''} ${i === activeStep ? 'current' : ''}`}
              onClick={() => setActiveStep(i)}
              title={step.title}
            >
              <span className="stepper-emoji">{step.icon}</span>
            </button>
            {i < steps.length - 1 && (
              <div className={`stepper-line ${i < activeStep ? 'filled' : ''}`}></div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Detail Card */}
      <div className="timeline-detail glass" key={activeStep}>
        <div className="detail-header">
          <span className="detail-emoji">{steps[activeStep].icon}</span>
          <div>
            <h3>{steps[activeStep].title}</h3>
            <span className="detail-date"><Clock size={14} /> {steps[activeStep].date}</span>
          </div>
          <span className="step-badge">Step {activeStep + 1} of {steps.length}</span>
        </div>

        <p className="detail-description">{steps[activeStep].description}</p>

        <ul className="detail-checklist">
          {steps[activeStep].details.map((d, i) => (
            <li key={i} className="animate-fade-in" style={{ animationDelay: `${i * 0.08}s` }}>
              <CheckCircle2 size={16} className="check-icon" /> {d}
            </li>
          ))}
        </ul>

        <div className="detail-nav">
          <button className="btn btn-outline" disabled={activeStep === 0} onClick={() => setActiveStep(prev => prev - 1)}>
            <ArrowLeft size={16} /> Previous
          </button>
          <button className="btn btn-primary" disabled={activeStep === steps.length - 1} onClick={() => setActiveStep(prev => prev + 1)}>
            Next <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
