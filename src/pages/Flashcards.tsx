import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Header from '@/components/common/Header';
import { fetchFromDeepSeek } from '@/lib/deepseek';

interface Card {
  word: string;
  meaning: string;
}

const Flashcards = () => {
  const [term, setTerm] = useState('');
  const [cards, setCards] = useState<Card[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const addCard = async () => {
    if (!term.trim()) return;
    setIsLoading(true);
    try {
      const res = await fetchFromDeepSeek(
        `Give a short definition and example sentence for the word "${term.trim()}". Format as: definition - example.`,
        'You are a helpful language tutor created by Emilbek. Respond concisely.'
      );
      setCards([...cards, { word: term.trim(), meaning: res.trim() }]);
      setTerm('');
    } catch (error) {
      console.error('Failed to add card:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-blue-50 to-cyan-50">
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Flashcards</h2>
        <div className="flex space-x-2 mb-4">
          <Input
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            placeholder="Enter new word or phrase"
            className="bg-white/80 backdrop-blur-sm"
          />
          <Button
            onClick={addCard}
            disabled={!term.trim() || isLoading}
            className="bg-gradient-to-r from-violet-500 to-blue-500 text-white"
          >
            {isLoading ? 'Adding...' : 'Add'}
          </Button>
        </div>
        <div className="space-y-4">
          {cards.map((c, i) => (
            <div key={i} className="bg-white/70 backdrop-blur-sm p-4 rounded-xl shadow">
              <p className="font-medium text-violet-700 mb-1">{c.word}</p>
              <p className="text-gray-700 whitespace-pre-line">{c.meaning}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Flashcards;
