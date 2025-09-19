document.addEventListener("DOMContentLoaded", function () {
    "use strict";

    // Navbar on scrolling
    window.addEventListener("scroll", function () {
        const navbar = document.querySelector(".navbar");
        if (window.scrollY > 200) {
            navbar.style.display = "flex";
            navbar.style.opacity = 1;
        } else {
            navbar.style.display = "none";
            navbar.style.opacity = 0;
        }
    });

    // Smooth scrolling on the navbar links
    document.querySelectorAll(".navbar-nav a").forEach(link => {
        link.addEventListener("click", function (event) {
            if (this.hash !== "") {
                event.preventDefault();
                const target = document.querySelector(this.hash);
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 45,
                        behavior: "smooth"
                    });

                    // Active class handling
                    document.querySelectorAll(".navbar-nav .active").forEach(el => el.classList.remove("active"));
                    this.classList.add("active");
                }
            }
        });
    });

    // Modal Video
    let videoSrc = "";
    document.querySelectorAll(".btn-play").forEach(btn => {
        btn.addEventListener("click", function () {
            videoSrc = this.getAttribute("data-src");
        });
    });

    const videoModal = document.getElementById("videoModal");
    if (videoModal) {
        videoModal.addEventListener("shown.bs.modal", function () {
            document.getElementById("video").setAttribute(
                "src",
                videoSrc + "?autoplay=1&modestbranding=1&showinfo=0"
            );
        });
        videoModal.addEventListener("hide.bs.modal", function () {
            document.getElementById("video").setAttribute("src", videoSrc);
        });
    }

    // Scroll to Bottom
    const scrollBottom = document.querySelector(".scroll-to-bottom");
    window.addEventListener("scroll", function () {
        if (scrollBottom) {
            scrollBottom.style.display = window.scrollY > 100 ? "none" : "block";
        }
    });

    // Portfolio isotope and filter (requires Isotope lib)
    const portfolioContainer = document.querySelector(".portfolio-container");
    if (portfolioContainer && typeof Isotope !== "undefined") {
        const portfolioIsotope = new Isotope(portfolioContainer, {
            itemSelector: ".portfolio-item",
            layoutMode: "fitRows"
        });

        document.querySelectorAll("#portfolio-flters li").forEach(filter => {
            filter.addEventListener("click", function () {
                document.querySelectorAll("#portfolio-flters li").forEach(el => el.classList.remove("active"));
                this.classList.add("active");
                portfolioIsotope.arrange({ filter: this.getAttribute("data-filter") });
            });
        });
    }

    // Back to top button
    const backToTop = document.querySelector(".back-to-top");
    window.addEventListener("scroll", function () {
        if (backToTop) {
            backToTop.style.display = window.scrollY > 200 ? "block" : "none";
        }
    });

    if (backToTop) {
        backToTop.addEventListener("click", function (e) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    // Gallery carousel (requires OwlCarousel replacement, e.g. Swiper)
    // OwlCarousel is a jQuery plugin, so here’s a note:
    // You’ll need to switch to a vanilla JS carousel (like SwiperJS).
});

