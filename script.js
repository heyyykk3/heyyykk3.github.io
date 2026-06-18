const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const typedItems = document.querySelectorAll(".type-text");

function typeText(element) {
  if (element.dataset.started === "true") return;

  element.dataset.started = "true";
  const text = element.dataset.text || "";

  if (prefersReducedMotion) {
    element.textContent = text;
    element.classList.add("done");
    return;
  }

  let index = 0;
  element.textContent = "";

  const timer = window.setInterval(() => {
    element.textContent += text.charAt(index);
    index += 1;

    if (index >= text.length) {
      window.clearInterval(timer);
      element.classList.add("done");
    }
  }, 24);
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        typeText(entry.target);
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.45 },
);

typedItems.forEach((item) => observer.observe(item));
