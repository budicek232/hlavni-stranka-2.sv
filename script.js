gsap.registerPlugin(ScrollTrigger);

const showBtn = document.getElementById("showBtn");
const cards = document.querySelectorAll("#topics .card");
const categoryButtons = document.querySelectorAll(".category");
const allCards = document.querySelectorAll("#topics .card");
const categoryMenu = document.querySelector(".category_menu");
const sectionCategory = document.querySelector(".section-category");


showBtn.addEventListener("click", () => {
  gsap.to("#topics", {
    opacity: 1,
    duration: 0.5,
    ease: "power3.inOut"
  });

  cards.forEach((card, index) => {
    ScrollTrigger.create({
      trigger: card,
      start: "top 100%",
      onEnter: () => {
        gsap.to(card, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power3.out",
          delay: index * 0.04
        });
      },
      onLeaveBack: () => {
        gsap.to(card, {
          opacity: 0,
          y: 40,
          duration: 0.8,
          ease: "power2.inOut"
        });
      }
    });
  });

  gsap.to(showBtn, {
    opacity: 0,
    y: -25,
    duration: 0.8,
    ease: "power2.inOut"
  });
});


categoryButtons.forEach(button => {
  button.addEventListener("click", () => {
    const category = button.textContent.trim().toLowerCase();
    categoryButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    // fade out všech karet
    gsap.to(allCards, {
      opacity: 0,
      y: 25,
      duration: 0.4,
      ease: "power2.inOut",
      onComplete: () => {
        allCards.forEach(card => {
          card.style.display = (category === "vše" || card.dataset.category === category) ? "block" : "none";
        });
        ScrollTrigger.refresh();
      }
    });

    
    setTimeout(() => {
      const visibleCards = Array.from(allCards).filter(card => 
        category === "vše" || card.dataset.category === category
      );
      gsap.fromTo(visibleCards,
        {opacity: 0, y: 30},
        {opacity: 1, y: 0, duration: 0.6, ease: "power3.out", stagger: 0.05}
      );
    }, 300);
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
      background: "rgba(20,20,20,0.95)",
      boxShadow: "0 8px 20px rgba(0,0,0,0.5)",
      backdropFilter: "blur(10px)",
      duration: 0.6,
      ease: "power3.inOut"
    });
  },
  onLeaveBack: () => {
    gsap.to(categoryMenu, {
      width: "1000px",
      borderRadius: 20,
      position: "relative",
      height: "100px",
      border: "2px solid #444",
      background: "rgba(30,30,30,0.9)",
      boxShadow: "0 6px 18px rgba(0,0,0,0.3)",
      backdropFilter: "blur(4px)",
      duration: 0.6,
      ease: "power3.inOut"
    });
  }
});


gsap.to("body", {
  background: "linear-gradient(360deg,rgb(24, 24, 24),rgb(36, 23, 53),rgb(19, 19, 19),rgb(15, 26, 41))",
  ease: "none",
  scrollTrigger: {
    trigger: "#topics",
    start: "top top",
    end: "bottom bottom",
    scrub: 10
  },
});

gsap.to("body", {
  backgroundPosition: "100% 50%",
  ease: "none",
  scrollTrigger: {
    trigger: "#topics",
    start: "top top",
    end: "bottom bottom",
    scrub: 1,
  },
});

