gsap.registerPlugin(ScrollTrigger);

// tlačítko "Zobrazit"
const showBtn = document.getElementById('showBtn');
const cards = document.querySelectorAll("#topics .card");

showBtn.addEventListener('click', () => {
  cards.forEach((card, index) => {
    const rect = card.getBoundingClientRect();

    // Karty ve viewportu se zobrazí hned
    if (rect.top < window.innerHeight) {
      gsap.to(card, {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "power2.out",
      });
    }

    // ScrollTrigger pro ostatní karty
    ScrollTrigger.create({
      trigger: card,
      start: "top 80%",
      onEnter: () => {
        gsap.to(card, {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: "power2.out",
          delay: index * 0.05,
        });
      }
    });
  });
});

// filtrování kategorií s animací
const categoryButtons = document.querySelectorAll('.category');
const cards2 = document.querySelectorAll('#topics .card');

categoryButtons.forEach(button => {
  button.addEventListener('click', () => {
    const category = button.textContent.trim().toLowerCase();

    // nejdřív schováme všechny karty plynule
    cards2.forEach(card => {
      gsap.to(card, {
        opacity: 0,
        y: 50,
        duration: 0.3,
        ease: "power2.inOut",
        onComplete: () => {
          // po schování nastavíme display
          if (category === 'vše' || card.dataset.category === category) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        }
      });
    });

    // po krátkém timeoutu znovu plynule zobrazíme vybrané
    setTimeout(() => {
      let visibleCards = Array.from(cards2).filter(card => 
        category === 'vše' || card.dataset.category === category
      );

      gsap.fromTo(visibleCards, 
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.5, 
          ease: "power2.out", 
          stagger: 0.05 
        }
      );
    }, 300);

    // refresh ScrollTrigger po filtrování
    ScrollTrigger.refresh();
  });
});



gsap.registerPlugin(ScrollTrigger);

const categoryMenu = document.querySelector(".category_menu");
const sectionCategory = document.querySelector(".section-category");

const originalWidth = categoryMenu.offsetWidth; // 1000px
const originalLeft = categoryMenu.getBoundingClientRect().left; // střední pozice
const originalTop = categoryMenu.offsetTop;

ScrollTrigger.create({
  trigger: sectionCategory,
  start: "top+=175 top",
  end: "+=1", // jen aktivace
  onEnter: () => {
    gsap.to(categoryMenu, {
      width: "100%",
      height: "75px",
      borderRadius: 0,
      position: "fixed",
      top: 0,
      borderLeft: "none",
      borderRight: "none",
      borderTop: "none",
      duration: 0.3,
      ease: "power2.out"
    });
  },
  onLeaveBack: () => {
    gsap.to(categoryMenu, {
      width: "1000px",
      borderRadius: 20,
      position: "relative",
      height: "100px",
      border: "3px solid black",
      duration: 0.3,
      ease: "power2.out"
    });
  }
});






