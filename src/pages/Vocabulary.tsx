import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/common/Header';

const Vocabulary = () => {
  const [word, setWord] = useState('');
  const [words, setWords] = useState<string[]>([]);

  const addWord = () => {
    if (!word.trim()) return;
    setWords([...words, word.trim()]);
    setWord('');
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
          <Button onClick={addWord} className="bg-gradient-to-r from-violet-500 to-blue-500 text-white">
            Add
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {words.map((w, i) => (
            <Badge key={i} className="px-3 py-2 bg-white/70 text-violet-700">
              {w}
            </Badge>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Vocabulary;
