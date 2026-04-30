let totalPrice = 0;

document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("cart-list");
    const user = JSON.parse(localStorage.getItem("currentUser"))

    let cartitems= [];
    try {
        const stored = localStorage.getItem(`cartItems_${user.username}`);
        cartitems = stored ? JSON.parse(stored) : [];
    } catch (e) {
        console.error("Error loading cart:", e);
    }

    container.innerHTML = "";

    cartitems.forEach((cartItem, index) => {
        const game = allgames.find(g => g.name === cartItem.name);
        if (!game) return;

        const card = document.createElement("div");
        card.className = "cart-card";


        card.innerHTML = `
            <img src="${game.image}" alt="${game.name}">
            <div class="cart-title">
                <span>${game.name} (${cartItem.edition})</span>
            </div>
            <div class="cart-windows">
                <img src="Assets/icon_platform_win.png" alt="Windows">
            </div>
            <div class="cart-price">
                <span class="normal-price">${game.normalPrice}</span>
                <span class="final-price">${game.finalPrice}</span>
            </div>
            <div class="cart-delete">
                <img src="Assets/trashcan-icon.png" class="delete default">
                <img src="Assets/trashcan-icon-hovered.png" class="delete hovered">
            </div>
        `;
        
        let gamePrice = parseFloat(game.finalPrice.replace("$", ""))
        totalPrice += gamePrice;

        document.querySelector(".total-price").innerText = `$${totalPrice.toFixed(2)}`;

        card.addEventListener("click", (e) => {
            const deleteBtn = e.target.closest(".cart-delete");
            if (!deleteBtn){
                localStorage.setItem("selectedGame", JSON.stringify(game));
                window.location.href = "game.html"
            }
        });

        // delete
        const deleteBtn = card.querySelector(".cart-delete");
        deleteBtn.addEventListener("click", () => {
            let gamePrice = parseFloat(game.finalPrice.replace("$", ""))
            totalPrice -= gamePrice
            document.querySelector(".total-price").innerText = `$${totalPrice.toFixed(2)}`;

            cartitems.splice(index, 1);
            localStorage.setItem(`cartItems_${user.username}`, JSON.stringify(cartitems));
            card.remove();
        });

        container.appendChild(card);
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

document.addEventListener("DOMContentLoaded", () =>{
    const user = JSON.parse(localStorage.getItem("currentUser"));
    const container = document.querySelector(".purchase-list");

    if (!user || !container) return;

    let cartitems = [];
    try {
        const stored = localStorage.getItem(`cartItems_${user.username}`);
        cartitems = stored ? JSON.parse(stored) : [];
    } catch (e) {
        console.error("Error loading cart items:", e);
        return;
    }

    let totalPrice = 0;
    const currentDate = new Date().toLocaleDateString();

    container.innerHTML = `<span id="confirm-title">Confirm your Order</span>`;

    cartitems.forEach(cartItem =>{
        const game = allgames.find(g => g.name === cartItem.name);

        const price = parseFloat(game.finalPrice.replace("$", "")) || 0;
        totalPrice += price;

        const purchase = document.createElement("div");
        purchase.className = "purchase-card"

        purchase.innerHTML = `
            <img src="${game.image}" alt="${game.name}">
            <div class="purchase-body">
                <span class="purchase-title">${cartItem.name} ${cartItem.edition}</span>
                <span class="purchase-price">${game.finalPrice}</span>
            </div>
        `

        container.appendChild(purchase);
    })

    const receiptInfo = document.createElement("div");
    receiptInfo.className = "receipt-info";
    receiptInfo.innerHTML = `
        <div class="receipient">
            <span>Account Name: ${user.username}</span>
            <span>Date Issued: ${currentDate}</span>
        </div>
        <div class="receipt-total">
            <span>Total: $${totalPrice.toFixed(2)}</span>
        </div>
    `;
    container.appendChild(receiptInfo);
})

document.addEventListener("DOMContentLoaded", () =>{
    const paymentCards = document.querySelectorAll(".payment-card");

    paymentCards.forEach(card => {
        card.addEventListener("click", () =>{
            paymentCards.forEach(c => c.classList.remove("selected-payment"))

            card.classList.add("selected-payment");
        })
    })
})

document.addEventListener("DOMContentLoaded", () =>{
    const continueBtn = document.getElementById("purchase-button")
    const popup = document.getElementById("popup");
    const content = document.querySelector(".popup-content");
    const popupblock = document.querySelector(".popup-block")

    if (continueBtn && popup) {
        continueBtn.addEventListener("click", (e) =>{
            e.stopPropagation();
            popup.classList.add("show");
        })
    }

    document.addEventListener("click", function (e) {
    // Check if the popup is visible
        if (popup.style.display !== "none" && !popupblock.contains(e.target)) {
            popup.classList.remove("show");
        }
    });
})

document.addEventListener("DOMContentLoaded", () => {
    const confirmbtn = document.querySelector(".purchase-button span");

    if (!confirmbtn) return;

    confirmbtn.addEventListener("click", () => {
        const user = JSON.parse(localStorage.getItem("currentUser"));
        if (!user) return;

        const cartKey = `cartItems_${user.username}`;
        const libKey = `libraryItems_${user.username}`;

        let cartItems = JSON.parse(localStorage.getItem(cartKey)) || [];

        if (cartItems.length === 0) {
            alert("Your cart is empty.");
            return;
        }

        localStorage.removeItem(cartKey);
        let libraryItems = JSON.parse(localStorage.getItem(libKey)) || [];

        cartItems.forEach(item => {
            const exists = libraryItems.some(lib => lib.name === item.name && lib.edition === item.edition);
            if (!exists) {
                libraryItems.push(item);
            }
        });
        localStorage.setItem(libKey, JSON.stringify(libraryItems));

        alert("Payment confirmed! Games added to your library.");
        window.location.href = "library.html";
    });
});

