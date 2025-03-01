document.addEventListener('DOMContentLoaded', function() {
    const noButton = document.getElementById("no");
    const yesButton = document.getElementById("yes");
    const messageBox = document.getElementById("message-box");
    const shareBox = document.querySelector(".share-box");
    const container = document.querySelector(".container");
    const emojiContainer = document.querySelector(".emoji-container");
    const confettiContainer = document.querySelector(".confetti-container");
    
    // Check if device is mobile
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    // Adjust particle density based on device
    const particleCount = isMobile ? 30 : 80;
    
    // Initialize particles.js with responsive settings
    if (typeof particlesJS !== 'undefined') {
        particlesJS("particles-js", {
            "particles": {
                "number": {
                    "value": particleCount,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#ffffff"
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 5
                    }
                },
                "opacity": {
                    "value": 0.3,
                    "random": true,
                    "anim": {
                        "enable": false,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 4,
                    "random": true,
                    "anim": {
                        "enable": false,
                        "speed": 40,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#ffffff",
                    "opacity": 0.2,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": isMobile ? 1 : 2,
                    "direction": "none",
                    "random": true,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": !isMobile,
                        "mode": "bubble"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 140,
                        "line_linked": {
                            "opacity": 1
                        }
                    },
                    "bubble": {
                        "distance": 100,
                        "size": 5,
                        "duration": 2,
                        "opacity": 8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 200,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true
        });
    }

    // Make sure message box is hidden on page load
    messageBox.classList.add("hidden");
    messageBox.style.display = "none";

    // Track No button evasion count
    let noButtonEvadeCount = 0;
    
    // Adjust evasion behavior based on device
    const handleNoButtonEvasion = (event) => {
        // For touch devices, prevent default to avoid scrolling
        if (event.type === 'touchstart') {
            event.preventDefault();
        }
        
        noButtonEvadeCount++;
        
        // Make the movement more erratic as user tries more times
        const speed = Math.min(noButtonEvadeCount * 50, 400);
        
        // Calculate new position with boundaries
        const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
        const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
        
        const buttonWidth = noButton.offsetWidth;
        const buttonHeight = noButton.offsetHeight;
        
        const maxX = viewportWidth - buttonWidth - 20;
        const maxY = viewportHeight - buttonHeight - 20;
        
        let newX = Math.random() * maxX;
        let newY = Math.random() * maxY;
        
        // Keep button fully on screen
        newX = Math.max(20, Math.min(newX, maxX));
        newY = Math.max(20, Math.min(newY, maxY));
        
        // Apply smooth movement with transition
        noButton.style.position = "fixed"; // Changed from absolute to fixed for better positioning
        noButton.style.transition = `all ${0.2 + Math.random() * 0.3}s ease-out`;
        noButton.style.left = `${newX}px`;
        noButton.style.top = `${newY}px`;
        noButton.style.zIndex = "50"; // Ensure it stays above other elements
        
        // Make the Yes button more prominent
        yesButton.style.transform = 'scale(1.1)';
        setTimeout(() => {
            yesButton.style.transform = 'scale(1)';
        }, 300);
        
        // If they've tried more than 3 times, show encouraging messages
        if (noButtonEvadeCount >= 3) {
            const messages = [
                "You know it's true! 🐴",
                "Stop denying it! 😂",
                "The truth hurts, doesn't it?",
                "Sabine = 🐴, just admit it!",
                "We all know Sabine is a donkey!",
                "Why are you defending a donkey?",
                "This button won't let you lie!"
            ];
            
            // Create and show a floating message
            const messageIdx = Math.min(noButtonEvadeCount - 3, messages.length - 1);
            showFloatingMessage(messages[messageIdx]);
        }
    };
    
    // Add different event listeners based on device type
    if (isMobile) {
        noButton.addEventListener("touchstart", handleNoButtonEvasion, { passive: false });
    } else {
        noButton.addEventListener("mouseover", handleNoButtonEvasion);
    }

    // Show message when clicking "Yes"
    const handleYesClick = (event) => {
        // For touch devices, prevent default to avoid double actions
        if (event.type === 'touchstart') {
            event.preventDefault();
        }
        
        // Hide the main container
        container.style.opacity = "0";
        container.style.transform = "scale(0.8)";
        container.style.pointerEvents = "none"; // Prevent interactions with hidden container
        
        // Show celebration
        setTimeout(() => {
            messageBox.classList.remove("hidden");
            messageBox.style.display = "flex";
            createConfetti();
            createBurstEmojis();
            
            // Scroll to top if needed on mobile
            if (isMobile) {
                window.scrollTo({top: 0, behavior: 'smooth'});
            }
        }, 300);
        
        // Add sound if browser allows
        try {
            const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-cartoon-positive-sound-2255.mp3');
            audio.volume = 0.5;
            audio.play().catch(e => console.log("Audio play prevented by browser policy"));
        } catch (e) {
            console.log("Browser blocked audio autoplay");
        }
    };
    
    // Add event listeners for yes button
    yesButton.addEventListener("click", handleYesClick);
    if (isMobile) {
        yesButton.addEventListener("touchstart", handleYesClick, { passive: false });
    }

    // Try to click the No button (make it harder to click)
    const handleNoClick = (event) => {
        // For touch devices, prevent default
        if (event.type === 'touchstart') {
            event.preventDefault();
        }
        
        // 95% chance the click doesn't work
        if (Math.random() < 0.95) {
            // Move the button
            const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
            const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
            
            const buttonWidth = noButton.offsetWidth;
            const buttonHeight = noButton.offsetHeight;
            
            const x = Math.random() * (viewportWidth - buttonWidth - 50);
            const y = Math.random() * (viewportHeight - buttonHeight - 50);
            
            noButton.style.position = "fixed";
            noButton.style.left = `${x}px`;
            noButton.style.top = `${y}px`;
            
            showFloatingMessage("Nice try! You can't deny it! 🐴");
            return false;
        }
    };
    
    // Add event listeners for no button click
    noButton.addEventListener("click", handleNoClick);
    if (isMobile) {
        noButton.addEventListener("touchstart", handleNoClick, { passive: false });
    }

    // Share box features
    if (shareBox) {
        const handleShareClick = (event) => {
            // For touch devices, prevent default
            if (event.type === 'touchstart') {
                event.preventDefault();
            }
            
            // Create a fun surprise
            createEmojiExplosion();
            
            // Change message text
            const messageText = messageBox.querySelector("p");
            const donkeyFacts = [
                "Sabine's donkey status is now official! 🏆",
                "Now everyone will know Sabine is a donkey! 📢",
                "Sabine has earned her donkey certification! 🎓",
                "Sabine: 10% human, 90% donkey! 🐴",
                "Breaking news: Sabine identified as donkey! 📰"
            ];
            messageText.textContent = donkeyFacts[Math.floor(Math.random() * donkeyFacts.length)];
            
            // Try to share on supported devices
            if (navigator.share && isMobile) {
                try {
                    navigator.share({
                        title: 'Sabine is a Donkey!',
                        text: 'BREAKING NEWS: Sabine has been officially identified as a donkey! 🐴',
                        url: window.location.href
                    }).catch(err => console.log('Sharing failed', err));
                } catch (err) {
                    console.log('Share not supported', err);
                }
            }
            
            // Add donkey braying sound if browser allows
            try {
                const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-funny-cartoon-tones-2255.mp3');
                audio.volume = 0.5;
                audio.play().catch(e => console.log("Audio play prevented by browser policy"));
            } catch (e) {
                console.log("Browser blocked audio autoplay");
            }
        };
        
        // Add event listeners for share box
        shareBox.addEventListener("click", handleShareClick);
        if (isMobile) {
            shareBox.addEventListener("touchstart", handleShareClick, { passive: false });
        }
    }

    // Generate Floating Emojis background - reduced for mobile
    function createEmoji() {
        const emoji = document.createElement("div");
        const emojiTypes = ["🐴", "🐎", "🐄", "🐮", "🧠", "❓", "😂"];
        emoji.innerHTML = emojiTypes[Math.floor(Math.random() * emojiTypes.length)];
        emoji.classList.add("emoji");
        emoji.style.left = Math.random() * 100 + "vw";
        emoji.style.animationDuration = Math.random() * 3 + 3 + "s"; // Random speed
        emoji.style.fontSize = Math.random() * 15 + 15 + "px"; // Random size

        emojiContainer.appendChild(emoji);

        setTimeout(() => {
            emoji.remove();
        }, 6000);
    }

    // Start creating emojis - fewer for mobile
    const emojiInterval = setInterval(createEmoji, isMobile ? 500 : 300);
    
    // Clear interval when page is not visible to save resources
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            clearInterval(emojiInterval);
        } else {
            setInterval(createEmoji, isMobile ? 500 : 300);
        }
    });

    // Burst Emojis when clicking "Yes" - adjusted for device
    function createBurstEmojis() {
        const burstCount = isMobile ? 20 : 30;
        
        for (let i = 0; i < burstCount; i++) {
            setTimeout(() => {
                const emoji = document.createElement("div");
                const emojiTypes = ["🐴", "🐎", "🐄", "🧠", "😂", "🤣", "🐴"];
                emoji.innerHTML = emojiTypes[Math.floor(Math.random() * emojiTypes.length)];
                emoji.classList.add("emoji");
                emoji.style.left = `${50 + (Math.random() - 0.5) * 60}vw`; // Random spread near center
                emoji.style.top = `${50 + (Math.random() - 0.5) * 60}vh`;
                emoji.style.animationDuration = Math.random() * 3 + 2 + "s";
                emoji.style.fontSize = Math.random() * 25 + 25 + "px"; // Bigger for celebration

                emojiContainer.appendChild(emoji);

                setTimeout(() => {
                    emoji.remove();
                }, 5000);
            }, i * 100);
        }
    }

    // Create confetti for celebration - adjusted for device performance
    function createConfetti() {
        const colors = ['#a18cd1', '#fbc2eb', '#8a5fff', '#fad0c4', '#ffecd2', '#a6c0fe'];
        const confettiCount = isMobile ? 50 : 100;
        
        for (let i = 0; i < confettiCount; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.classList.add('confetti');
                confetti.style.left = `${Math.random() * 100}vw`;
                confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.width = `${Math.random() * 10 + 5}px`;
                confetti.style.height = `${Math.random() * 10 + 5}px`;
                confetti.style.opacity = Math.random();
                confetti.style.animationDuration = `${Math.random() * 3 + 2}s`;
                confetti.style.animationDelay = `${Math.random() * 2}s`;
                
                // Random shapes for confetti
                const shapes = ['circle', 'square', 'triangle'];
                const shape = shapes[Math.floor(Math.random() * shapes.length)];
                
                switch (shape) {
                    case 'circle':
                        confetti.style.borderRadius = '50%';
                        break;
                    case 'square':
                        // No additional styling needed
                        break;
                    case 'triangle':
                        confetti.style.width = '0';
                        confetti.style.height = '0';
                        confetti.style.borderLeft = `${Math.random() * 5 + 5}px solid transparent`;
                        confetti.style.borderRight = `${Math.random() * 5 + 5}px solid transparent`;
                        confetti.style.borderBottom = `${Math.random() * 10 + 10}px solid ${colors[Math.floor(Math.random() * colors.length)]}`;
                        confetti.style.background = 'transparent';
                        break;
                }
                
                if (confettiContainer) {
                    confettiContainer.appendChild(confetti);
                } else {
                    document.body.appendChild(confetti);
                }
                
                setTimeout(() => {
                    confetti.remove();
                }, 5000);
            }, i * 50);
        }
    }

    // Create emoji explosion effect - adjusted for device
    function createEmojiExplosion() {
        const totalEmojis = isMobile ? 80 : 150;
        const emojiTypes = ["🐴", "🐎", "🐄", "🧠", "😂", "🤣", "🐴"];
        
        for (let i = 0; i < totalEmojis; i++) {
            setTimeout(() => {
                const emoji = document.createElement("div");
                emoji.innerHTML = emojiTypes[Math.floor(Math.random() * emojiTypes.length)];
                emoji.style.position = "fixed"; // Changed to fixed for better positioning
                emoji.style.fontSize = `${Math.random() * 30 + 10}px`;
                emoji.style.zIndex = "200";
                
                // Calculate position - start from center of message box
                const boxRect = messageBox.getBoundingClientRect();
                const centerX = boxRect.left + boxRect.width / 2;
                const centerY = boxRect.top + boxRect.height / 2;
                
                // Random angle and distance
                const angle = Math.random() * Math.PI * 2; // 0 to 2π
                const distance = Math.random() * 150 + 50; // 50-200px
                
                const posX = centerX + Math.cos(angle) * distance;
                const posY = centerY + Math.sin(angle) * distance;
                
                emoji.style.left = `${posX}px`;
                emoji.style.top = `${posY}px`;
                
                // Add animation
                emoji.style.transition = `all ${Math.random() * 1 + 1}s cubic-bezier(0.165, 0.84, 0.44, 1)`;
                emoji.style.opacity = "0";
                
                document.body.appendChild(emoji);
                
                // Animate after a tiny delay to ensure transition works
                setTimeout(() => {
                    emoji.style.transform = `translate(${(Math.random() - 0.5) * 200}px, ${(Math.random() - 0.5) * 200}px) rotate(${Math.random() * 360}deg)`;
                    emoji.style.opacity = "0";
                }, 10);
                
                setTimeout(() => {
                    emoji.remove();
                }, 2000);
            }, i * 10);
        }
    }

    // Show floating message - adjusted for responsive design
    function showFloatingMessage(text) {
        const message = document.createElement("div");
        message.textContent = text;
        message.style.position = "fixed"; // Changed to fixed for better positioning
        message.style.color = "#7d55c7";
        message.style.fontWeight = "bold";
        message.style.fontSize = isMobile ? "16px" : "20px";
        message.style.padding = "10px 20px";
        message.style.background = "rgba(255, 255, 255, 0.9)";
        message.style.borderRadius = "20px";
        message.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.15)";
        message.style.zIndex = "50";
        message.style.maxWidth = "80%";
        message.style.textAlign = "center";
        
        // Position near the no button or in center for mobile
        const noRect = noButton.getBoundingClientRect();
        
        if (isMobile) {
            // For mobile, position in center bottom
            message.style.left = "50%";
            message.style.bottom = "10%";
            message.style.transform = "translateX(-50%)";
        } else {
            message.style.left = `${noRect.left}px`;
            message.style.top = `${noRect.top - 50}px`;
        }
        
        // Add to body
        document.body.appendChild(message);
        
        // Animate in
        message.style.transition = "all 0.5s ease-in-out";
        message.style.opacity = "0";
        message.style.transform = isMobile ? "translate(-50%, 20px)" : "translateY(20px)";
        
        setTimeout(() => {
            message.style.opacity = "1";
            message.style.transform = isMobile ? "translate(-50%, 0)" : "translateY(0)";
        }, 10);
        
        // Remove after a delay
        setTimeout(() => {
            message.style.opacity = "0";
            message.style.transform = isMobile ? "translate(-50%, -20px)" : "translateY(-20px)";
            
            setTimeout(() => {
                message.remove();
            }, 500);
        }, 2000);
    }
    
    // Handle orientation change
    window.addEventListener('orientationchange', function() {
        // Fix for iOS Safari height issues
        const viewportHeight = window.innerHeight;
        document.documentElement.style.height = `${viewportHeight}px`;
        
        // Reset no button position after orientation change
        setTimeout(() => {
            noButton.style.position = "relative";
            noButton.style.left = "auto";
            noButton.style.top = "auto";
        }, 100);
    });
    
    // Apply iOS height fix on load
    if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        const viewportHeight = window.innerHeight;
        document.documentElement.style.height = `${viewportHeight}px`;
    }
});