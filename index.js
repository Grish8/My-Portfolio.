function rateMe() {
    document.getElementById("ratingModal").style.display = "block";
}

function closeModal() {
    document.getElementById("ratingModal").style.display = "none";
}

function submitRating() {
    let rating = document.querySelector('input[name="star"]:checked');
    if (rating) {
        localStorage.setItem("userRating", rating.value);
        alert("Thank you for rating: " + rating.value + " stars!");
        closeModal();
        window.location.href = ""; // Redirect to ratings page
    } else {
        alert("Please select a star rating before submitting.");
    }
}




// Function to Toggle Menu Visibility
function toggleMenu() {
    var nav = document.getElementById("nav-menu");
    nav.classList.toggle("active"); // Adds or removes 'active' class
}

// Function to Close Menu
function closeMenu() {
    document.getElementById("nav-menu").classList.remove("active"); // Hides menu
}