import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/common/Header';
import { fetchFromDeepSeek } from '@/lib/deepseek';

interface VocabItem {
  term: string;
  info: string;
}

const Vocabulary = () => {
  const [word, setWord] = useState('');
  const [items, setItems] = useState<VocabItem[]>([]);
  const [loading, setLoading] = useState(false);

  const addWord = async () => {
    if (!word.trim()) return;
    setLoading(true);
    try {
      const res = await fetchFromDeepSeek(
        `Explain the meaning of "${word.trim()}" and provide a short example sentence.`,
        'You are a helpful language tutor created by Emilbek. Be concise.'
      );
      setItems([...items, { term: word.trim(), info: res.trim() }]);
      setWord('');
    } catch (error) {
      console.error('Failed to fetch info:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-blue-50 to-cyan-50">
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Vocabulary Builder</h2>
        <div className="flex space-x-2 mb-4">
          <Input
            value={word}
            onChange={(e) => setWord(e.target.value)}
            placeholder="Enter new word"
            className="bg-white/80 backdrop-blur-sm"
          />
          <Button onClick={addWord} disabled={!word.trim() || loading} className="bg-gradient-to-r from-violet-500 to-blue-500 text-white">
            {loading ? 'Adding...' : 'Add'}
          </Button>
        </div>
        <div className="space-y-4">
          {items.map((item, i) => (
            <div key={i} className="bg-white/70 backdrop-blur-sm p-4 rounded-xl shadow">
              <p className="font-medium text-violet-700 mb-1">{item.term}</p>
              <p className="text-gray-700 whitespace-pre-line">{item.info}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Vocabulary;
