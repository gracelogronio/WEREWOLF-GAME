        let adminLoggedIn = false;
        let gameCode = "";
        let players = []; // Array to store player information
        let messages = []; // Array to store messages
        
        document.addEventListener("DOMContentLoaded", function() {
            const urlParams = new URLSearchParams(window.location.search);
        
            // Check if game code exists in URL (implies joining)
            const gameCodeFromURL = urlParams.get('code');
            if (gameCodeFromURL) {
                showJoinScreen();
                document.getElementById('joinCode').value = gameCodeFromURL;
            } else {
                showLobbyScreen();
            }
        });
        
        function showAdminScreen() {
            document.getElementById('adminScreen').classList.remove('hidden');
            document.getElementById('joinScreen').classList.add('hidden');
            document.getElementById('gameScreen').classList.add('hidden');
        }
        
        function showJoinScreen() {
            document.getElementById('joinScreen').classList.remove('hidden');
            document.getElementById('adminScreen').classList.add('hidden');
            document.getElementById('gameScreen').classList.add('hidden');
        }
        
        function showLobbyScreen() {
            document.getElementById('adminScreen').classList.add('hidden');
            document.getElementById('joinScreen').classList.add('hidden');
            document.getElementById('gameScreen').classList.add('hidden');
        }
        
        function loginAsAdmin() {
            const adminName = document.getElementById('adminName').value.trim();
        
            if (adminName) {
                adminLoggedIn = true;
                showJoinScreen();
                generateGameCode(); // Generate game code when admin logs in
        
                // Display game code to the host
                document.getElementById('gameCode').textContent = gameCode;
                document.getElementById('gameCodeDisplay').classList.remove('hidden');
        
                // Automatically fill in the join code for the host
                document.getElementById('joinCode').value = gameCode;
        
                // Update URL to include host action
                history.pushState({}, '', `?code=${gameCode}`);
            } else {
                alert("Ilagay ang pangalan.");
            }
        }
        
        function joinGame() {
            const enteredCode = document.getElementById('joinCode').value.trim();
        
            if (enteredCode === gameCode) {
                console.log("Sumasali:", enteredCode);
                addPlayer(); // Add player to the game
                if (players.length >= 5) {
                    showGameScreen();
                    document.getElementById('backgroundMusic').play(); // Play background music
                } else {
                    alert("Naghahantay pa sa ibang manlalaro. 5 manlalaro ang kailangan.");
                }
            } else {
                alert("Invalid ang game code.");
            }
        }
        
        function showGameScreen() {
            document.getElementById('gameScreen').classList.remove('hidden');
            document.getElementById('adminScreen').classList.add('hidden');
            document.getElementById('joinScreen').classList.add('hidden');
        
            // Initialize messaging UI
            displayMessages();
            document.getElementById('messageForm').addEventListener('submit', function(event) {
                event.preventDefault();
                const messageInput = document.getElementById('messageInput');
                const message = messageInput.value.trim();
                if (message) {
                    sendMessage(message);
                    messageInput.value = ''; // Clear input after sending message
                }
            });
        }
        
        function generateGameCode() {
            // Replace with your code generation logic
            gameCode = generateRandomCode(); // Example function to generate a random code
            console.log("Generated Game Code:", gameCode);
            // Display the generated game code
            document.getElementById('gameCode').textContent = gameCode;
            document.getElementById('gameCodeDisplay').classList.remove('hidden');
        }
        
        function addPlayer() {
            // Example: Add player to the players array
            const playerName = "Player" + (players.length + 1); // Replace with actual player name input if needed
            players.push({ name: playerName, role: "", cardImage: "" });
            assignRoles(players); // Assign roles once player joins
            displayPlayerCards(); // Display player cards after joining
        }
        
        // Function to generate a random 6-digit alphanumeric code
        function generateRandomCode() {
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            let code = '';
            for (let i = 0; i < 6; i++) {
                const randomIndex = Math.floor(Math.random() * characters.length);
                code += characters[randomIndex];
            }
            return code;
        }
        
        // Function to assign roles randomly to players
        function assignRoles(players) {
            const roles = [
                { name: "MAMAMAYAN", image: "BABAE.png" },
                { name: "MAMAMAYAN", image: "LALAKI.png" },
                { name: "MAHARLIKA", image: "MAHARLIKA.png" },
                { name: "MAHARLIKA", image: "MAHARLIKA(2).png" },
                { name: "BABAYLAN", image: "BABAYLAN(1).png" },
                { name: "BABAYLAN", image: "BABAYLAN(2).png" },
                { name: "MANANANGGAL", image: "MANANANGGAL.png" },
                { name: "TIYANAK", image: "TIYANAK.png" },
                { name: "SIYOKOY", image: "SIYOKOY.png" },
                // Add more roles as needed
            ];
        
            shuffleArray(roles); // Shuffle roles
        
            for (let i = 0; i < players.length; i++) {
                const role = roles[i % roles.length]; // Assign roles in a loop
                players[i].role = role.name;
                players[i].cardImage = role.image;
            }
        }
        
        // Function to shuffle array (Fisher-Yates shuffle algorithm)
        function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
        }
        
        // Function to display player cards with roles
        function displayPlayerCards() {
            const playerCardsContainer = document.getElementById('playerCards');
            playerCardsContainer.innerHTML = ''; // Clear previous cards
        
            players.forEach(player => {
                const playerCard = document.createElement('div');
                playerCard.classList.add('player-card');
                playerCard.innerHTML = `
                    <img src="${player.cardImage}" alt="${player.role}">
                    <p>${player.name}</p>
                    <p>${player.role}</p>
                `;
                playerCardsContainer.appendChild(playerCard);
            });
        }
        
        // Function to send message
        function sendMessage(message) {
            const playerName = "You"; // For simplicity, assume the player is sending the message
            const messageObj = { sender: playerName, content: message };
            messages.push(messageObj);
            displayMessages();
        }
        
        // Function to display messages
        function displayMessages() {
            const inboxElement = document.getElementById('inbox');
            inboxElement.innerHTML = '<h3>Inbox</h3>'; // Clear previous messages
        
            messages.forEach(message => {
                const messageElement = document.createElement('div');
                messageElement.classList.add('message');
                messageElement.innerHTML = `
                    <strong>${message.sender}:</strong> ${message.content}
                `;
                inboxElement.appendChild(messageElement);
                });
        }
