document.addEventListener('DOMContentLoaded', () => {
    const chatArea = document.getElementById('chatArea');
    const input = document.getElementById('nextMessage');
    const sendBtn = document.getElementById('sendBtn');

    function createMessage(text, isSender = true) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isSender ? 'bubble-blue sender' : 'bubble-purple'} glide-in`;
        
        // Random drift class
        const driftIndex = Math.floor(Math.random() * 3) + 1;
        messageDiv.classList.add(`drift-${driftIndex}`);

        messageDiv.innerHTML = `<div class="bubble-content">${text}</div>`;
        
        // Interaction effect: push other bubbles
        const currentMessages = chatArea.querySelectorAll('.message');
        currentMessages.forEach(msg => {
            const rect = msg.getBoundingClientRect();
            // Subtle shift
            msg.style.transform = `translateY(-10px) scale(0.98)`;
            setTimeout(() => {
                msg.style.transform = '';
            }, 500);
        });

        chatArea.appendChild(messageDiv);
        
        // Scroll to bottom
        chatArea.scrollTo({
            top: chatArea.scrollHeight,
            behavior: 'smooth'
        });
    }

    function handleSendMessage() {
        const text = input.value.trim();
        if (text) {
            createMessage(text, true);
            input.value = '';
            
            // Update XP
            const xpBar = document.getElementById('xpProgress');
            let currentWidth = parseFloat(xpBar.style.width);
            if (currentWidth < 95) {
                currentWidth += 5;
                xpBar.style.width = currentWidth + '%';
            }

            // Simulate reply
            setTimeout(() => {
                const replies = [
                    "Coordinates received. Proceeding to warp speed.",
                    "The dark matter density is increasing. Stay alert!",
                    "Visual contact confirmed. It's beautiful.",
                    "Ready for orbital insertion."
                ];
                const randomReply = replies[Math.floor(Math.random() * replies.length)];
                createMessage(randomReply, false);
            }, 1500);
        }
    }

    sendBtn.addEventListener('click', handleSendMessage);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSendMessage();
    });

    // Initial message interactions
    const initialMessages = chatArea.querySelectorAll('.message');
    initialMessages.forEach((msg, index) => {
        msg.style.animationDelay = `${index * 0.2}s`;
    });
});
