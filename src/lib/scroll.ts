/** Прокрутка к секции с учётом фиксированной шапки (scroll-margin-top задан в CSS). */
export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  if (id === "home") {
    history.replaceState(null, "", window.location.pathname);
  } else {
    history.replaceState(null, "", `#${id}`);
  }
}

export function handleAnchorClick(e: React.MouseEvent<HTMLAnchorElement>, id: string, before?: () => void) {
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
  e.preventDefault();
  before?.();
  // Ждём кадр, чтобы закрытое меню освободило прокрутку страницы
  requestAnimationFrame(() => requestAnimationFrame(() => scrollToSection(id)));
}
