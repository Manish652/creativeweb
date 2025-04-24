import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot,X, User, Loader2, Sparkles, MessageSquare, Settings, Image, FileText, Mic, Info, Download, Trash } from 'lucide-react';
import { GoogleGenerativeAI } from "@google/generative-ai";

const ChatBot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "👋 Hello! I'm your AI assistant powered by Google's Gemini AI. How can I help you today?",
      sender: 'bot',
      timestamp: new Date(),
      type: 'text'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showAttachments, setShowAttachments] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const messagesEndRef = useRef(null);
  const modelRef = useRef(null);

  useEffect(() => {
    const genAI = new GoogleGenerativeAI("AIzaSyD9t4Sz5zopR_PUUvoXzNVpvet1PjhMHDA");
    modelRef.current = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || !modelRef.current) return;

    const userMessage = {
      id: messages.length + 1,
      text: input,
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const chat = modelRef.current.startChat({
        generationConfig: {
          maxOutputTokens: 1000,
        },
      });

      for (const msg of messages) {
        if (msg.sender === 'user') {
          await chat.sendMessage(msg.text);
        }
      }

      const result = await chat.sendMessage(input);
      const response = result.response;
      const text = response.text();

      const botMessage = {
        id: messages.length + 2,
        text: text || "Sorry, I couldn't generate a response.",
        sender: 'bot',
        timestamp: new Date(),
        type: 'text'
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = {
        id: messages.length + 2,
        text: `Error: ${error.message || "There was an error processing your request."}`,
        sender: 'bot',
        timestamp: new Date(),
        type: 'text'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const userMessage = {
          id: messages.length + 1,
          text: file.name,
          sender: 'user',
          timestamp: new Date(),
          type: 'image',
          file: e.target.result
        };
        setMessages(prev => [...prev, userMessage]);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearChat = () => {
    setMessages([{
      id: 1,
      text: "👋 Hello! I'm your AI assistant powered by Google's Gemini AI. How can I help you today?",
      sender: 'bot',
      timestamp: new Date(),
      type: 'text'
    }]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100/20 to-base-200/20 backdrop-blur-sm">
  <div className="max-w-6xl mx-auto p-4 h-screen flex flex-col">
    {/* Header */}
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-between mb-4 p-2 rounded-lg bg-base-100/30 backdrop-blur-md border border-base-300/30"
    >
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
          <Bot className="text-primary-content" size={18} />
        </div>
        <h1 className="font-semibold">Gemini AI</h1>
      </div>
      <button 
        onClick={() => setShowSidebar(!showSidebar)}
        className="btn btn-ghost btn-sm"
      >
        {showSidebar ? <X size={18} /> : <Menu size={18} />}
      </button>
    </motion.div>

    {/* Main Content */}
    <div className="flex flex-1 gap-4 overflow-hidden">
      {/* Sidebar */}
      <AnimatePresence>
        {showSidebar && (
          <motion.div
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="w-64 bg-base-100/30 backdrop-blur-md rounded-xl border border-base-300/30 hidden md:block"
          >
            <div className="p-4 space-y-4">
              <button className="btn btn-sm btn-primary w-full">
                <MessageSquare size={16} className="mr-2" />
                New Chat
              </button>
              <div className="divider my-2" />
              <div className="space-y-1">
                <button className="btn btn-ghost btn-sm justify-start w-full">
                  History
                </button>
                <button className="btn btn-ghost btn-sm justify-start w-full">
                  Settings
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Area */}
      <motion.div 
        className="flex-1 flex flex-col bg-base-100/20 backdrop-blur-md rounded-xl border border-base-300/30 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="h-full flex flex-col items-center justify-center text-center p-8"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-4">
                <Bot size={32} className="text-primary" />
              </div>
              <h2 className="text-xl font-semibold mb-2">How can I help you today?</h2>
              <p className="text-base-content/70 mb-6 max-w-md">
                Ask me anything or try one of these examples:
              </p>
              <div className="grid grid-cols-2 gap-2 max-w-sm w-full">
                {["Explain quantum", "Debug code", "Write poem", "Analyze data"].map((text) => (
                  <button 
                    key={text}
                    className="btn btn-ghost btn-sm normal-case text-xs"
                    onClick={() => setInput(text)}
                  >
                    {text}
                  </button>
                ))}
              </div>
            </motion.div>
          ) : (
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] rounded-xl p-3 ${
                    message.sender === 'user' 
                      ? 'bg-primary/10 border border-primary/20' 
                      : 'bg-base-200/50 border border-base-300/20'
                  }`}>
                    <div className="flex items-center gap-2 mb-1">
                      {message.sender === 'bot' ? (
                        <Bot size={14} className="text-primary" />
                      ) : (
                        <User size={14} className="text-secondary" />
                      )}
                      <span className="text-xs font-medium">
                        {message.sender === 'bot' ? 'Gemini' : 'You'}
                      </span>
                    </div>
                    <div className="text-sm">
                      {message.text}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-base-300/20">
          <div className="relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Message Gemini..."
              rows={1}
              className="textarea w-full pr-16 bg-base-100/50 backdrop-blur-sm border border-base-300/30 focus:border-primary/50"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className="absolute right-2 bottom-2 btn btn-sm btn-primary btn-circle"
            >
              <Send size={16} />
            </button>
          </div>
          <div className="text-xs text-center mt-2 text-base-content/50">
            Gemini may produce inaccurate information
          </div>
        </div>
      </motion.div>
    </div>
  </div>
</div>
  );
};

export default ChatBot;