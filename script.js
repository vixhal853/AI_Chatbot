const chatBox = document.getElementById("chat-box");
const chatForm = document.getElementById("chat-form");
const userInput = document.getElementById("user-input");

const responses = [
  // Greetings
  {
    keywords: ["hello", "hi", "hey", "greetings"],
    reply: () => [
      "Hi there! What brings you here today?",
      "Hello! How can I assist you?",
      "Hey! Ask me anything; I'm here to help."
    ][Math.floor(Math.random() * 3)]
  },
  // Technology
  {
    keywords: ["ai", "machine learning", "gpt", "robot"],
    reply: () => [
      "AI stands for Artificial Intelligence, which enables machines to learn and adapt.",
      "Machine learning is a subset of AI that focuses on data-driven learning.",
      "GPT models are trained on diverse internet text to generate human-like language."
    ][Math.floor(Math.random() * 3)]
  },
  // Science
  {
    keywords: ["gravity", "atoms", "biology", "physics"],
    reply: () => [
      "Gravity is the force that attracts two bodies towards each other.",
      "Atoms are the fundamental building blocks of matter.",
      "Physics explores the laws of nature, from particles to galaxies."
    ][Math.floor(Math.random() * 3)]
  },
  // Math
  {
    keywords: ["pi", "equation", "integral", "math", "derivative"],
    reply: () => [
      "Pi is roughly 3.14159, representing the ratio of a circle’s circumference to its diameter.",
      "Mathematics helps us understand patterns and solve complex problems.",
      "Integrals measure areas under curves while derivatives measure rate of change."
    ][Math.floor(Math.random() * 3)]
  },
  // Philosophy
  {
    keywords: ["life", "meaning", "purpose", "exist"],
    reply: () => [
      "Life’s meaning is a deeply personal journey—what does it mean to you?",
      "Philosophers often debate whether purpose is self-created or universal.",
      "Existence invites us to explore both our inner and outer worlds."
    ][Math.floor(Math.random() * 3)]
  },
  // Humor
  {
    keywords: ["joke", "funny", "laugh"],
    reply: () => [
      "Why don’t scientists trust atoms? Because they make up everything!",
      "I would tell you a UDP joke, but you might not get it.",
      "Why did the programmer quit his job? Because he didn't get arrays."
    ][Math.floor(Math.random() * 3)]
  },
  // Food
  {
    keywords: ["pizza", "food", "recipe", "cook"],
    reply: () => [
      "Pizza is delicious! What toppings do you like?",
      "Cooking is like creating magic with ingredients.",
      "If you want recipe ideas, just ask!"
    ][Math.floor(Math.random() * 3)]
  },
  // Weather
  {
    keywords: ["weather", "sunny", "rain", "forecast"],
    reply: () => [
      "I can't check the real-time weather, but hope it's nice where you are!",
      "Rain or shine, every day is a new adventure.",
      "Don’t forget your umbrella if it looks cloudy!"
    ][Math.floor(Math.random() * 3)]
  },
  // Sports
  {
    keywords: ["football", "soccer", "olympics", "game"],
    reply: () => [
      "Football is loved by millions worldwide.",
      "The Olympics bring together diverse athletes and cultures.",
      "Competitive games inspire teamwork and sportsmanship."
    ][Math.floor(Math.random() * 3)]
  },
  // Pop culture
  {
    keywords: ["movie", "music", "star wars", "bingewatch"],
    reply: () => [
      "Movies transport us to different worlds—any favorites?",
      "Music connects us emotionally and culturally.",
      "Star Wars has a rich universe spanning decades!"
    ][Math.floor(Math.random() * 3)]
  },
  // Help and support
  {
    keywords: ["help", "support", "faq", "problem"],
    reply: () => [
      "I'm here to help! What's your question?",
      "Feel free to ask anything you need assistance with.",
      "Tell me more so I can assist you better."
    ][Math.floor(Math.random() * 3)]
  },
  // Definitions
  {
    keywords: ["define", "what is", "meaning of"],
    reply: () => [
      "Tell me the term you'd like defined.",
      "I'd be happy to help with definitions. What word interests you?",
      "Understanding starts with clear definitions—what are you curious about?"
    ][Math.floor(Math.random() * 3)]
  },
  // Time and date
  {
    keywords: ["time", "date", "day", "month"],
    reply: () => [
      `According to me, it's always chatbot time, but your local clock says ${new Date().toLocaleTimeString()}.`,
      `Today is ${new Date().toLocaleDateString()}. Time flies, doesn't it?`,
      "Time is a construct, but I'm here whenever you need!"
    ][Math.floor(Math.random() * 3)]
  },
  // Advice
  {
    keywords: ["advice", "tip", "suggestion", "recommend"],
    reply: () => [
      "My best advice? Always keep learning and stay curious.",
      "Sometimes a short break helps freshen up the mind.",
      "Listening actively usually helps improve communication."
    ][Math.floor(Math.random() * 3)]
  },
  // Programming
  {
    keywords:["code", "programming", "javascript", "python", "algorithm"],
    reply: () => [
      "Programming is both an art and a science—you get to build cool things!",
      "JavaScript runs in browsers, while Python is great for data and AI.",
      "Algorithms solve problems efficiently—an essential skill in coding."
    ][Math.floor(Math.random() * 3)]
  },
  // Travel
  {
    keywords:["travel", "trip", "vacation", "holiday"],
    reply: () => [
      "Travel expands your horizons! Any dream destinations?",
      "Planning ahead is key to a great vacation.",
      "Exploring new cultures is one of life’s greatest joys."
    ][Math.floor(Math.random() * 3)]
  },
  // Fallback generic responses
  {
    keywords: [],
    reply: user =>
      [
        `That's interesting—tell me more about "${user}"!`,
        "I’d love to understand better. Could you clarify?",
        "Great point, can you explain further?",
        "Hmm, I'm still learning. Can you ask differently?"
      ][Math.floor(Math.random() * 4)]
  }
];

function findResponse(message, userMsgRaw) {
  const lowerMessage = message.toLowerCase();
  for(const r of responses) {
    if(r.keywords.some(kw => lowerMessage.includes(kw))) {
      return typeof r.reply === "function" ? r.reply(userMsgRaw) : r.reply;
    }
  }
  return responses[responses.length-1].reply(userMsgRaw);
}

function addMsg(content, sender) {
  const msgDiv = document.createElement('div');
  msgDiv.className = `chat-message ${sender}`;
  msgDiv.textContent = content;
  chatBox.appendChild(msgDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

chatForm.addEventListener("submit", e => {
  e.preventDefault();
  const msg = userInput.value.trim();
  if(!msg) return;
  addMsg(msg, "user");
  userInput.value = "";
  setTimeout(() => {
    addMsg(findResponse(msg, msg), "bot");
  }, 600);
});

window.onload = () => {
  addMsg("Hello! I'm your LLM-mimic chatbot. Ask me anything.", "bot");
};
