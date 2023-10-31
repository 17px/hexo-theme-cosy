export const useMagicCard = () => {
  const magicCards = document.querySelector(
    ".magic-cards"
  ) as HTMLElement | null;
  if (magicCards) {
    magicCards.onmousemove = (e: MouseEvent) => {
      const cards = document.getElementsByClassName("card");

      for (let i = 0; i < cards.length; i++) {
        const card = cards[i] as HTMLElement;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);
      }
    };
  }
};
