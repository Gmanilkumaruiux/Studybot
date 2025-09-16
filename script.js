    document.addEventListener('DOMContentLoaded', () => {
  // Correctly select elements using their new IDs
  const chatBody = document.getElementById('chat-body');
  const userInput = document.getElementById('user-input');
  const sendBtn = document.getElementById('send-btn');
  const closeBtn = document.getElementById('close-btn');
  const chatbotContainer = document.getElementById('chatbot'); // Select the main container

  const faqData = [
    {
      question: "Hello",
      answer: "Heyy I'm your studybot How Can I help you."
    },
    {
      question: "Hey",
      answer: "I'm your studybot How Can I help you."
    },
    {
      question: "Hi",
      answer: "Hello How can I assist you Today."
    },
    {
      question: "Courses",
      answer: "We offer a wide range of courses, including DevOps, Frontend, Backend, and SQL. Visit our website to explore more."
    },
    {
      question: "Roadmaps",
      answer: "We offer a wide range of Roadmaps, including DevOps, Frontend, Backend,python,java and SQL. Visit our website to explore more."
    },
    {
      question: "Placements",
      answer: "We provide comprehensive placement guidance, including aptitude preparation, reasoning practice, and interview-focused questions."
    },
     {
      question: "Guidence",
      answer: "We provide comprehensive placement guidance, including aptitude preparation, reasoning practice, and interview-focused questions."
    },
    {
      question: "Can i download roadmaps",
      answer: "Yes, absolutely! You can download our roadmaps and study materials directly from our website."
    },
    {
      question: "contact",
      answer: "You can reach our Technical Support team directly via email."
    },
    // Add more FAQs here
  ];
    
  // **FIX 4: Updated function to generate HTML that matches styles.css**
  function addMessage(content, isUser = false) {
    const messageWrapper = document.createElement('div');
    // Use the class names from your styles.css file
    messageWrapper.className = isUser ? 'user-message' : 'bot-message';

    const messageContent = `
        <div class="icon">${isUser ? 'Y' : 'B'}</div>
        <div class="message">${content}</div>
    `;
    
    messageWrapper.innerHTML = messageContent;
    chatBody.appendChild(messageWrapper);
    chatBody.scrollTop = chatBody.scrollHeight; // Auto-scroll to the latest message
  }

  function showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.id = 'typing-indicator';
    typingDiv.className = 'bot-message'; // Use the same class for styling
    typingDiv.innerHTML = `
        <div class="icon">B</div>
        <div class="message">Typing...</div>
    `;
    chatBody.appendChild(typingDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  function removeTypingIndicator() {
    const indicator = document.getElementById('typing-indicator');
    if (indicator) {
      indicator.remove();
    }
  }

  function findAnswer(question) {
    return new Promise((resolve) => {
      // Simulate network delay for a realistic feel
      setTimeout(() => {
        // A simple keyword matching logic
        const questionLower = question.toLowerCase();
        let bestMatch = null;
        let highestScore = 0;

        faqData.forEach(item => {
            const score = item.question.toLowerCase().split(' ').filter(word => questionLower.includes(word)).length;
            if (score > highestScore) {
                highestScore = score;
                bestMatch = item;
            }
        });

        resolve(bestMatch ? bestMatch.answer : "I'm sorry, I don't have information on that. Could you try asking in a different way?");
      }, 1000 + Math.random() * 500); // Response time between 1s and 1.5s
    });
  }

  async function handleSendMessage() {
    const messageText = userInput.value.trim();
    if (!messageText) return;

    addMessage(messageText, true);
    userInput.value = ''; // Clear input field immediately

    showTypingIndicator();

    const botResponse = await findAnswer(messageText);
    
    removeTypingIndicator();
    addMessage(botResponse, false);
  }

  // --- WIRING UP THE EVENT LISTENERS ---

  // **FIX 1: Make the Send Button work**
  sendBtn.addEventListener('click', handleSendMessage);

  // **FIX 2: Make the Enter key work**
  userInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevents the default action (like form submission)
      handleSendMessage();
    }
  });

  // **FIX 3: Make the Close Button work**
  closeBtn.addEventListener('click', () => {
    chatbotContainer.style.display = 'none';
  });
});
