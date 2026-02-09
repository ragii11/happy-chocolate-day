document.addEventListener("DOMContentLoaded", function() {

    /* ---------------- SCREENS & UI ELEMENTS ---------------- */
    const loading = document.getElementById("loading-screen");
    const boxScreen = document.getElementById("box-screen");
    const chocoScreen = document.getElementById("choco-screen");
    const loveScreen = document.getElementById("love-screen");
    const questionScreen = document.getElementById("question-screen");

    const loadingText = document.getElementById("loading-text");
    const loveText = document.getElementById("love-text");
    const gift = document.getElementById("box");
    const music = document.getElementById("music");
    const chocolates = document.querySelectorAll(".choco");
    const msg = document.getElementById("msg");
    const finalBtn = document.getElementById("final-btn");
    const noBtn = document.getElementById("noBtn");
    const yesBtn = document.getElementById("yesBtn");

    /* ---------------- STATE VARIABLES ---------------- */
    let i = 0;
    let musicStarted = false;
    let continueBtnCreated = false;
    let rainStarted = false;

    const messages = [
        "Establishing Connection...",
        "Searching For My cutie All Over The World...",
        "Yipeeeee! Found ❤️",
        "Preparing Chocolates For My Cutie...",
        "Touch Anywhere To Receive Your Special Delivery 🍫"
    ];

    /* ---------------- LOADING MESSAGES ---------------- */
    function nextMsg() {
        if (i < messages.length) {
            loadingText.textContent = messages[i];
            i++;
            setTimeout(nextMsg, 1500);
        }
    }
    nextMsg();

    /* ---------------- NAVIGATION & MUSIC ---------------- */
    loading.addEventListener("click", function() {
        if (i >= messages.length) {
            loading.classList.add("hidden");
            boxScreen.classList.remove("hidden");
        }
    });

    function startMusic() {
        if (musicStarted) return;
        musicStarted = true;

        music.volume = 0;
        music.play().then(() => {
            let vol = 0;
            const fade = setInterval(() => {
                if (vol < 0.5) {
                    vol += 0.05;
                    music.volume = vol;
                } else {
                    clearInterval(fade);
                }
            }, 200);
        }).catch(err => {
            console.warn("Audio playback was blocked. Interaction required.", err);
            musicStarted = false; // Reset to allow retry on next click
        });
    }

    gift.addEventListener("click", function(e) {
        e.stopPropagation();
        startMusic();
        boxScreen.classList.add("hidden");
        chocoScreen.classList.remove("hidden");
    });

    /* ---------------- CHOCOLATE SELECTION ---------------- */
    chocolates.forEach(item => {
        item.addEventListener("click", function() {
            msg.textContent = item.dataset.msg;
            startChocolateRain();

            if (!continueBtnCreated) {
                continueBtnCreated = true;
                const continueBtn = document.createElement("button");
                continueBtn.textContent = "Continue the surprise ❤️";
                continueBtn.style.cssText = `
                    margin-top: 25px; 
                    padding: 12px 24px; 
                    border-radius: 25px; 
                    border: none; 
                    background: #c68a3a; 
                    color: white; 
                    cursor: pointer;
                    font-family: inherit;
                `;

                msg.after(continueBtn);
                continueBtn.addEventListener("click", openLoveLetter);
            }
        });
    });

    /* ---------------- LOVE LETTER ---------------- */
    function openLoveLetter() {
        chocoScreen.classList.add("hidden");
        loveScreen.classList.remove("hidden");

        const message = `Mi Amor...

"I’d give anything to see you enjoy these chocolates and catch that beautiful smile in person. 
You deserve all the sweetness today and every day. 
I’m always working to keep you happy, and 
I can't wait to be the one stealing a bite next to you. Happy Chocolate Day!"`;

        let n = 0;
        loveText.textContent = ""; 

        function type() {
            if (n < message.length) {
                loveText.textContent += message.charAt(n);
                n++;
                setTimeout(type, 35);
            }
        }
        type();
    }

    /* ---------------- FINAL QUESTION ---------------- */
    finalBtn.addEventListener("click", () => {
        loveScreen.classList.add("hidden");
        questionScreen.classList.remove("hidden");
    });

    noBtn.addEventListener("mouseover", () => {
        const x = Math.random() * 300 - 150;
        const y = Math.random() * 200 - 100;
        noBtn.style.transition = "transform 0.2s ease";
        noBtn.style.transform = `translate(${x}px, ${y}px)`;
    });

    yesBtn.addEventListener("click", () => {
        startHeartRain();
        questionScreen.innerHTML = `
            <div class="center">
                <h1 class="title">Yipppppppeeeeeeee!!! I Knew it ❤️</h1>
                <p style="margin-top:20px;">Happy Chocolate Day, 🍫💞</p>
            </div>
        `;
    });

    /* ---------------- ANIMATIONS ---------------- */
    function startChocolateRain() {
        if (rainStarted) return;
        rainStarted = true;
        const container = document.getElementById("choco-rain");

        setInterval(() => {
            const choco = document.createElement("img");
            const imgs = ["milk.png", "dark.png", "caramel.png", "strawberry.png"];
            choco.src = imgs[Math.floor(Math.random() * imgs.length)];
            choco.className = "falling-choco";
            choco.style.left = Math.random() * 100 + "vw";
            choco.style.position = "absolute";
            choco.style.animationDuration = (4 + Math.random() * 2) + "s";
            container.appendChild(choco);

            setTimeout(() => choco.remove(), 6000);
        }, 350);
    }

    function startHeartRain() {
        const container = document.getElementById("heart-rain");
        setInterval(() => {
            const heart = document.createElement("div");
            heart.className = "heart";
            heart.innerHTML = "❤️";
            heart.style.left = Math.random() * 100 + "vw";
            heart.style.position = "absolute";
            heart.style.animationDuration = (3 + Math.random() * 2) + "s";
            container.appendChild(heart);
            setTimeout(() => heart.remove(), 5000);
        }, 150);
    }
});