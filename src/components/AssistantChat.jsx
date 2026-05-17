import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, Sparkles } from 'lucide-react';
import './AssistantChat.css';

/* ───────────────────────────────────────────
   Local Election Knowledge Base
   Keyword → answer mapping for instant replies
   ─────────────────────────────────────────── */
const knowledgeBase = [
  {
    keywords: ['register', 'registration', 'how to register', 'sign up to vote', 'voter registration'],
    answer: `**Voter Registration** 📝\n\nTo register to vote you typically need to:\n1. Be a citizen of the country and meet the minimum age requirement (usually 18).\n2. Check if you're already on the electoral roll via your election commission's website.\n3. Fill out a registration form — most countries now allow online registration.\n4. Provide proof of identity and address.\n5. Submit before the registration deadline.\n\nIn India, you can register at nvsp.in. In the US, visit vote.gov. Deadlines vary by state/region, so register early!`
  },
  {
    keywords: ['vote', 'how to vote', 'voting', 'cast a vote', 'polling', 'poll', 'ballot'],
    answer: `**How to Vote** 🗳️\n\nOn Election Day:\n1. Go to your assigned polling station (check your voter ID for the address).\n2. Bring a valid photo ID for verification.\n3. An officer will verify your identity against the electoral roll.\n4. You'll receive a ballot or be directed to an Electronic Voting Machine (EVM).\n5. Cast your vote in the private booth.\n6. Your finger will be marked with indelible ink to prevent duplicate voting.\n\nIf you can't attend in person, many countries offer absentee/postal ballots — apply in advance!`
  },
  {
    keywords: ['electoral college', 'electors', '270'],
    answer: `**Electoral College** 🏛️\n\nThe Electoral College is a system used in the United States to elect the President:\n- There are **538 electors** in total.\n- A candidate needs at least **270 electoral votes** to win.\n- Each state gets electors equal to its Congressional representation (Senators + House members).\n- Most states use a **winner-take-all** system — whoever wins the popular vote in a state gets all its electoral votes.\n- This means a candidate can win the presidency without winning the overall popular vote (as happened in 2000 and 2016).`
  },
  {
    keywords: ['primary', 'primaries', 'caucus', 'caucuses', 'nomination process'],
    answer: `**Primaries & Caucuses** 🏅\n\nThese are how parties choose their candidates:\n\n**Primary Elections:**\n- Voters cast secret ballots at polling stations.\n- Can be *open* (any voter) or *closed* (party members only).\n- Results directly determine delegate allocation.\n\n**Caucuses:**\n- Local meetings where party members openly discuss and vote.\n- More time-intensive and participatory.\n- Fewer states/countries use this method now.\n\nDelegates from primaries/caucuses attend the party convention to formally nominate the candidate.`
  },
  {
    keywords: ['evm', 'electronic voting machine', 'vvpat', 'machine'],
    answer: `**Electronic Voting Machines (EVMs)** 💻\n\nEVMs are used in countries like India for efficient and accurate voting:\n- They are standalone, battery-operated devices — not connected to any network.\n- Each EVM can record up to 3,840 votes.\n- Paired with **VVPAT** (Voter Verifiable Paper Audit Trail) — a small printer that shows a paper slip of your vote for 7 seconds for verification.\n- After polling, EVMs are sealed and stored in strongrooms under 24/7 CCTV and armed guard until counting day.\n- VVPAT slips from randomly selected booths are cross-verified with EVM results.`
  },
  {
    keywords: ['count', 'counting', 'result', 'results', 'tally', 'who wins', 'winner'],
    answer: `**Vote Counting & Results** 📊\n\nAfter polls close:\n1. **Postal/absentee ballots** are counted first.\n2. **EVM votes** are counted round by round at designated counting centers.\n3. Each round covers a set of polling stations.\n4. Candidates and their agents can observe the process.\n5. **VVPAT audit**: Paper slips from randomly selected booths are matched against EVM totals.\n6. The candidate with the **most votes** in a constituency wins (First Past The Post system).\n7. Results are announced progressively and the final tally determines seats won by each party.`
  },
  {
    keywords: ['gerrymander', 'gerrymandering', 'district', 'redistricting'],
    answer: `**Gerrymandering** 🗺️\n\nGerrymandering is the manipulation of electoral district boundaries for political advantage:\n- **Packing**: Concentrating opposition voters into a few districts so they win those overwhelmingly but lose everywhere else.\n- **Cracking**: Spreading opposition voters across many districts so they can't win a majority anywhere.\n- It undermines fair representation and is a major issue in U.S. politics.\n- Some countries use independent boundary commissions to prevent it.\n- The term comes from Governor Elbridge Gerry (1812) whose redistricting map resembled a salamander.`
  },
  {
    keywords: ['swing state', 'battleground', 'toss-up', 'key state'],
    answer: `**Swing States** ⚖️\n\nSwing states (or battleground states) are regions where neither major party has a reliable majority:\n- Both parties invest heavily in these states with campaigning and ads.\n- Examples in the U.S.: Pennsylvania, Michigan, Wisconsin, Arizona, Georgia.\n- A few thousand votes in a swing state can decide the entire election.\n- Candidates often tailor their policies to appeal to swing state voters.\n- Voter turnout in these states tends to be higher due to intense campaigning.`
  },
  {
    keywords: ['campaign', 'campaigning', 'rally', 'advertisement', 'ads'],
    answer: `**Election Campaigning** 📣\n\nCampaigning is how candidates communicate their platform to voters:\n- **Rallies & Speeches**: Large public gatherings to energize supporters.\n- **TV/Radio Ads**: Paid advertisements promoting the candidate or critiquing opponents.\n- **Digital & Social Media**: Increasingly the dominant campaign channel.\n- **Door-to-door canvassing**: Volunteers speak directly with voters.\n- **Debates**: Candidates face off on policy issues on live TV.\n\n**Rules:**\n- Most countries impose spending limits.\n- Campaigning must stop 24–48 hours before polling ("silence period").\n- The Model Code of Conduct restricts misuse of government resources during elections.`
  },
  {
    keywords: ['fptp', 'first past the post', 'plurality', 'voting system', 'electoral system'],
    answer: `**First Past The Post (FPTP)** 🏁\n\nFPTP is the simplest and most common electoral system:\n- Each constituency elects **one representative**.\n- The candidate with the **most votes wins**, even without a majority (>50%).\n- Used in India, the UK, the US (for Congress), and Canada.\n\n**Pros:** Simple, clear winner, strong local representation.\n**Cons:** Can lead to "wasted votes", discourages smaller parties, a candidate can win with just 30% of votes.\n\n**Alternatives:**\n- Proportional Representation (PR)\n- Ranked Choice Voting (RCV)\n- Mixed-Member Proportional (MMP)`
  },
  {
    keywords: ['india', 'indian election', 'election commission', 'eci', 'lok sabha'],
    answer: `**Indian Elections** 🇮🇳\n\nIndia runs the world's largest democratic exercise:\n- **Election Commission of India (ECI)** is the constitutional body that conducts all elections.\n- **Lok Sabha** (Lower House) has 543 seats — a party needs 272 to form government.\n- Elections are held in multiple **phases** (up to 7) due to the massive scale.\n- Over **900 million** eligible voters.\n- Uses **EVMs + VVPAT** across all polling stations.\n- The **Model Code of Conduct** ensures a level playing field.\n- State Assembly elections follow a similar process for each of the 28 states.`
  },
  {
    keywords: ['us election', 'america', 'united states', 'presidential', 'president'],
    answer: `**U.S. Presidential Elections** 🇺🇸\n\nThe process spans nearly a year:\n1. **Primaries & Caucuses** (Jan–June): Parties choose their candidates.\n2. **National Conventions** (Summer): Candidates are officially nominated.\n3. **General Election Campaign** (Sep–Nov): Debates, ads, rallies.\n4. **Election Day**: First Tuesday after November 1st.\n5. **Electoral College Vote** (December): Electors formally cast votes.\n6. **Inauguration** (January 20): The new President takes office.\n\nKey facts:\n- 538 electoral votes total; need 270 to win.\n- Elections happen every 4 years.\n- Presidents can serve a maximum of 2 terms (8 years).`
  },
  {
    keywords: ['absentee', 'postal', 'mail-in', 'remote voting', 'mail ballot'],
    answer: `**Absentee & Postal Voting** ✉️\n\nAbsentee voting allows you to cast your ballot without going to a polling station:\n- Available for military personnel, overseas citizens, people with disabilities, and others who qualify.\n- **Postal ballot**: Sent to your registered address; you fill it in and mail it back.\n- **Early voting**: Some jurisdictions allow in-person voting days or weeks before Election Day.\n- Applications usually must be submitted well before the deadline.\n- Postal ballots are counted first on counting day.\n- Security measures include signature verification and unique barcodes.`
  },
  {
    keywords: ['turnout', 'participation', 'voter apathy', 'why vote'],
    answer: `**Voter Turnout & Why Voting Matters** 📈\n\nVoter turnout is the percentage of eligible voters who actually cast ballots:\n- Global average is around **65-70%** for national elections.\n- Some countries (Australia, Belgium) have **compulsory voting** with 90%+ turnout.\n- Factors affecting turnout: weather, day of the week, convenience, voter enthusiasm, and trust in the system.\n\n**Why every vote matters:**\n- Elections have been decided by single-digit margins.\n- Higher turnout = more representative government.\n- It's your primary mechanism to hold leaders accountable.\n- Not voting is still a political choice — but with no influence on the outcome.`
  },
  {
    keywords: ['party', 'political party', 'parties', 'democrat', 'republican', 'bjp', 'congress'],
    answer: `**Political Parties** 🎪\n\nPolitical parties are organizations that seek to influence government policy by nominating candidates for elections:\n- They represent different ideologies, values, and policy platforms.\n- **Two-party systems** (e.g., US: Democrats & Republicans) vs. **Multi-party systems** (e.g., India: BJP, INC, AAP, and many regional parties).\n- Parties raise funds, organize campaigns, and mobilize voters.\n- In many democracies, parties must register with the election commission and follow strict financial reporting rules.\n- Coalition governments form when no single party wins a majority.`
  },
];

function findBestAnswer(query) {
  const q = query.toLowerCase().trim();

  if (q.length < 3) {
    return "Could you provide a bit more detail? I can help with topics like voter registration, how elections work, EVMs, counting, electoral systems, and much more!";
  }

  let bestMatch = null;
  let bestScore = 0;

  for (const entry of knowledgeBase) {
    let score = 0;
    for (const kw of entry.keywords) {
      if (q.includes(kw)) {
        score += kw.length; // longer keyword matches are more relevant
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestMatch = entry;
    }
  }

  if (bestMatch && bestScore > 0) {
    return bestMatch.answer;
  }

  // Fallback — still give a helpful response
  return `Great question! Here are some topics I can help you with:\n\n` +
    `• **Voter Registration** — How to register and deadlines\n` +
    `• **How to Vote** — The polling process step by step\n` +
    `• **Electoral College** — How it works in the U.S.\n` +
    `• **EVMs & VVPATs** — Electronic voting technology\n` +
    `• **Primaries & Caucuses** — How candidates are chosen\n` +
    `• **Counting & Results** — What happens after polls close\n` +
    `• **Indian Elections** — The world's largest democracy\n` +
    `• **U.S. Presidential Elections** — The full timeline\n` +
    `• **Gerrymandering, Swing States, FPTP** — Electoral concepts\n\n` +
    `Try asking about any of these topics!`;
}

/* ─── Simple markdown-like formatting ─── */
function formatMessage(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br/>');
}

const quickPrompts = [
  'How do I register to vote?',
  'What is the Electoral College?',
  'How does voting work in India?',
  'What is gerrymandering?',
];

const AssistantChat = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! 👋 I'm your **Election Assistant**. Ask me anything about elections — voter registration, how voting works, electoral systems, and more!", sender: 'bot' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => { scrollToBottom(); }, [messages, isTyping]);

  const sendMessage = (text) => {
    if (!text.trim()) return;

    const userMsg = { id: Date.now(), text, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // Simulate brief thinking delay then answer from knowledge base
    const delay = 400 + Math.random() * 600;
    setTimeout(() => {
      const answer = findBestAnswer(text);
      setMessages(prev => [...prev, { id: Date.now() + 1, text: answer, sender: 'bot' }]);
      setIsTyping(false);
    }, delay);
  };

  const handleSend = () => sendMessage(inputValue);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="chat-wrapper animate-fade-in-up">
      <div className="chat-container glass">
        <div className="chat-header">
          <div className="chat-avatar-wrap">
            <div className="chat-avatar"><Bot size={22} /></div>
            <div className="chat-avatar-ring"></div>
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.1rem' }}>Election Assistant</h3>
            <span className="online-dot">Online · Ask me anything</span>
          </div>
          <Sparkles size={18} className="header-sparkle" />
        </div>

        <div className="messages-area">
          {messages.map((msg) => (
            <div key={msg.id} className={`msg-row ${msg.sender}`}>
              {msg.sender === 'bot' && <div className="msg-av bot"><Bot size={14} /></div>}
              <div
                className={`msg-bubble ${msg.sender}`}
                dangerouslySetInnerHTML={{ __html: formatMessage(msg.text) }}
              />
              {msg.sender === 'user' && <div className="msg-av user"><User size={14} /></div>}
            </div>
          ))}
          {isTyping && (
            <div className="msg-row bot">
              <div className="msg-av bot"><Bot size={14} /></div>
              <div className="msg-bubble bot typing">
                <span className="dot-pulse"></span>
                <span className="dot-pulse"></span>
                <span className="dot-pulse"></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick prompts */}
        {messages.length <= 2 && !isTyping && (
          <div className="quick-prompts">
            {quickPrompts.map((p, i) => (
              <button key={i} className="quick-btn" onClick={() => sendMessage(p)}>{p}</button>
            ))}
          </div>
        )}

        <div className="chat-input-bar">
          <textarea
            placeholder="Ask about elections..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyPress}
            rows={1}
          />
          <button className="send-btn" onClick={handleSend} disabled={!inputValue.trim()}>
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssistantChat;
