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

document.addEventListener("DOMContentLoaded", () => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (!user) return;

    const libKey = `libraryItems_${user.username}`;
    const purchasedGames = JSON.parse(localStorage.getItem(libKey)) || [];

    const fullGames = allgames || [];
    const ownedGames = purchasedGames.map(p => {
        const full = fullGames.find(g => g.name === p.name);
        return { ...p, ...full };
    });

    const gamelist = document.getElementById("games-list");
    if (!gamelist) return;

    gamelist.innerHTML = "";

    if (ownedGames.length === 0) {
        gamelist.innerHTML = `<div class="games-index">No games in your library.</div>`;
        return;
    }

    ownedGames.forEach((game, index) => {
        const div = document.createElement("div");
        div.className = "games-index" + (index === 0 ? " active" : "");

        div.innerHTML = `
            <img src="${game.image}">
            <span>${game.name} - ${game.edition}</span>
        `;

        gamelist.appendChild(div);

        div.addEventListener("click", () => {
            document.querySelectorAll(".games-index").forEach(el => el.classList.remove("active"));
            div.classList.add("active");
            render(game);
        });

        if (index === 0) render(game);
    });
});


function render(game) {
    const titleEl = document.querySelector(".selected-title span");
    if (titleEl) {
        titleEl.textContent = `${game.name || "Unknown Game"}${game.edition ? " - " + game.edition : ""}`;
    }

    const descBox = document.querySelector(".selected-desc .full-description span");
    if (descBox) descBox.textContent = game.description || "No description available.";

    const details = document.querySelector(".selected-details");
    if (!details) return;

    details.querySelectorAll(".subdetail").forEach(detail => {
        const label = detail.querySelector(".subtitle")?.textContent.trim();
        const valueSpan = detail.querySelectorAll("span")[1];

        if (!label || !valueSpan) return;

        switch (label) {
            case "Developer":
                valueSpan.textContent = game.developer
                break;
            case "Publisher":
                valueSpan.textContent = game.publisher
                break;
        }
    });

    const bgElement = document.getElementById("library-body");
    if (bgElement && game.background) {
        bgElement.style.backgroundImage = `url('${game.background}')`;
        bgElement.style.backgroundSize = "cover";
        bgElement.style.backgroundPosition = "center";
        bgElement.style.backgroundRepeat = "no-repeat";
    }
}

