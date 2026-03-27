<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ganita Prakash Quiz Hub</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <script src="https://unpkg.com/lucide@latest"></script>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800&display=swap');
        body { font-family: 'Inter', sans-serif; background-color: #f8fafc; }
        .glass { background: rgba(255, 255, 255, 0.8); backdrop-filter: blur(10px); }
    </style>
</head>
<body>
    <div id="root"></div>

    <script type="text/babel">
        const { useState } = React;

        const DATA = {
            1: {
                title: "Patterns in Mathematics",
                questions: [
                    { q: "What is the next triangular number after 1, 3, 6?", a: "10", options: ["8", "9", "10", "12"], exp: "Triangular numbers add the next integer: 6 + 4 = 10." },
                    { q: "The sum of the first 3 odd numbers (1+3+5) is 9.", a: "True", options: ["True", "False"], exp: "1+3+5 = 9, which is also 3 squared." },
                    { q: "A square number is formed by multiplying a number by ______.", a: "itself", exp: "For example, 4 x 4 = 16." },
                    { q: "Which of these is a Virahanka (Fibonacci) number?", a: "8", options: ["7", "8", "9", "10"], exp: "The sequence is 1, 1, 2, 3, 5, 8..." },
                    { q: "1, 4, 9, 16 are called ______ numbers.", a: "Square", options: ["Triangular", "Square", "Prime", "Even"], exp: "They are 1x1, 2x2, 3x3, and 4x4." },
                    { q: "Every triangular number is even.", a: "False", options: ["True", "False"], exp: "1, 3, and 15 are odd triangular numbers." },
                    { q: "How many dots make a triangle with side 3?", a: "6", options: ["3", "5", "6", "9"], exp: "1 dot on top, 2 in middle, 3 on bottom = 6." },
                    { q: "The 4th square number is 16.", a: "True", options: ["True", "False"], exp: "4 x 4 = 16." },
                    { q: "1, 1, 2, 3, 5, 8, 13, ___. What's next?", a: "21", options: ["18", "20", "21", "25"], exp: "8 + 13 = 21." },
                    { q: "Math patterns only happen in books.", a: "False", options: ["True", "False"], exp: "Patterns are everywhere in nature, like flower petals!" }
                ]
            }
        };

        function App() {
            const [view, setView] = useState('home'); // home, type, quiz, result
            const [ch, setCh] = useState(1);
            const [type, setType] = useState('');
            const [idx, setIdx] = useState(0);
            const [answers, setAnswers] = useState([]);
            const [input, setInput] = useState('');

            const handleAns = (val) => {
                const updated = [...answers, val];
                setAnswers(updated);
                if (idx < 9) { setIdx(idx + 1); setInput(''); } 
                else { setView('result'); }
            };

            if (view === 'home') return (
                <div className="p-8 max-w-5xl mx-auto">
                    <h1 className="text-5xl font-extrabold text-sky-600 mb-2">Ganita Prakash</h1>
                    <p className="text-slate-500 mb-10 text-xl">Class 6 Mathematics Quiz Hub</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {[1,2,3,4,5,6,7,8,9,10].map(n => (
                            <div key={n} onClick={() => {setCh(n); setView('type')}} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:border-sky-400 hover:shadow-2xl transition-all cursor-pointer group">
                                <div className="text-4xl font-black text-slate-200 group-hover:text-sky-500 mb-2">0{n}</div>
                                <h2 className="text-xl font-bold">Chapter {n}</h2>
                                <p className="text-sm text-slate-400">10 Questions • Silent Mode</p>
                            </div>
                        ))}
                    </div>
                </div>
            );

            if (view === 'type') return (
                <div className="min-h-screen flex items-center justify-center bg-sky-50 p-4">
                    <div className="bg-white p-10 rounded-[40px] shadow-2xl w-full max-w-lg">
                        <button onClick={() => setView('home')} className="text-sky-600 font-bold mb-6 block">← Back</button>
                        <h2 className="text-3xl font-bold mb-8">Select Mode</h2>
                        <div className="grid gap-4">
                            {['MCQ', 'True or False', 'Fill in the Blanks'].map(t => (
                                <button key={t} onClick={() => {setType(t); setView('quiz'); setIdx(0); setAnswers([])}} className="w-full py-5 px-6 rounded-2xl border-2 border-slate-100 text-left font-bold text-lg hover:bg-sky-600 hover:text-white hover:border-sky-600 transition-all">
                                    {t}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            );

            if (view === 'quiz') {
                const qObj = DATA[1].questions[idx];
                return (
                    <div className="min-h-screen p-6 flex flex-col items-center justify-center">
                        <div className="w-full max-w-2xl mb-6">
                            <div className="flex justify-between font-bold text-sky-600 mb-2">
                                <span>Question {idx+1}/10</span>
                                <span>Chapter {ch}</span>
                            </div>
                            <div className="h-3 bg-white rounded-full overflow-hidden shadow-inner">
                                <div className="h-full bg-sky-500 transition-all" style={{width: `${(idx+1)*10}%`}}></div>
                            </div>
                        </div>
                        <div className="bg-white p-12 rounded-[40px] shadow-2xl w-full max-w-2xl border border-white">
                            <h2 className="text-2xl font-bold mb-10 leading-snug">{qObj.q}</h2>
                            <div className="grid gap-4">
                                {type !== 'Fill in the Blanks' ? qObj.options.map(opt => (
                                    <button key={opt} onClick={() => handleAns(opt)} className="w-full p-5 rounded-2xl border-2 border-slate-50 bg-slate-50 text-left font-semibold hover:border-sky-400 hover:bg-white transition-all text-lg">
                                        {opt}
                                    </button>
                                )) : (
                                    <div className="space-y-4">
                                        <input type="text" value={input} onChange={(e)=>setInput(e.target.value)} className="w-full p-5 rounded-2xl bg-slate-100 border-2 border-transparent focus:border-sky-500 outline-none text-lg" placeholder="Enter answer..." />
                                        <button onClick={() => handleAns(input)} className="w-full py-5 bg-sky-600 text-white rounded-2xl font-bold text-xl shadow-lg hover:bg-sky-700">Next Question</button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                );
            }

            if (view === 'result') {
                const score = answers.filter((a, i) => a.toLowerCase() === DATA[1].questions[i].a.toLowerCase()).length;
                return (
                    <div className="p-8 max-w-3xl mx-auto">
                        <div className="bg-white p-12 rounded-[40px] shadow-2xl text-center mb-10 border-b-8 border-sky-500">
                            <h2 className="text-4xl font-black mb-4">Quiz Finished!</h2>
                            <div className="text-8xl font-black text-sky-600 mb-4">{score}<span className="text-2xl text-slate-300">/10</span></div>
                            <button onClick={() => setView('home')} className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-bold hover:scale-105 transition-all">Back to Hub</button>
                        </div>
                        <div className="space-y-6">
                            {DATA[1].questions.map((q, i) => (
                                <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="text-xl font-bold pr-4">{i+1}. {q.q}</h3>
                                        <span className={answers[i].toLowerCase() === q.a.toLowerCase() ? "text-emerald-500 font-black" : "text-rose-500 font-black"}>
                                            {answers[i].toLowerCase() === q.a.toLowerCase() ? "CORRECT" : "WRONG"}
                                        </span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 text-sm mb-6">
                                        <div className="p-4 bg-slate-50 rounded-xl">
                                            <p className="text-slate-400 font-bold text-xs mb-1 uppercase">Your Answer</p>
                                            <p className="font-bold">{answers[i]}</p>
                                        </div>
                                        <div className="p-4 bg-sky-50 rounded-xl">
                                            <p className="text-sky-400 font-bold text-xs mb-1 uppercase">Correct Answer</p>
                                            <p className="font-bold">{q.a}</p>
                                        </div>
                                    </div>
                                    <div className="bg-amber-50 p-6 rounded-2xl border-l-4 border-amber-400">
                                        <p className="text-amber-800 text-sm italic font-medium">"{q.exp}"</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            }
        }

        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(<App />);
    </script>
</body>
</html>
