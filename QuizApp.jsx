import React, { useState } from 'react';
import { ChevronLeft, CheckCircle2, XCircle, Info, Play, BookOpen } from 'lucide-react';

// --- DATABASE: 10 Questions for Chapter 1 (Example) ---
const CHAPTER_DATA = {
  1: {
    title: "Patterns in Mathematics",
    questions: [
      { id: 1, type: "MCQ", q: "What is the 5th triangular number?", options: ["10", "12", "15", "20"], a: "15", exp: "Triangular numbers follow the pattern n(n+1)/2. For n=5, it is (5*6)/2 = 15." },
      { id: 2, type: "TF", q: "The number 1 is both a square and a triangular number.", options: ["True", "False"], a: "True", exp: "1 = 1x1 (Square) and 1 is the first triangular number." },
      { id: 3, type: "Fill", q: "A sequence where each number is the sum of the two preceding ones is named after _______.", a: "Virahanka", exp: "Also known as Fibonacci numbers in the West, these were described much earlier by Indian mathematician Virahanka." },
      { id: 4, type: "MCQ", q: "Which of these is NOT a square number?", options: ["16", "25", "30", "36"], a: "30", exp: "Square numbers are integers multiplied by themselves. 5x5=25 and 6x6=36. 30 has no integer root." },
      { id: 5, type: "TF", q: "Even numbers can never be triangular.", options: ["True", "False"], a: "False", exp: "6 and 10 are examples of even triangular numbers." },
      { id: 6, type: "MCQ", q: "The sum of the first 4 odd numbers (1+3+5+7) is:", options: ["12", "14", "16", "18"], a: "16", exp: "The sum of the first 'n' odd numbers is always n squared (4^2 = 16)." },
      { id: 7, type: "Fill", q: "The next number in the pattern 1, 4, 9, 16 is ___.", a: "25", exp: "This is a sequence of square numbers: 1², 2², 3², 4², so next is 5²." },
      { id: 8, type: "MCQ", q: "How many dots are in a square pattern of side 4?", options: ["8", "12", "16", "20"], a: "16", exp: "A square pattern uses dots in an n x n grid. 4 x 4 = 16." },
      { id: 9, type: "TF", q: "Every number in the Virahanka sequence is prime.", options: ["True", "False"], a: "False", exp: "The sequence starts 1, 1, 2, 3, 5, 8... 8 is not a prime number." },
      { id: 10, type: "Fill", q: "Triangular numbers represent dots arranged in an equilateral _______.", a: "Triangle", exp: "The dots are arranged to form a triangle shape, starting with one dot at the top." }
    ]
  }
  // Repeat similar structure for Chapters 2-10
};

export default function QuizApp() {
  const [view, setView] = useState('chapters'); // chapters, types, quiz, results
  const [selectedCh, setSelectedCh] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const chapters = Array.from({ length: 10 }, (_, i) => i + 1);

  const startQuiz = (type) => {
    setSelectedType(type);
    setCurrentIdx(0);
    setUserAnswers([]);
    setView('quiz');
  };

  const handleAnswer = (ans) => {
    const newAnswers = [...userAnswers, { qIdx: currentIdx, userAns: ans }];
    setUserAnswers(newAnswers);
    setInputValue('');

    if (currentIdx < 9) {
      setCurrentIdx(currentIdx + 1);
    } else {
      setView('results');
    }
  };

  // --- UI Components ---

  if (view === 'chapters') {
    return (
      <div className="min-h-screen bg-slate-50 p-8 font-sans text-slate-800">
        <h1 className="text-4xl font-bold text-center mb-2 text-sky-600">Ganita Prakash</h1>
        <p className="text-center text-slate-500 mb-10">Select a chapter to begin your journey</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
          {chapters.map(num => (
            <div 
              key={num} 
              onClick={() => { setSelectedCh(num); setView('types'); }}
              className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:border-sky-300 transition-all cursor-pointer group"
            >
              <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center text-sky-600 font-bold text-xl mb-4 group-hover:bg-sky-600 group-hover:text-white transition-colors">
                {num}
              </div>
              <h3 className="font-semibold text-lg leading-tight">Chapter {num}</h3>
              <p className="text-sm text-slate-400 mt-1">10 Question Mock</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (view === 'types') {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="bg-white p-8 rounded-3xl shadow-2xl max-w-md w-full border border-slate-100">
          <button onClick={() => setView('chapters')} className="flex items-center text-sky-600 mb-6 hover:underline">
            <ChevronLeft size={20}/> Back to Chapters
          </button>
          <h2 className="text-2xl font-bold mb-2">Chapter {selectedCh}</h2>
          <p className="text-slate-500 mb-8">Choose your challenge mode:</p>
          <div className="space-y-4">
            {['MCQ', 'True or False', 'Match the Following', 'Fill in the Blanks'].map(type => (
              <button 
                key={type}
                onClick={() => startQuiz(type)}
                className="w-full p-4 rounded-xl border-2 border-slate-100 text-left font-medium hover:border-sky-400 hover:bg-sky-50 transition-all flex justify-between items-center group"
              >
                {type}
                <Play size={18} className="text-slate-300 group-hover:text-sky-600" />
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (view === 'quiz') {
    const q = CHAPTER_DATA[1].questions[currentIdx]; // Using Ch 1 as dummy data
    return (
      <div className="min-h-screen bg-slate-50 p-6 flex flex-col items-center">
        <div className="w-full max-w-2xl mb-8">
          <div className="flex justify-between mb-2 text-sm font-medium text-slate-500">
            <span>Question {currentIdx + 1} of 10</span>
            <span>{selectedType}</span>
          </div>
          <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
            <div className="h-full bg-sky-500 transition-all duration-500" style={{ width: `${(currentIdx + 1) * 10}%` }}></div>
          </div>
        </div>

        <div className="bg-white p-10 rounded-3xl shadow-xl max-w-2xl w-full border border-slate-100">
          <h2 className="text-2xl font-semibold mb-8">{q.q}</h2>
          
          <div className="grid gap-4">
            {q.options ? q.options.map(opt => (
              <button 
                key={opt}
                onClick={() => handleAnswer(opt)}
                className="p-5 rounded-2xl border-2 border-slate-100 text-left hover:border-sky-400 hover:bg-sky-50 transition-all font-medium"
              >
                {opt}
              </button>
            )) : (
              <div className="space-y-4">
                <input 
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type your answer here..."
                  className="w-full p-5 rounded-2xl border-2 border-slate-100 outline-none focus:border-sky-400"
                />
                <button 
                  onClick={() => handleAnswer(inputValue)}
                  className="w-full bg-sky-600 text-white p-5 rounded-2xl font-bold shadow-lg hover:bg-sky-700 transition-all"
                >
                  Submit Answer
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (view === 'results') {
    const score = userAnswers.filter((ua, i) => ua.userAns.toLowerCase() === CHAPTER_DATA[1].questions[i].a.toLowerCase()).length;
    return (
      <div className="min-h-screen bg-slate-50 p-8 flex flex-col items-center">
        <div className="bg-white p-8 rounded-3xl shadow-xl max-w-3xl w-full text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">Quiz Complete!</h2>
          <div className="text-6xl font-black text-sky-600 mb-4">{score}/10</div>
          <p className="text-slate-500">Review your answers and explanations below.</p>
          <button 
            onClick={() => setView('chapters')}
            className="mt-6 px-8 py-3 bg-slate-800 text-white rounded-xl font-semibold hover:bg-slate-700 transition-all"
          >
            Back to Dashboard
          </button>
        </div>

        <div className="max-w-3xl w-full space-y-6">
          {CHAPTER_DATA[1].questions.map((q, i) => {
            const isCorrect = userAnswers[i]?.userAns.toLowerCase() === q.a.toLowerCase();
            return (
              <div key={i} className={`p-6 rounded-2xl border ${isCorrect ? 'bg-emerald-50 border-emerald-100' : 'bg-orange-50 border-orange-100'}`}>
                <div className="flex items-start justify-between mb-4">
                  <h4 className="font-bold text-lg pr-4">{i + 1}. {q.q}</h4>
                  {isCorrect ? <CheckCircle2 className="text-emerald-500 shrink-0" /> : <XCircle className="text-orange-500 shrink-0" />}
                </div>
                <div className="flex gap-4 mb-4 text-sm">
                  <div className="flex-1">
                    <span className="block text-slate-400 uppercase text-[10px] font-bold tracking-wider">Your Answer</span>
                    <span className={`font-semibold ${isCorrect ? 'text-emerald-700' : 'text-orange-700'}`}>{userAnswers[i]?.userAns || 'Skipped'}</span>
                  </div>
                  <div className="flex-1">
                    <span className="block text-slate-400 uppercase text-[10px] font-bold tracking-wider">Correct Answer</span>
                    <span className="font-semibold text-slate-800">{q.a}</span>
                  </div>
                </div>
                <div className="bg-white/50 p-4 rounded-xl border border-white/60">
                  <div className="flex items-center gap-2 text-sky-700 font-bold text-xs mb-1">
                    <Info size={14} /> EXPLANATION
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">{q.exp}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
