(() => {
  const lesson = document.querySelector(".lesson");
  if (!lesson) return;

  const headings = [...lesson.querySelectorAll(":scope > section > h2")];
  if (headings.length < 2) return;

  headings.forEach((heading, index) => {
    const section = heading.closest("section");
    section.id ||= `section-${String(index + 1).padStart(2, "0")}`;
  });

  const toc = document.createElement("aside");
  toc.className = "toc";
  toc.setAttribute("aria-label", "本页目录");
  toc.innerHTML = `<p class="toc-title">IN THIS LESSON</p><nav>${headings.map((heading, index) => {
    const id = heading.closest("section").id;
    return `<a href="#${id}" data-toc-target="${id}"><span>${String(index + 1).padStart(2, "0")}</span>${heading.textContent.trim()}</a>`;
  }).join("")}</nav>`;
  document.querySelector(".lesson-hero")?.after(toc);

  const links = [...toc.querySelectorAll("a[data-toc-target]")];
  const setActive = (id) => links.forEach((link) => link.classList.toggle("active", link.dataset.tocTarget === id));
  setActive(headings[0].closest("section").id);
  const observer = new IntersectionObserver((entries) => {
    const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
    if (visible) setActive(visible.target.id);
  }, {rootMargin: "-18% 0px -68% 0px", threshold: 0});
  headings.forEach((heading) => observer.observe(heading.closest("section")));
})();
