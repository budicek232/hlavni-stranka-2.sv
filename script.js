gsap.registerPlugin(ScrollTrigger);

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
        duration: 1.5,      // delší animace
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
          duration: 1.5,    // delší animace
          ease: "power2.out",
          delay: index * 0.05, // stagger zůstává stejný
        });
      }
    });
  });
});
