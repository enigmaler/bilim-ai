import { useEffect, useState } from 'react';
import Header from '@/components/common/Header';
import { Button } from '@/components/ui/button';
import { grammarTopics } from '@/data/grammar';
import { motion } from 'framer-motion';

interface ReviewItem {
  term: string;
  info: string;
}

const QuickReview = () => {
  const [items, setItems] = useState<ReviewItem[]>([]);

  const load = () => {
    const vocabs = JSON.parse(localStorage.getItem('vocabulary') || '[]') as { term: string; info: string }[];
    const combined: ReviewItem[] = [
      ...vocabs.map(v => ({ term: v.term, info: v.info })),
      ...grammarTopics.map(g => ({ term: g.title, info: g.definition }))
    ];
    const shuffled = combined.sort(() => 0.5 - Math.random()).slice(0, 5);
    setItems(shuffled);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-blue-50 to-cyan-50">
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Quick Review</h2>
        <Button onClick={load} className="mb-4 bg-gradient-to-r from-violet-500 to-blue-500 text-white">
          Shuffle
        </Button>
        <div className="space-y-4">
          {items.map((item, i) => (
            <motion.div
              key={i}
              className="bg-white/70 backdrop-blur-sm p-4 rounded-xl shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <p className="font-medium text-violet-700 mb-1">{item.term}</p>
              <p className="text-gray-700 whitespace-pre-line">{item.info}</p>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default QuickReview;
