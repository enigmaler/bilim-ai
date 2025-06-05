export interface GrammarTopic {
  title: string;
  definition: string;
  example: string;
  link: string;
}

export const grammarTopics: GrammarTopic[] = [
  {
    title: 'Tenses',
    definition: 'Verb tenses show the time of an action or state.',
    example: 'I have finished my homework.',
    link: 'https://www.ef.com/english-resources/english-grammar/verb-tenses/'
  },
  {
    title: 'Conditionals',
    definition: 'Conditionals express possibilities using if-clauses.',
    example: 'If it rains, we\'ll stay home.',
    link: 'https://www.perfect-english-grammar.com/conditionals.html'
  },
  {
    title: 'Modal Verbs',
    definition: 'Modals like can, must, and should show ability or obligation.',
    example: 'She can speak three languages.',
    link: 'https://www.ef.com/english-resources/english-grammar/modal-verbs/'
  },
  {
    title: 'Articles',
    definition: 'Articles a, an, and the define nouns as specific or unspecific.',
    example: 'I saw a dog. The dog was brown.',
    link: 'https://www.perfect-english-grammar.com/articles.html'
  },
  {
    title: 'Prepositions',
    definition: 'Prepositions show relationships between words in a sentence.',
    example: 'The book is on the table.',
    link: 'https://www.ef.com/english-resources/english-grammar/prepositions/'
  },
  {
    title: 'Passive Voice',
    definition: 'In passive voice, the subject receives the action.',
    example: 'The cake was eaten by the children.',
    link: 'https://www.perfect-english-grammar.com/passive.html'
  },
  {
    title: 'Gerunds & Infinitives',
    definition: 'Gerunds end in -ing and infinitives use to + verb.',
    example: 'I enjoy swimming. I want to swim.',
    link: 'https://www.ef.com/english-resources/english-grammar/gerund-infinitive/'
  }
];
