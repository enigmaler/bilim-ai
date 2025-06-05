import Header from '@/components/common/Header';

const tracks = [
  {
    title: 'Daily Conversation',
    url: 'https://upload.wikimedia.org/wikipedia/commons/4/45/En-us-hello.ogg'
  },
  {
    title: 'Numbers Practice',
    url: 'https://upload.wikimedia.org/wikipedia/commons/7/70/En-us-one.ogg'
  }
];

const Listening = () => (
  <div className="min-h-screen bg-gradient-to-br from-violet-50 via-blue-50 to-cyan-50">
    <Header />
    <main className="container mx-auto px-4 py-8 max-w-3xl">
      <h2 className="text-2xl font-semibold mb-6 text-center">Listening Practice</h2>
      <div className="space-y-4">
        {tracks.map((t) => (
          <div key={t.title} className="bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow">
            <p className="font-medium text-violet-700 mb-2">{t.title}</p>
            <audio controls className="w-full">
              <source src={t.url} type="audio/ogg" />
              Your browser does not support the audio element.
            </audio>
          </div>
        ))}
      </div>
    </main>
  </div>
);

export default Listening;
