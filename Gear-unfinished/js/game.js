window.addEventListener("DOMContentLoaded", () =>{
    const selectedGame = JSON.parse(localStorage.getItem("selectedGame"))

    if (!selectedGame) {
        document.getElementById("game-body").innerText = "Game not found";
        return;
    }

    document.querySelector("#game-block span").innerText = selectedGame.name

    const videoelement = document.querySelector("#game-card video")
    if(selectedGame.video){
        videoelement.src = selectedGame.video
        videoelement.style.display = "block";
    }
    else{
        videoelement.src = "https://cdn.pixabay.com/video/2021/09/27/89894-616430996_large.mp4";
        videoelement.style.display = "block";
    }

    document.querySelector("#game-desc img").src = selectedGame.image;
    document.getElementById("description").innerText = selectedGame.description || "Not available"
    document.getElementById("recent").innerText = selectedGame.recentreview || "Not available"
    document.getElementById("all").innerText = selectedGame.allreview || "Not available"
    document.getElementById("release-date").innerText = selectedGame.releasedate || "Not available"
    document.getElementById("developer").innerText = selectedGame.developer || "Not available"
    document.getElementById("publisher").innerText = selectedGame.publisher || "Not available"

    document.getElementById("tags").innerText = selectedGame.category?.join(", ") || "No tags";

    const copyright = document.querySelector("#game-copyright span");
    if(copyright){
        copyright.textContent = selectedGame.copyright || " ";
    }
})

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
                window.location.href = "main.html";
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

const selectedGame = JSON.parse(localStorage.getItem("selectedGame"));
const editionContainer = document.querySelector("#left-info .game-edition");
const editions = ["Standard Edition", "Deluxe Edition", "Gold Edition"];

if(selectedGame && editionContainer){
    editionContainer.innerHTML = "";

    editions.forEach(edition =>{
        const editionDiv = document.createElement("div");
        editionDiv.className = "game-block-edition" 

        let btn_text = "";
        if (selectedGame.finalPrice === "FREE"){
            btn_text = "Add to Library";   
        }
        else {
            btn_text = "Add to Cart";
        }

        editionDiv.innerHTML = `
        <span class="edition-type">Buy ${selectedGame.name} - ${edition}</span>
        <img src="Assets/icon_platform_win.png" alt="Windows" class="windows-logo">
        <div class="game-price">
            <span class="normal-price">${selectedGame.normalPrice}</span>
            <span class="final-price">${selectedGame.finalPrice}</span>
        </div>
        <button>${btn_text}</button>
        `;

        editionContainer.appendChild(editionDiv)
    })
}
else{
    if (editionContainer) editionContainer.innerHTML = "<p>Game not found.</p>";
}

document.addEventListener("DOMContentLoaded", () => {
    const selectedGame = JSON.parse(localStorage.getItem("selectedGame"));
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!selectedGame || !currentUser) return;

    const gamename = selectedGame.name;
    const editionBlocks = document.querySelectorAll(".game-block-edition");

    editionBlocks.forEach(block => {
        const button = block.querySelector("button");
        if (!button) return;

        button.addEventListener("click", () => {
            const editionTypeText = block.querySelector(".edition-type")?.textContent?.replace(`Buy ${gamename} - `, "").trim();
            if (!editionTypeText) return;

            const isLibrary = button.textContent.includes("Add to Library");
            const key = isLibrary ? `libraryItems_${currentUser.username}` : `cartItems_${currentUser.username}`;

            let list = [];
            try {
                const stored = localStorage.getItem(key);
                list = stored ? JSON.parse(stored) : [];
            } catch (e) {
                console.error(`Failed to parse ${key} from localStorage:`, e);
            }

            const alreadyExists = list.some(item => item.name === gamename && item.edition === editionTypeText);
            if (alreadyExists) {
                alert(`${gamename} (${editionTypeText}) is already in your ${isLibrary ? "library" : "cart"}.`);
                return;
            }

            list.push({
                name: gamename,
                edition: editionTypeText,
                image: selectedGame.image
            });

            localStorage.setItem(key, JSON.stringify(list));
            alert(`${gamename} (${editionTypeText}) added to your ${isLibrary ? "library" : "cart"}!`);
        });
    });
});


// input
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
    games.forEach(game => {
        gameDiv.addEventListener("click", () => {
            localStorage.setItem("selectedGame", JSON.stringify(game));
            window.location.href = "/GameProfile/game.html";
        });
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
        window.location.href = "/GameProfile/game.html";
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

document.addEventListener("DOMContentLoaded", () =>{
    const heart = document.getElementById("heart")
    const wishbutton = document.getElementById("wishlist-btn")
    const selectedGame = JSON.parse(localStorage.getItem("selectedGame"));
    const gamename = selectedGame.name

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const wishlistKey = `wishlist_${currentUser.username}`;
    if (!currentUser) return;

    let wishlist = [];
    try {
        const wishlistData = localStorage.getItem(wishlistKey);
        wishlist = wishlistData ? JSON.parse(wishlistData) : [];
    } catch (e) {
        console.error("Failed to parse wishlist from localStorage:", e);
        wishlist = [];
    }

    if(wishlist.includes(gamename)){
        heart.classList.add("wishlisted")
    }
    else{
        heart.classList.remove("wishlisted")
    }

    wishbutton.addEventListener("click", () =>{
        const iswishlisted = wishlist.includes(gamename)

        if(iswishlisted){
            wishlist = wishlist.filter(id => id !== gamename)
            heart.classList.remove("wishlisted")
        }
        else{
            wishlist.push(gamename)
            heart.classList.add("wishlisted")
        }

        localStorage.setItem(wishlistKey, JSON.stringify(wishlist));
    })
})

document.addEventListener("DOMContentLoaded", () =>{
    const selectedGame = JSON.parse(localStorage.getItem("selectedGame"));
    const gamename = selectedGame.name

    let cart = [];
    try {
        const cartData = localStorage.getItem("cart");
        cart = cartData ? JSON.parse(cartData) : [];
    } catch (e) {
        console.error("Failed to parse cart from localStorage:", e);
        cart = [];
    }

    const edition = document.querySelectorAll(".game-block-edition");

    edition.forEach(block => {
        const button = document.querySelector("button")
        const type = block.querySelector(".edition-type").textContent

        button.addEventListener("click", () =>{
            const cartitem = {
                name: gamename,
                edition: type
            }

            const isincart = cart.some(item =>{
                item.name === cartitem.name && item.edition === cartitem.edition
            })

            if(!isincart){
                cart.push(cartitem)
                localStorage.getItem("cart", JSON.stringify(cart))
                alert(`Added ${gamename} (${editionTypeText}) to cart.`);
            }
            else{
                alert(`${gamename} (${editionTypeText}) is already in the cart.`);
            }
        })
    })
})