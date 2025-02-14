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
        window.location.href = "ratings.html"; // Redirect to ratings page
    } else {
        alert("Please select a star rating before submitting.");
    }
}

// Close modal when clicking outside of it
window.onclick = function(event) {
    let modal = document.getElementById("ratingModal");
    if (event.target === modal) {
        modal.style.display = "none";
    }
}