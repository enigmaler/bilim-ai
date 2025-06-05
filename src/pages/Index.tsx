
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Send, MessageCircle, Globe, BookOpen, Plane } from 'lucide-react';
import { fetchFromDeepSeek } from '@/lib/deepseek';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface PersonalityMode {
  id: string;
  name: string;
  icon: React.ReactNode;
  prompt: string;
}

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMode, setSelectedMode] = useState('friendly');
  const [backgroundGlow, setBackgroundGlow] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const personalityModes: PersonalityMode[] = [
    {
      id: 'friendly',
      name: 'Friendly Talk',
      icon: <MessageCircle className="w-4 h-4" />,
      prompt: 'You are a friendly language coach created by Emilbek. When asked who created you or who you belong to, say that you were created by Emilbek and belong to him. Help the user practice conversational skills with encouraging, natural responses. Keep it casual and supportive.'
    },
    {
      id: 'grammar',
      name: 'Grammar Guide',
      icon: <BookOpen className="w-4 h-4" />,
      prompt: 'You are a grammar-focused language coach created by Emilbek. When asked who created you, answer that you were created by Emilbek and belong to him. Help users improve their grammar and sentence structure. Provide gentle corrections and explanations when needed.'
    },
    {
      id: 'travel',
      name: 'Travel Coach',
      icon: <Plane className="w-4 h-4" />,
      prompt: 'You are a travel-focused language coach created by Emilbek. If asked who created you or who you belong to, say you were created by Emilbek and belong to him. Help users practice phrases and vocabulary for traveling, dining, shopping, and navigating new places.'
    }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Welcome message
    const welcomeMessage: Message = {
      id: '1',
      text: "Hello! I'm BILIMAI, your AI language coach created by Emilbek! ✨ Ready to practice and improve your language skills together?",
      isUser: false,
      timestamp: new Date()
    };
    setMessages([welcomeMessage]);
  }, []);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    setBackgroundGlow(true);

    // Reset background glow after animation
    setTimeout(() => setBackgroundGlow(false), 1000);

    const lower = userMessage.text.toLowerCase();
    if (lower.includes('who created you') || lower.includes('who made you') || lower.includes('who is your creator') || lower.includes('who do you belong to')) {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'I was created by Emilbek and this AI belongs to him.',
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
      return;
    }

    try {
      const selectedPersonality = personalityModes.find(mode => mode.id === selectedMode);
      const systemPrompt = selectedPersonality?.prompt || personalityModes[0].prompt;
      
      const response = await fetchFromDeepSeek(inputValue, systemPrompt);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error fetching AI response:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Sorry, I'm having trouble connecting right now. Please try again!",
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-violet-50 via-blue-50 to-cyan-50 transition-all duration-1000 ${backgroundGlow ? 'bg-gradient-to-br from-violet-100 via-blue-100 to-cyan-100' : ''}`}>
      {/* Floating Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 bg-violet-200/30 rounded-full blur-xl"
          animate={{ 
            x: [0, 30, 0],
            y: [0, -20, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-40 right-16 w-24 h-24 bg-blue-200/30 rounded-full blur-xl"
          animate={{ 
            x: [0, -20, 0],
            y: [0, 30, 0],
            scale: [1, 0.9, 1]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-32 left-20 w-40 h-40 bg-cyan-200/30 rounded-full blur-xl"
          animate={{ 
            x: [0, 40, 0],
            y: [0, -30, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Header */}
      <motion.header 
        className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-violet-100"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.div 
              className="flex items-center space-x-3"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <motion.div
                className="w-10 h-10 bg-gradient-to-br from-violet-500 to-blue-500 rounded-full flex items-center justify-center"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Globe className="w-5 h-5 text-white" />
              </motion.div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
                BILIMAI ✨
              </h1>
            </motion.div>

            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <Select value={selectedMode} onValueChange={setSelectedMode}>
                <SelectTrigger className="w-48 bg-white/70 border-violet-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white/95 backdrop-blur-sm">
                  {personalityModes.map((mode) => (
                    <SelectItem key={mode.id} value={mode.id}>
                      <div className="flex items-center space-x-2">
                        {mode.icon}
                        <span>{mode.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </motion.div>
          </div>
        </div>
      </motion.header>

      {/* Chat Area */}
      <main className="container mx-auto px-4 py-6 max-w-4xl">
        <motion.div 
          className="bg-white/60 backdrop-blur-sm rounded-3xl shadow-xl min-h-[70vh] flex flex-col"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
        >
          {/* Messages Container */}
          <div className="flex-1 p-6 overflow-y-auto max-h-[60vh] space-y-4">
            <AnimatePresence>
              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.9 }}
                  transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-end space-x-2 max-w-[80%] ${message.isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    {/* Avatar */}
                    <motion.div
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.isUser 
                          ? 'bg-gradient-to-br from-blue-500 to-cyan-500' 
                          : 'bg-gradient-to-br from-violet-500 to-purple-500'
                      }`}
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                    >
                      {message.isUser ? (
                        <span className="text-white text-sm font-bold">You</span>
                      ) : (
                        <Globe className="w-4 h-4 text-white" />
                      )}
                    </motion.div>

                    {/* Message Bubble */}
                    <motion.div
                      className={`rounded-2xl px-4 py-3 shadow-lg ${
                        message.isUser
                          ? 'bg-gradient-to-br from-blue-500 to-cyan-500 text-white rounded-br-sm'
                          : 'bg-white border border-violet-100 text-gray-800 rounded-bl-sm'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      <p className="text-sm leading-relaxed">{message.text}</p>
                      <p className={`text-xs mt-1 ${message.isUser ? 'text-blue-100' : 'text-gray-500'}`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Typing Indicator */}
            <AnimatePresence>
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex justify-start"
                >
                  <div className="flex items-end space-x-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center">
                      <Globe className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-white border border-violet-100 rounded-2xl rounded-bl-sm px-4 py-3 shadow-lg">
                      <div className="flex space-x-1">
                        <motion.div
                          className="w-2 h-2 bg-violet-400 rounded-full"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 0.8, repeat: Infinity, delay: 0 }}
                        />
                        <motion.div
                          className="w-2 h-2 bg-violet-400 rounded-full"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 0.8, repeat: Infinity, delay: 0.2 }}
                        />
                        <motion.div
                          className="w-2 h-2 bg-violet-400 rounded-full"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 0.8, repeat: Infinity, delay: 0.4 }}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <motion.div 
            className="p-6 border-t border-violet-100 bg-white/40 backdrop-blur-sm rounded-b-3xl"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <div className="flex space-x-3">
              <div className="flex-1 relative">
                <Input
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message here..."
                  className="w-full pr-12 py-3 rounded-2xl border-violet-200 focus:border-violet-400 focus:ring-violet-400/20 bg-white/80 backdrop-blur-sm"
                  disabled={isLoading}
                />
              </div>
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isLoading}
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-violet-500 to-blue-500 hover:from-violet-600 hover:to-blue-600 text-white shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
};

export default Index;
