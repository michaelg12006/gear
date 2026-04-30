// database
const games1 = allgames.filter(game => game.category.includes("Special Offer"));
const games3 = allgames.filter(game => game.category.includes("Free-to-Play"));
const games4 = allgames.filter(game => game.category.includes("Top Seller"));

const carousel = document.querySelectorAll('.store-carousel');
const carouselpage = document.querySelectorAll('.store-carousel-page');
// carousel.querySelectorAll('.carousel-block-1').forEach(block => block.remove());

    function makecarousel(i, j, games, location, carouselno){
        for (let k = i-1; k < j; k++) {
            const section = document.createElement('div');
            section.classList.add(location);
            section.setAttribute('data-gamename', games[k].name);
            
            section.innerHTML = `
                <div class="game-header">
                <span>${games[k].name}</span>
                <button class="wishlist-btn" aria-label="Add to wishlist">❤︎</button>
                </div>
                <div class="game-image">
                <img src="${games[k].image}" alt="${games[k].name}">
                </div>
                <div class="game-description">
                <p>${games[k].description}</p>
                </div>
                <div class="game-footer">
                <img src="Assets/icon_platform_win.png" alt="Windows">
                <div class="price">
                    <span id="final-price">${games[k].finalPrice}</span>
                    <span id="normal-price">${games[k].normalPrice}</span>
                </div>
                </div>
            `;

            carousel[carouselno].insertBefore(section, carousel[carouselno].lastElementChild);
            
            section.addEventListener('click', () => {
                localStorage.setItem("selectedGame", JSON.stringify(games[k]));
                window.location.href = "game.html";
            })
        }
    }

function makecarouselbtn(buttonno, activebutton, location, carouselbtnno) {
    for (let k = 0; k < buttonno; k++) {
        const section = document.createElement('div');
        section.classList.add(location);

        if (k == activebutton) {
            section.classList.add('active-button');
        }

        carouselpage[carouselbtnno].appendChild(section)
    }
}

// ----- Carousel 1: Special Offers -----
let max1 = games1.length
if (max1 % 3 == 1) max1 += 2
else if (max1 % 3 == 2) max1 += 1

let i1 = 1, j1 = 3, buttonno1 = max1 / 3, activebutton1 = 0;

const buttons1 = carousel[0].querySelectorAll('button');
const leftbutton1 = buttons1[0];
const rightbutton1 = buttons1[buttons1.length - 1];
// console.log(carousel)
console.log(carouselpage)
console.log(buttonno1 + ' ' + activebutton1)

leftbutton1.addEventListener('click', () => {
    carouselpage[0].querySelectorAll('.carousel-button-1').forEach(block => block.remove());
    activebutton1 -= 1;
    if (activebutton1 < 0) activebutton1 += buttonno1;
    makecarouselbtn(buttonno1, activebutton1, "carousel-button-1", 0)
    apply()

    carousel[0].querySelectorAll('.carousel-block-1').forEach(block => block.remove());
    i1 -= 3
    j1 -= 3
    if (i1 < 1) i1 += max1
    if (j1 < 1) j1 += max1
    makecarousel(i1, j1, games1, "carousel-block-1", 0)
    apply()
})

rightbutton1.addEventListener('click', () => {
    carouselpage[0].querySelectorAll('.carousel-button-1').forEach(block => block.remove());
    activebutton1 += 1;
    if (activebutton1 > buttonno1-1) activebutton1 -= buttonno1;
    makecarouselbtn(buttonno1, activebutton1, "carousel-button-1", 0)
    apply()

    carousel[0].querySelectorAll('.carousel-block-1').forEach(block => block.remove());
    i1 += 3
    j1 += 3
    if (i1 > max1) i1 -= max1
    if (j1 > max1) j1 -= max1
    makecarousel(i1, j1, games1, "carousel-block-1", 0)
    apply()
})

makecarousel(i1, j1, games1, "carousel-block-1", 0)
apply()
makecarouselbtn(buttonno1, activebutton1, "carousel-button-1", 0)
apply()


// ----- Carousel 3: f2p -----
let max3 = games3.length
if (max3 % 3 == 1) max3 += 2
else if (max3 % 3 == 2) max3 += 1

let i3 = 1, j3 = 3, buttonno3 = max3 / 3, activebutton3 = 0

const buttons3 = carousel[2].querySelectorAll('button');
const leftbutton3 = buttons3[0];
const rightbutton3 = buttons3[buttons3.length - 1];
// console.log(carousel)

leftbutton3.addEventListener('click', () => {
    carouselpage[2].querySelectorAll('.carousel-button-3').forEach(block => block.remove());
    activebutton3 -= 1;
    if (activebutton3 < 0) activebutton3 += buttonno3;
    makecarouselbtn(buttonno3, activebutton3, "carousel-button-3", 2)
    apply()

    carousel[2].querySelectorAll('.carousel-block-3').forEach(block => block.remove());
    i3 -= 3
    j3 -= 3
    if (i3 < 1) i3 += max3
    if (j3 < 1) j3 += max3
    makecarousel(i3, j3, games3, "carousel-block-3", 2)
    apply()
})

rightbutton3.addEventListener('click', () => {
    carouselpage[2].querySelectorAll('.carousel-button-3').forEach(block => block.remove());
    activebutton3 += 1;
    if (activebutton3 > buttonno3-1) activebutton3 -= buttonno3;
    makecarouselbtn(buttonno3, activebutton3, "carousel-button-3", 2)
    apply()

    carousel[2].querySelectorAll('.carousel-block-3').forEach(block => block.remove());
    i3 += 3
    j3 += 3
    if (i3 > max3) i3 -= max3
    if (j3 > max3) j3 -= max3
    makecarousel(i3, j3, games3, "carousel-block-3", 2)
    apply()
})

makecarousel(i3, j3, games3, "carousel-block-3", 2)
apply()
makecarouselbtn(buttonno3, activebutton3, "carousel-button-3", 2)
apply()


// user database

document.addEventListener('DOMContentLoaded', () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if(currentUser){
        const usernameSpan = document.querySelector('.user-background .username');
        if(usernameSpan){
            usernameSpan.textContent = currentUser.username;
        }

        const profileImg = document.querySelector('.user-background .profile-img');
        if (profileImg && currentUser.profilePic) {
            profileImg.src = currentUser.profilePic;
        }

        const balanceSpan = document.querySelector('.user-background .balance');
        if (balanceSpan && currentUser.balance) {
            balanceSpan.textContent = currentUser.balance;
        }

        const userBackground = document.querySelector('.user-background');
        const dropdown = document.querySelector('.dropdown-button')
        userBackground.addEventListener('click', () => {
            dropdown.classList.toggle('hidden');
        })

        const logout = document.getElementById('logout-btn');
        if(logout){
            logout.addEventListener('click', () => {
                localStorage.removeItem('currentUser');
                window.location.href = "index.html";
            })
        }
    }
    else
    {
        const userBackground = document.querySelector('.user-background');
        userBackground.addEventListener('click', () => {
            window.location.href = "login.html";
        })
    }
});


// carousel 4: top seller
const carousel2 = document.querySelector('.store-carousel-2');
const carousellayer = document.querySelectorAll('.carousel-layer');
console.log(carousellayer)
function makecarousel2(i, j, games, location){
    for (let k = 0; k < 3; k++) {
        for (let l = 0; l < 2; l++) {
            let index = i + 2*k + l;

            const section = document.createElement('div');
            section.classList.add(location);
            section.setAttribute('data-gamename', games[index].name);
            section.innerHTML = `
                <div class="top-game-image">
                    <img src="${games[index].image}" alt="${games[index].name}">
                </div>
                <div class="top-game-description">
                    <div class="top-game-header">
                        <span>${games[index].name}</span>
                        <button class="wishlist-btn" aria-label="Add to wishlist">❤︎</button>
                    </div>
                    <div class="top-game-footer">
                        <img src="Assets/icon_platform_win.png" alt="Windows">
                        <div class="price">
                            <span id="final-price">${games[index].finalPrice}</span>
                            <span id="normal-price">${games[index].normalPrice}</span>
                        </div>
                    </div>
                </div>
            `;

            carousellayer[k].append(section);
            console.log(games[index]);

            section.addEventListener('click', () => {
                localStorage.setItem("selectedGame", JSON.stringify(games[index]));
                window.location.href = "game.html";
            })
        }
    }
}

function makecarouselbtn2(buttonno, activebutton, location, carouselbtnno) {
    for (let k = 0; k < buttonno; k++) {
        const section = document.createElement('div');
        section.classList.add(location);

        if (k == activebutton) {
            section.classList.add('active-button');
        }

        carouselpage[carouselbtnno].appendChild(section)
    }
}

let max4 = Math.ceil(games4.length/6) * 6

let i4 = 0, j4 = 5, buttonno4 = max4 / 6, activebutton4 = 0;

const buttons4 = carousel2.querySelectorAll('button');
const leftbutton4 = buttons4[0];
const rightbutton4 = buttons4[buttons4.length - 1];

leftbutton4.addEventListener('click', () => {
    carouselpage[3].querySelectorAll('.carousel-button-4').forEach(block => block.remove());
    activebutton4 -= 1;
    if (activebutton4 < 0) activebutton4 += buttonno4;
    makecarouselbtn2(buttonno4, activebutton4, "carousel-button-4", 3)
    applyCarousel()

    carousel2.querySelectorAll('.carousel-block-4').forEach(block => block.remove());
    i4 -= 6
    j4 -= 6
    if (i4 < 0) i4 += max4
    if (j4 < 0) j4 += max4
    makecarousel2(i4, j4, games4, "carousel-block-4")
    applyCarousel()
    console.log(i4 + ' ' + j4);
})

rightbutton4.addEventListener('click', () => {
    carouselpage[3].querySelectorAll('.carousel-button-4').forEach(block => block.remove());
    activebutton4 += 1;
    if (activebutton4 > buttonno4-1) activebutton4 -= buttonno4;
    makecarouselbtn2(buttonno4, activebutton4, "carousel-button-4", 3)
    applyCarousel()

    carousel2.querySelectorAll('.carousel-block-4').forEach(block => block.remove());
    i4 += 6
    j4 += 6
    if (i4 > max4 - 1) i4 -= max4
    if (j4 > max4 - 1) j4 -= max4
    makecarousel2(i4, j4, games4, "carousel-block-4")
    applyCarousel()
    console.log(i4 + ' ' + j4);
})

makecarousel2(i4, j4, games4, "carousel-block-4")
applyCarousel()
makecarouselbtn2(buttonno4, activebutton4, "carousel-button-4", 3)
applyCarousel()
console.log(i4 + ' ' + j4);


    
const searchInput = document.getElementById("search-input");
const searchResults = document.getElementById("search-results");
const searchButton = document.getElementById("search-button");

function searchgame(query) {
    const queries = query.toLowerCase().replace(/[^a-z]/g, "");
    return allgames.filter(game =>
        game.name.toLowerCase().replace(/[^a-z]/g, "").includes(queries)
    );
}

function displaygame(games) {
    searchResults.innerHTML = "";

    if (games.length === 0) {
        searchResults.innerHTML = "";
        return;
    }

    games.forEach(game => {
        const gameDiv = document.createElement("div");
        gameDiv.className = "search-game-result";
        gameDiv.innerHTML = `
            <h3>${game.name}</h3>
            <img src="${game.image}" alt="${game.name}" width="100">
            <p>${game.description}</p>
            <p><strong>Release Date:</strong> ${game.releasedate}</p>
            <p><strong>Price:</strong> <s>${game.normalPrice}</s> ${game.finalPrice}</p>
        `;

        gameDiv.addEventListener("click", () => {
            localStorage.setItem("selectedGame", JSON.stringify(game));
            window.location.href = "game.html";
        });

        searchResults.appendChild(gameDiv);
    });
}

searchButton.addEventListener("click", () => {
    const query = searchInput.value.trim();
    if (!query) return;

    const exactMatch = allgames.find(game =>
        game.name.toLowerCase() === query.toLowerCase()
    );

    if (exactMatch) {
        localStorage.setItem("selectedGame", JSON.stringify(exactMatch));
        window.location.href = "game.html";
        return;
    }

    const results = searchgame(query);
    displaygame(results);
});

searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        searchButton.click();
    }
});


function apply() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) return;

    const wishlistKey = `wishlist_${currentUser.username}`;
    let wishlist = [];
    try {
        const storedWishlist = localStorage.getItem(wishlistKey);
        wishlist = storedWishlist ? JSON.parse(storedWishlist) : [];
    } catch (e) {
        console.error("Error reading wishlist from localStorage:", e);
        wishlist = [];
    }

    const gameBlocks = document.querySelectorAll("[data-gamename]");

    gameBlocks.forEach(block => {
        const gameName = block.getAttribute("data-gamename");
        const buttons = block.querySelectorAll(".wishlist-btn");

        if (!gameName || buttons.length === 0) return;

        buttons.forEach(button => {
            if (wishlist.includes(gameName)) {
                button.classList.add("wishlisted");
            } else {
                button.classList.remove("wishlisted");
            }

            if (!button.dataset.listenerAttached) {
                button.addEventListener("click", (e) => {
                    e.stopPropagation();

                    const isWishlisted = wishlist.includes(gameName);
                    if (isWishlisted) {
                        wishlist = wishlist.filter(name => name !== gameName);
                        button.classList.remove("wishlisted");
                    } else {
                        wishlist.push(gameName);
                        button.classList.add("wishlisted");
                    }

                    localStorage.setItem(wishlistKey, JSON.stringify(wishlist));
                });

                button.dataset.listenerAttached = "true";
            }
        });
    });
}

function applyCarousel() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) return;

    const wishlistKey = `wishlist_${currentUser.username}`;
    let wishlist = [];
    try {
        const storedWishlist = localStorage.getItem(wishlistKey);
        wishlist = storedWishlist ? JSON.parse(storedWishlist) : [];
    } catch (e) {
        console.error("Error reading wishlist from localStorage:", e);
        wishlist = [];
    }

    const blocks = document.querySelectorAll('.carousel-block-4[data-gamename]');

    blocks.forEach(block => {
        const gameName = block.getAttribute("data-gamename");
        const button = block.querySelector('.wishlist-btn');

        if (!button) return;

        if (wishlist.includes(gameName)) {
            button.classList.add("wishlisted");
        } else {
            button.classList.remove("wishlisted");
        }

        if (!button.dataset.listenerAttached) {
            button.addEventListener("click", (e) => {
                e.stopPropagation();

                const isWishlisted = wishlist.includes(gameName);
                if (isWishlisted) {
                    wishlist = wishlist.filter(name => name !== gameName);
                    button.classList.remove("wishlisted");
                } else {
                    wishlist.push(gameName);
                    button.classList.add("wishlisted");
                }

                localStorage.setItem(wishlistKey, JSON.stringify(wishlist));
            });

            button.dataset.listenerAttached = "true";
        }
    });
}



