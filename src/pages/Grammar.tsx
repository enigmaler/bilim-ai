import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Header from '@/components/common/Header';

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

const Grammar = () => (
  <div className="min-h-screen bg-gradient-to-br from-violet-50 via-blue-50 to-cyan-50">
    <Header />
    <main className="container mx-auto px-4 py-8 max-w-3xl">
      <h2 className="text-2xl font-semibold mb-6 text-center">Grammar Guide</h2>
      <Accordion type="single" collapsible className="w-full bg-white/60 backdrop-blur-md rounded-2xl shadow-lg p-4">
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
    </main>
  </div>
);

export default Grammar;
