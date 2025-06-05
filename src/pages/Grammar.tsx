import { useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Header from '@/components/common/Header';
import { fetchFromDeepSeek } from '@/lib/deepseek';

const topics = [
  {
    title: 'Tenses',
    description: 'Learn how to express time correctly using past, present and future tenses.'
  },
  {
    title: 'Articles',
    description: 'Understand when to use a, an or the in different situations.'
  },
  {
    title: 'Prepositions',
    description: 'Master tricky prepositions with useful examples.'
  },
];

const Grammar = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const ask = async () => {
    if (!question.trim()) return;
    setLoading(true);
    try {
      const res = await fetchFromDeepSeek(question, 'You are a grammar expert created by Emilbek. Answer clearly.');
      setAnswer(res);
      setQuestion('');
    } catch (err) {
      console.error('Failed to get answer:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-blue-50 to-cyan-50">
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Grammar Guide</h2>
        <Accordion type="single" collapsible className="w-full bg-white/60 backdrop-blur-md rounded-2xl shadow-lg p-4 mb-8">
          {topics.map((t) => (
            <AccordionItem value={t.title} key={t.title}>
              <AccordionTrigger className="text-left font-medium text-violet-700">
                {t.title}
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 pb-4">
                {t.description}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <div className="space-y-4 bg-white/70 backdrop-blur-sm p-6 rounded-xl shadow">
          <p className="font-medium text-violet-700">Ask a grammar question</p>
          <Input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Type your question"
            className="bg-white/80"
          />
          <Button onClick={ask} disabled={!question.trim() || loading} className="bg-gradient-to-r from-violet-500 to-blue-500 text-white">
            {loading ? 'Loading...' : 'Ask'}
          </Button>
          {answer && <p className="text-gray-700 whitespace-pre-line">{answer}</p>}
        </div>
      </main>
    </div>
  );
};

export default Grammar;
