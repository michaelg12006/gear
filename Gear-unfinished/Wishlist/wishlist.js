document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector(".wishlists");

    let wishlist = [];
    let username = null;
    try {
        const currentUser = JSON.parse(localStorage.getItem("currentUser"));
        if (currentUser) {
            username = currentUser.username;
            const stored = localStorage.getItem(`wishlist_${username}`);
            wishlist = stored ? JSON.parse(stored) : [];
        } else {
            window.location.href = "../Login/login.html";
            return;
        }
    } catch (e) {
        console.error("Error loading wishlist:", e);
    }

    container.innerHTML = "";
    
    const wishlistcount = document.getElementById("count");
    wishlistcount.innerText = `(${wishlist.length})`

    wishlist.forEach(gameName => {
        const game = allgames.find(g => g.name === gameName);
        const card = document.createElement("div");
        card.classList.add(location);
        card.className = "wishlist-card";

        card.innerHTML = `
            <img src="${game.image}" alt="${game.name}">
            <div class="wishlist-desc">
                <div class="wishlist-title">
                    <span>${game.name}</span>
                    <img src="../Assets/icon_platform_win.png" alt="Platform">
                </div>
                <div class="wishlist-info">
                    <span>${game.category.join(", ")}</span>
                    <div class="price">
                        <span class="final-price">${game.finalPrice}</span>
                        <span class="normal-price">${game.normalPrice}</span>
                    </div>
                </div>
            </div>
        `;

        container.appendChild(card);

        card.addEventListener('click', () => {
            localStorage.setItem("selectedGame", JSON.stringify(game));
            window.location.href = "../GameProfile/game.html";
        })
    });
});

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
                window.location.href = "../Main/main.html";
            })
        }
    }
    else
    {
        const userBackground = document.querySelector('.user-background');
        userBackground.addEventListener('click', () => {
            window.location.href = "../Login/login.html";
        })
    }
});