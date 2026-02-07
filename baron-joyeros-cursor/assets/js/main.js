(() => {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  const header = document.querySelector("[data-elevate]");
  const elevate = () => {
    if (!header) return;
    header.classList.toggle("is-elevated", window.scrollY > 4);
  };
  elevate();
  window.addEventListener("scroll", elevate, { passive: true });

  // Mobile nav
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.querySelector(".nav-menu");
  if (toggle && menu) {
    const setOpen = (open) => {
      menu.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.classList.toggle("nav-open", open);
    };

    toggle.addEventListener("click", () => {
      const open = !menu.classList.contains("is-open");
      setOpen(open);
    });

    document.addEventListener("click", (e) => {
      const t = e.target;
      if (!(t instanceof Element)) return;
      if (t.closest(".nav")) return;
      if (menu.classList.contains("is-open")) setOpen(false);
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && menu.classList.contains("is-open")) setOpen(false);
    });

    menu.addEventListener("click", (e) => {
      const t = e.target;
      if (!(t instanceof Element)) return;
      const link = t.closest("a");
      if (link) setOpen(false);
    });
  }

  // Scroll reveal
  const items = Array.from(document.querySelectorAll("[data-reveal]"));
  if (items.length) {
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("is-in"));
    } else {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-in");
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12 }
      );
      items.forEach((el) => io.observe(el));
    }
  }
})();

