gsap.registerPlugin(ScrollTrigger);


const showBtn = document.getElementById("showBtn");
const allCards = document.querySelectorAll("#topics .card");
const categoryButtons = document.querySelectorAll(".category");
const categoryMenu = document.querySelector(".category_menu");
const sectionCategory = document.querySelector(".section-category");
const header = document.querySelector("header");
const mainTitle = document.querySelector(".main-title");
const subtitle = document.querySelector(".subtitle");


window.addEventListener("load", () => {
    const introTl = gsap.timeline({
        defaults: {
            ease: "power3.out"
        }
    });

    introTl

        .fromTo(
            header, {
                y: -60,
                opacity: 0
            }, {
                y: 0,
                opacity: 1,
                duration: 0.8
            },
            "+=0.1"
        )
        .fromTo(
            mainTitle, {
                y: 60,
                opacity: 0
            }, {
                y: 0,
                opacity: 1,
                duration: 1
            },
            "-=0.4"
        )
        .fromTo(
            subtitle, {
                y: 40,
                opacity: 0
            }, {
                y: 0,
                opacity: 1,
                duration: 0.8
            },
            "-=0.8"
        )
        .fromTo(
            showBtn, {
                scale: 0.8,
                opacity: 0
            }, {
                scale: 1,
                opacity: 1,
                duration: 0.7
            },
            "-=0.5"
        )
        .fromTo(
            categoryMenu, {
                opacity: 0,
                y: 40
            }, {
                opacity: 1,
                y: 0,
                duration: 0.7
            },
            "-=0.8"
        );

    gsap.to(
        showBtn, {
            duration: 1.5,
            boxShadow: "0px -2px 30px -1px rgba(255, 255, 255, 0.75)",
            repeat: -1,
            yoyo: true
        });
});


showBtn.addEventListener("click", () => {
    gsap.to("#topics", {
        opacity: 1,
        duration: 0.6,
        ease: "power3.out"
    });

    allCards.forEach((card, index) => {
        gsap.fromTo(card, {
            opacity: 0,
            y: 40
        }, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: index * 0.01,
            ease: "power3.out",
            scrollTrigger: {
                trigger: card,
                start: "top 100%",
                toggleActions: "play none none reverse"
            }
        });
    });

    gsap.to(showBtn, {
        opacity: 0,
        y: -30,
        duration: 0.8,
        ease: "power2.inOut",
        onComplete: () => showBtn.style.display = "none"
    });
});


categoryButtons.forEach(button => {
    button.addEventListener("click", () => {
        const category = button.textContent.trim().toLowerCase();
        categoryButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        gsap.to(allCards, {
            opacity: 0,
            y: 25,
            duration: 0.35,
            ease: "power2.inOut",
            onComplete: () => {
                allCards.forEach(card => {
                    card.style.display =
                        category === "vše" || card.dataset.category === category ?
                        "flex" :
                        "none";
                });
                ScrollTrigger.refresh();

                const visibleCards = Array.from(allCards).filter(
                    card => category === "vše" || card.dataset.category === category
                );
                gsap.fromTo(
                    visibleCards, {
                        opacity: 0,
                        y: 30
                    }, {
                        opacity: 1,
                        y: 0,
                        duration: 0.6,
                        ease: "power3.out",
                        stagger: 0.07
                    }
                );
            }
        });
    });
});


ScrollTrigger.create({
    trigger: sectionCategory,
    start: "top+=175 top",
    end: "+=1",
    onEnter: () => {
        gsap.to(categoryMenu, {
            width: "100%",
            height: "70px",
            borderRadius: 0,
            position: "fixed",
            top: 0,
            border: "none",
            background: "rgba(15,15,25,0.95)",
            boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
            backdropFilter: "blur(10px)",
            duration: 0.5,
            ease: "power3.inOut"
        });
    },
    onLeaveBack: () => {
        gsap.to(categoryMenu, {
            width: "1000px",
            borderRadius: 14,
            position: "relative",
            height: "80px",
            border: "1px solid rgba(255,255,255,0.07)",
            background: "rgba(255,255,255,0.04)",
            boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
            backdropFilter: "blur(12px)",
            duration: 0.6,
            ease: "power3.inOut"
        });
    }
});


ScrollTrigger.matchMedia({
  "(min-width: 769px)": function () {
    gsap.to("body", {
      background: "linear-gradient(360deg, #141414, #241a38, #131313, #0f1a29)",
      ease: "none",
      scrollTrigger: {
        trigger: "#topics",
        start: "top top",
        end: "bottom bottom",
        scrub: 3
      }
    });

    gsap.to("body", {
      backgroundPosition: "100% 50%",
      ease: "none",
      scrollTrigger: {
        trigger: "#topics",
        start: "top top",
        end: "bottom bottom",
        scrub: 2
      }
    });
  }
});




allCards.forEach(card => {
    card.addEventListener("mouseenter", () => {
        gsap.to(card, {
            scale: 1.03,
            duration: 0.05,
            ease: "power2.out"
        });
    });
    card.addEventListener("mouseleave", () => {
        gsap.to(card, {
            scale: 1.0,
            duration: 0.05,
            ease: "power2.inOut"
        });
    });
});