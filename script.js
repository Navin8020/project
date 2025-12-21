// Toast Notification System
function showToast(message, type = 'info', title = '') {
    const toastContainer = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icons = {
        success: '✓',
        error: '✕',
        warning: '⚠',
        info: 'ℹ'
    };
    
    const defaultTitles = {
        success: 'Success',
        error: 'Error',
        warning: 'Warning',
        info: 'Info'
    };
    
    toast.innerHTML = `
        <span class="toast-icon">${icons[type] || icons.info}</span>
        <div class="toast-content">
            ${title ? `<div class="toast-title">${title}</div>` : ''}
            <div class="toast-message">${message}</div>
        </div>
        <button class="toast-close" onclick="this.parentElement.remove()">&times;</button>
    `;
    
    toastContainer.appendChild(toast);
    
    // Auto remove after 4 seconds
    setTimeout(() => {
        toast.classList.add('hiding');
        setTimeout(() => {
            if (toast.parentElement) {
                toast.remove();
            }
        }, 300);
    }, 4000);
}

// Check if user is already logged in
function checkAuthStatus() {
    const isAuthenticated = localStorage.getItem('thunder_authenticated');
    if (isAuthenticated === 'true') {
        showMainContent(false); // false = don't show welcome toast on page load
    } else {
        showAuthModal();
    }
}

// Show authentication modal
function showAuthModal() {
    const modal = document.getElementById('authModal');
    const mainWrapper = document.getElementById('mainWrapper');
    
    if (!modal || !mainWrapper) {
        console.error('Modal or main wrapper not found');
        return;
    }
    
    modal.classList.add('active', 'initial-login');
    modal.classList.remove('hidden');
    modal.style.display = 'flex';
    modal.style.opacity = '1';
    
    mainWrapper.classList.remove('authenticated');
    mainWrapper.style.display = 'none';
    document.body.style.overflow = 'hidden';
}

// Show main content after authentication
function showMainContent(showWelcomeToast = true) {
    const modal = document.getElementById('authModal');
    const mainWrapper = document.getElementById('mainWrapper');
    
    if (!modal || !mainWrapper) {
        console.error('Modal or main wrapper not found');
        return;
    }
    
    // Smooth transition
    modal.style.transition = 'opacity 0.3s ease';
    modal.style.opacity = '0';
    
    setTimeout(() => {
        // Hide modal completely
        modal.classList.add('hidden');
        modal.classList.remove('active', 'initial-login');
        modal.style.display = 'none';
        
        // Show main wrapper
        mainWrapper.classList.add('authenticated');
        mainWrapper.style.display = 'block';
        
        document.body.style.overflow = 'auto';
        localStorage.setItem('thunder_authenticated', 'true');
        updateNavLoginText();
        updateLogoutButton();
        
        // Show welcome toast only after login/signup (not on page load)
        if (showWelcomeToast) {
            setTimeout(() => {
                showToast('Welcome to THUNDER Gaming! Explore our amazing games.', 'success', 'Welcome!');
            }, 400);
        }
        
        // Scroll to top smoothly
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, 300);
}

// Logout function
function logout() {
    localStorage.removeItem('thunder_authenticated');
    showToast('You have been logged out successfully.', 'info', 'Logged Out');
    showAuthModal();
    updateNavLoginText();
    updateLogoutButton();
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    checkAuthStatus();
    updateNavLoginText();
    updateLogoutButton();
});

const gameData = {

    'assassins-creed': {
        title: "Assassin's Creed Valhalla",
        image: "assets/assassinscreed3.jpg",
        rating: "9.2",
        category: "Action/Adventure",
        year: "2020",
        description: "Become Eivor, a legendary Viking raider on a quest for glory. Explore England's Dark Ages as you raid your enemies, grow your settlement, and build your political power. Experience a visceral, brutal combat system that lets you dual-wield axes, swords, and even shields against fierce, relentless foes. Grow and customize your own settlement by recruiting new clan members and building upgradable structures. Get immersed in a captivating Viking experience through choice-driven dialogue, epic scenes, and diverse side-quests.",
        specs: {
            developer: "Ubisoft Montreal",
            publisher: "Ubisoft",
            platform: "PC, PlayStation, Xbox",
            genre: "Action RPG",
            releaseDate: "November 10, 2020",
            playtime: "36 hours"
        }
    },
    'warframe': {
        title: "Warframe",
        image: "assets/warframe2.jpg",
        rating: "8.8",
        category: "Sci-Fi/Action",
        year: "2013",
        description: "Warframe is a free-to-play online action game set in an evolving sci-fi world. Join up to 3 friends in cooperative gameplay, or compete in PvP battles. Customize your Warframe and weapons to match your playstyle. Explore the vast solar system and discover the secrets of the Origin System. With over 40 unique Warframes to collect, each with their own abilities and weapons, there's always something new to discover.",
        specs: {
            developer: "Digital Extremes",
            publisher: "Digital Extremes",
            platform: "PC, PlayStation, Xbox, Nintendo Switch",
            genre: "Third-person Shooter",
            releaseDate: "March 25, 2013",
            playTime: "Endless"
        }
    },
    'cyberpunk': {
        title: "Cyberpunk 2077",
        image: "assets/cyburpunk2.jpg",
        rating: "8.5",
        category: "RPG/Action",
        year: "2020",
        description: "Cyberpunk 2077 is an open-world, action-adventure RPG set in the megalopolis of Night City, where you play as a cyberpunk mercenary wrapped up in a do-or-die fight for survival. Improved and featuring all-new free additional content, customize your character and playstyle as you take on jobs, build a reputation, and unlock upgrades. The relationships you forge and the choices you make will shape the story and the world around you.",
        specs: {
            developer: "CD Projekt RED",
            publisher: "CD Projekt",
            platform: "PC, PlayStation, Xbox, Stadia",
            genre: "Action RPG",
            releaseDate: "December 10, 2020",
            playTime: "100+ hours"
        }
    },
    'destiny': {
        title: "Destiny 2",
        image: "assets/destiny3.webp",
        rating: "8.7",
        category: "FPS/MMO",
        year: "2017",
        description: "Destiny 2 is a free-to-play online-only multiplayer first-person shooter video game. The game features a multiplayer 'shared-world' environment with elements of role-playing games. Players assume the role of a Guardian, protectors of Earth's last safe city as they wield a power called Light to protect the Last City from different alien races. Guardians are tasked with reviving a celestial being called the Traveler, while journeying to different planets to investigate and destroy the alien threats before humanity is completely wiped out.",
        specs: {
            developer: "Bungie",
            publisher: "Bungie",
            platform: "PC, PlayStation, Xbox",
            genre: "First-person Shooter",
            releaseDate: "September 6, 2017",
            playTime: "endless"
        }
    },
    'Red Dead Redemption 2': {
        title: "Red Dead Redemption 2",
        image: "assets/rdr5.jpg",
        rating: "8.7",
        category: "RPG,Action",
        year: "2018",
        description: "Red Dead Redemption 2 Set in a fictionalized version of the American West in 1899, RDR2 follows the story of outlaw Arthur Morgan, a senior member of the Van der Linde gang. After a botched robbery forces the gang to flee, they must constantly rob and fight to survive while being pursued by federal agents and bounty hunters. The game explores the decline of the Wild West era and includes themes of loyalty, honor, and redemption. ",
        specs: {
            developer: "Rockstar Games",
            publisher: "Rockstar Games",
            platform: "PC, PlayStation, Xbox",
            genre: "Action,Adventure,Open World",
            releaseDate: "September 6, 2018",
            playTime: "Endless"
        }
    },
    'apex-legends': {
        title: "Apex Legends",
        image: "assets/apexlegends2.webp",
        rating: "9.1",
        category: "Battle Royale",
        year: "2019",
        description: "Apex Legends is the award-winning, free-to-play Hero Shooter from Respawn Entertainment. Master an ever-growing roster of legendary characters with powerful abilities, and experience strategic squad play and innovative gameplay in the next evolution of Hero Shooter and Battle Royale. Choose from a diverse cast of Legends — each with their own unique personality, strengths, and abilities — and forge alliances, settle scores, and leave your mark on the Kings Canyon.",
        specs: {
            developer: "Respawn Entertainment",
            publisher: "Electronic Arts",
            platform: "PC, PlayStation, Xbox, Nintendo Switch",
            genre: "Battle Royale",
            releaseDate: "February 4, 2019",
            playTime: "Endless"
        }
    },
    'pubg': {
        title: "PUBG: Battlegrounds",
        image: "assets/pubg4.webp",
        rating: "8.9",
        category: "Battle Royale",
        year: "2017",
        description: "PUBG: BATTLEGROUNDS is a battle royale that pits 100 players against each other. Outplay your opponents to become the lone survivor. Survive dynamic battlegrounds that force players into a shrinking play zone. Team up with friends in two-player Duos, four-player Squads, or go solo to be the last player standing. PUBG is realistic in approach; weapons, vehicles, and maps are inspired by real-world counterparts.",
        specs: {
            developer: "PUBG Corporation",
            publisher: "PUBG Corporation",
            platform: "PC, PlayStation, Xbox, Mobile",
            genre: "Battle Royale",
            releaseDate: "December 20, 2017",
            playTime: "Endless"
        }
    },
    'fortnite': {
        title: "Fortnite",
        image: "assets/fortnite2.jpg",
        rating: "8.6",
        category: "Battle Royale",
        year: "2017",
        description: "Fortnite is the completely free multiplayer game where you and your friends can jump into Battle Royale or Fortnite Creative. Download now and jump into the action. In Battle Royale, you'll compete against up to 99 other players to be the last one standing. Build your fort as you battle to be the last one standing. Jump in and squad up with friends around the world or in the same room!",
        specs: {
            developer: "Epic Games",
            publisher: "Epic Games",
            platform: "PC, PlayStation, Xbox, Nintendo Switch, Mobile",
            genre: "Battle Royale",
            releaseDate: "July 25, 2017",
            playTime: "Endless"
        }
    },
    'valorant': {
        title: "Valorant",
        image: "assets/valorant3.webp",
        rating: "9.0",
        category: "Tactical FPS",
        year: "2020",
        description: "Valorant is a free-to-play first-person tactical hero shooter developed and published by Riot Games. Blend your style and experience on a global, competitive stage. You have 13 rounds to attack and defend your side using sharp gunplay and tactical abilities. And, with one life per-round, you'll need to think faster than your opponent if you want to survive. Take on foes across Competitive and Unranked modes as well as Deathmatch and Spike Rush.",
        specs: {
            developer: "Riot Games",
            publisher: "Riot Games",
            platform: "PC",
            genre: "Tactical FPS",
            releaseDate: "June 2, 2020",
            playTime: "Endless"
        }
    },
    'Resident Evil 4': {
        title: "Resident Evil 4",
        image: "assets/re2.jpg",
        rating: "9.0",
        category: "Survival Horror",
        year: "2023",
        description: "Resident Evil 4 (2023) is a complete remake of the 2005 action-horror classic, updating its graphics, gameplay, and storyline for modern audiences. The game follows Agent Leon S. Kennedy on a mission to rescue the U.S. president's daughter from a secluded European village filled with parasite-infected villagers, but it has been reimagined with a darker, scarier atmosphere and new surprises, according to Resident Evil and PlayStation.  Resident Evil 4 (2023) is a complete remake of the 2005 action-horror classic, updating its graphics, gameplay, and storyline for modern audiences. The game follows Agent Leon S. Kennedy on a mission to rescue the U.S. president's daughter from a secluded European village filled with parasite-infected villagers, but it has been reimagined with a darker, scarier atmosphere and new surprises, according to Resident Evil and PlayStation.  ",
        specs: {
            developer: "CAPCOM",
            publisher: "CAPCOM",
            platform: "PC",
            genre: "Survival Horror",
            releaseDate: "June 2, 2023",
            playTime: "Endless"
        }
    },
};

function showGameDetail(gameId) {
    const game = gameData[gameId];
    if (!game) return;

    const mainContent = document.getElementById('main-content');
    const gameDetail = document.getElementById('game-detail');
    const detailContent = document.querySelector('.detail-content');

    mainContent.style.display = 'none';
    gameDetail.classList.add('active');

    detailContent.innerHTML = `
        <div class="detail-header">
            <div class="detail-image">
                <img src="${game.image}" alt="${game.title}">
            </div>
            <div class="detail-info">
                <h1>${game.title}</h1>
                <div class="detail-meta">
                    <span class="detail-badge rating-detail">★ ${game.rating}</span>
                    <span class="detail-badge category-detail">${game.category}</span>
                    <span class="detail-badge year-detail">${game.year}</span>
                </div>
                <p class="detail-description">${game.description}</p>
                <div class="detail-specs">
                    <div class="spec-item">
                        <div class="spec-label">Developer</div>
                        <div class="spec-value">${game.specs.developer}</div>
                    </div>
                    <div class="spec-item">
                        <div class="spec-label">Publisher</div>
                        <div class="spec-value">${game.specs.publisher}</div>
                    </div>
                    <div class="spec-item">
                        <div class="spec-label">Platform</div>
                        <div class="spec-value">${game.specs.platform}</div>
                    </div>
                    <div class="spec-item">
                        <div class="spec-label">Genre</div>
                        <div class="spec-value">${game.specs.genre}</div>
                    </div>
                    <div class="spec-item">
                        <div class="spec-label">Release Date</div>
                        <div class="spec-value">${game.specs.releaseDate}</div>
                    </div>
                    <div class="spec-item">
                        <div class="spec-label">Play Time</div>
                        <div class="spec-value">${game.specs.playTime || game.specs.playtime}</div>
                    </div>
                </div>
            </div>
        </div>
    `;

    window.scrollTo(0, 0);
}

function backToGames() {
    const mainContent = document.getElementById('main-content');
    const gameDetail = document.getElementById('game-detail');

    mainContent.style.display = 'block';
    gameDetail.classList.remove('active');

    window.scrollTo(0, 0);
}

// Toggle password visibility
function togglePassword(inputId, button) {
    const input = document.getElementById(inputId);
    const eyeIcon = button.querySelector('.eye-icon');
    
    if (input.type === 'password') {
        input.type = 'text';
        eyeIcon.textContent = '🙈';
    } else {
        input.type = 'password';
        eyeIcon.textContent = '👁️';
    }
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Newsletter form submission
document.querySelector('.newsletter-form button').addEventListener('click', function(e) {
    e.preventDefault();
    const nameInput = document.querySelector('.newsletter-form input[type="email"]:first-of-type');
    const emailInput = document.querySelector('.newsletter-form input[type="email"]:nth-of-type(2)');
    const feedbackInput = document.querySelector('.newsletter-form input[type="email"]:last-of-type');
    
    const name = nameInput ? nameInput.value : '';
    const email = emailInput ? emailInput.value : '';
    const feedback = feedbackInput ? feedbackInput.value : '';
    
    if (!name || !email || !feedback) {
        showToast('Please fill in all fields.', 'warning', 'Missing Information');
    } else {
        showToast('Thank you for subscribing! You will receive gaming updates and exclusive offers.', 'success', 'Subscription Successful');
        if (nameInput) nameInput.value = '';
        if (emailInput) emailInput.value = '';
        if (feedbackInput) feedbackInput.value = '';
    }
});

// Sign up button handler
document.querySelector('.sign-up-btn').addEventListener('click', function() {
    // If already authenticated, show logout option
    if (localStorage.getItem('thunder_authenticated') === 'true') {
        if (confirm('Do you want to logout?')) {
            logout();
        }
    } else {
        openAuthModal('signup');
    }
});

// Game card hover effects
document.querySelectorAll('.game-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

function openAuthModal(tab = 'login') {
    const modal = document.getElementById('authModal');
    modal.classList.add('active');
    modal.classList.remove('initial-login', 'hidden');
    switchAuthTab(tab);
    document.body.style.overflow = 'hidden'; 
}

function closeAuthModal() {
    // Only allow closing if not initial login
    const modal = document.getElementById('authModal');
    if (!modal.classList.contains('initial-login')) {
        modal.classList.add('hidden');
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

function switchAuthTab(tab) {
    document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
    document.querySelector(`.auth-tab[onclick="switchAuthTab('${tab}')"]`).classList.add('active');
    
    document.querySelectorAll('.auth-form').forEach(f => f.classList.remove('active'));
    document.getElementById(tab === 'login' ? 'loginForm' : 'signupForm').classList.add('active');
}

// Close modal on overlay click
document.getElementById('authModal').addEventListener('click', function(e) {
    // Only allow closing by clicking overlay if not initial login
    if (e.target === this && !this.classList.contains('initial-login')) {
        closeAuthModal();
    }
});

// Store user data in localStorage for signup
function storeUserData(name, email, password) {
    const users = JSON.parse(localStorage.getItem('thunder_users') || '[]');
    users.push({ name, email, password });
    localStorage.setItem('thunder_users', JSON.stringify(users));
}

// Check if user exists for login
function checkUserExists(email, password) {
    const users = JSON.parse(localStorage.getItem('thunder_users') || '[]');
    return users.find(user => user.email === email && user.password === password);
}

// Login form submission
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    if (email && password) {
        const user = checkUserExists(email, password);
        if (user) {
            showToast('Login successful! Redirecting...', 'success', 'Login Successful');
            this.reset();
            // Small delay before redirect for better UX
            setTimeout(() => {
                showMainContent(true);
            }, 500);
        } else {
            showToast('Invalid email or password. Please try again or sign up.', 'error', 'Login Failed');
        }
    } else {
        showToast('Please fill in all fields.', 'warning', 'Missing Information');
    }
});

// Signup form submission
document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('signupConfirmPassword').value;
    
    if (name && email && password && confirmPassword) {
        if (password === confirmPassword) {
            // Check if user already exists
            const users = JSON.parse(localStorage.getItem('thunder_users') || '[]');
            const userExists = users.find(user => user.email === email);
            
            if (userExists) {
                showToast('An account with this email already exists. Please login instead.', 'warning', 'Account Exists');
                switchAuthTab('login');
            } else {
                storeUserData(name, email, password);
                showToast('Account created successfully! Please login to continue.', 'success', 'Account Created');
                this.reset();
                // Switch to login tab instead of redirecting
                setTimeout(() => {
                    switchAuthTab('login');
                }, 500);
            }
        } else {
            showToast('Passwords do not match.', 'error', 'Password Mismatch');
        }
    } else {
        showToast('Please fill in all fields.', 'warning', 'Missing Information');
    }
});

// Social login buttons
document.querySelectorAll('.social-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const platform = this.textContent;
        showToast(`${platform} login feature coming soon!`, 'info', 'Coming Soon');
    });
});

// Create and add login link to nav
const nav = document.querySelector('.nav-links');
const loginLi = document.createElement('li');
loginLi.innerHTML = '<a href="#" id="navLoginLink" onclick="handleNavLogin(); return false;">Login</a>';
nav.appendChild(loginLi);
// Update nav login text after creating the link
updateNavLoginText();

function handleNavLogin() {
    if (localStorage.getItem('thunder_authenticated') === 'true') {
        if (confirm('Do you want to logout?')) {
            logout();
        }
    } else {
        openAuthModal('login');
    }
}

// Update nav login text based on auth status
function updateNavLoginText() {
    const navLoginLink = document.getElementById('navLoginLink');
    if (navLoginLink) {
        if (localStorage.getItem('thunder_authenticated') === 'true') {
            navLoginLink.textContent = 'Logout';
        } else {
            navLoginLink.textContent = 'Login';
        }
    }
}

// Update logout button visibility
function updateLogoutButton() {
    const signUpBtn = document.querySelector('.sign-up-btn');
    const logoutBtn = document.getElementById('logoutBtn');
    
    if (localStorage.getItem('thunder_authenticated') === 'true') {
        if (signUpBtn) signUpBtn.style.display = 'none';
        if (logoutBtn) logoutBtn.style.display = 'block';
    } else {
        if (signUpBtn) signUpBtn.style.display = 'block';
        if (logoutBtn) logoutBtn.style.display = 'none';
    }
}


