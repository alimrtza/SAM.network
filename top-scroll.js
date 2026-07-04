const topScrollBtn = document.getElementById("scroll-to-top");
window.addEventListener("scroll", function() {

    if (window.scrollY > 0) {
        topScrollBtn.style.display = "block"
    } else { 
        topScrollBtn.style.display = "none"
    }
});