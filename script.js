const typeItems = Array.from(document.querySelectorAll(".scroll-type"));
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function sectionProgress(section) {
  const rect = section.getBoundingClientRect();
  const viewport = window.innerHeight || document.documentElement.clientHeight;
  const start = viewport * 0.68;
  const end = -rect.height + viewport * 0.55;

  if (rect.top >= start) return 0;
  if (rect.top <= end) return 1;

  return clamp((start - rect.top) / (start - end), 0, 1);
}

function updateText() {
  typeItems.forEach((item) => {
    const text = item.dataset.text || "";

    if (reduceMotion) {
      item.textContent = text;
      item.classList.add("complete");
      return;
    }

    const section = item.closest(".page-section");
    const siblings = Array.from(section.querySelectorAll(".scroll-type"));
    const index = siblings.indexOf(item);
    const progress = sectionProgress(section);
    const itemStart = siblings.length === 1 ? 0 : index / siblings.length;
    const itemEnd = siblings.length === 1 ? 1 : (index + 1) / siblings.length;
    const localProgress = clamp((progress - itemStart) / (itemEnd - itemStart), 0, 1);
    const length = Math.floor(text.length * localProgress);

    item.textContent = text.slice(0, length);
    item.classList.toggle("complete", length >= text.length);
  });
}

window.addEventListener("scroll", updateText, { passive: true });
window.addEventListener("resize", updateText);
updateText();
