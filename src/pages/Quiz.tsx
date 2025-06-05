import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Header from '@/components/common/Header';
import { fetchFromDeepSeek } from '@/lib/deepseek';

interface Question {
  question: string;
  options: string[];
  answer: string;
}

const Quiz = () => {
  const [current, setCurrent] = useState<Question | null>(null);
  const [selected, setSelected] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const generateQuestion = async () => {
    setLoading(true);
    setSelected('');
    setResult('');
    try {
      const prompt =
        'Create a short multiple choice grammar question for English learners. Respond in JSON with keys question, options, answer.';
      const data = await fetchFromDeepSeek(prompt, 'You are a grammar quiz generator created by Emilbek.');
      const parsed = JSON.parse(data);
      setCurrent(parsed);
    } catch (error) {
      console.error('Failed to generate question:', error);
      setCurrent(null);
    } finally {
      setLoading(false);
    }
  };

  const checkAnswer = (option: string) => {
    if (!current) return;
    setSelected(option);
    if (option === current.answer) {
      setResult('Correct!');
    } else {
      setResult(`Incorrect. Correct answer: ${current.answer}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-blue-50 to-cyan-50">
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Grammar Quiz</h2>
        <Button onClick={generateQuestion} className="mb-4 bg-gradient-to-r from-violet-500 to-blue-500 text-white">
          {loading ? 'Loading...' : current ? 'Next Question' : 'Start Quiz'}
        </Button>
        {current && (
          <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow space-y-4">
            <p className="font-medium text-violet-700">{current.question}</p>
            <div className="space-y-2">
              {current.options.map((opt) => (
                <Button
                  key={opt}
                  variant="outline"
                  onClick={() => checkAnswer(opt)}
                  disabled={!!result || loading}
                  className="w-full"
                >
                  {opt}
                </Button>
              ))}
            </div>
            {result && <p className="font-semibold">{result}</p>}
          </div>
        )}
      </main>
    </div>
  );
};

export default Quiz;
