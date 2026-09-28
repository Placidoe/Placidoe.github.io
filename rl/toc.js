(() => {
  const lesson = document.querySelector(".lesson");
  if (!lesson) return;

  const headings = [...lesson.querySelectorAll(":scope > section > h2")];
  if (headings.length < 2) return;

  if (!document.getElementById("lesson-toc-style")) {
    const style = document.createElement("style");
    style.id = "lesson-toc-style";
    style.textContent = `
      .toc { width:calc(100% - 32px); max-height:220px; margin:24px auto 0; padding:15px; overflow:auto; border:1px solid #dce0e9; border-radius:11px; background:#fff; }
      .toc-title { margin:0 0 10px; color:#687086; font:500 10px "DM Mono", monospace; letter-spacing:.1em; }
      .toc nav { display:grid!important; grid-template-columns:1fr; gap:4px; height:auto!important; }
      .toc a { display:block!important; padding:6px 7px; border-left:2px solid transparent; border-radius:4px; color:#697284; font:11px/1.35 "DM Sans", sans-serif; }
      .toc a span { display:inline-block; width:27px; color:#9ba3b5; font:500 10px "DM Mono", monospace; }
      .toc a:hover { color:#6152e9; background:#eef0ff; }
      .toc a.active { border-left-color:#6152e9; color:#29225e; background:#eceafd; }
      .toc a.active span { color:#6152e9; }
      @media (min-width:761px) {
        .toc { position:fixed; z-index:20; top:112px; left:0; width:270px; max-height:calc(100vh - 140px); margin:0; padding:15px 11px 15px 15px; overflow:hidden; border:1px solid #dce0e9; border-left:0; border-radius:0 11px 11px 0; background:rgba(255,255,255,.98); box-shadow:0 6px 16px rgba(25,34,62,.10); transform:translateX(-242px); transition:transform .16s ease-out; will-change:transform; contain:layout paint style; }
        .toc::after { content:"目录"; position:absolute; top:18px; right:0; display:flex; width:28px; height:94px; align-items:center; justify-content:center; border-radius:0 10px 10px 0; color:#6152e9; background:#f4f3ff; font:500 10px "DM Mono", monospace; letter-spacing:.08em; writing-mode:vertical-rl; }
        .toc:hover, .toc:focus-within { overflow:auto; transform:translateX(0); }
        .toc:not(:hover):not(:focus-within) .toc-title, .toc:not(:hover):not(:focus-within) nav { visibility:hidden; }
        .toc:hover::after, .toc:focus-within::after { display:none; }
        .toc nav { grid-template-columns:1fr!important; gap:3px; }
        .toc a { min-width:0; white-space:normal; }
      }
      @media (prefers-reduced-motion:reduce) { .toc { transition:none!important; } }
    `;
    document.head.append(style);
  }

  headings.forEach((heading, index) => {
    const section = heading.closest("section");
    section.id ||= `section-${String(index + 1).padStart(2, "0")}`;
  });

  const toc = document.createElement("aside");
  toc.className = "toc";
  toc.setAttribute("aria-label", "本页目录");
  toc.innerHTML = `<p class="toc-title">本页目录 · IN THIS LESSON</p><nav>${headings.map((heading, index) => {
    const id = heading.closest("section").id;
    return `<a href="#${id}" data-toc-target="${id}"><span>${String(index + 1).padStart(2, "0")}</span>${heading.textContent.trim()}</a>`;
  }).join("")}</nav>`;
  document.querySelector(".lesson-hero")?.after(toc);

  const links = [...toc.querySelectorAll("a[data-toc-target]")];
  const setActive = (id) => links.forEach((link) => link.classList.toggle("active", link.dataset.tocTarget === id));
  setActive(headings[0].closest("section").id);

  const observer = new IntersectionObserver((entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
    if (visible) setActive(visible.target.id);
  }, {rootMargin: "-18% 0px -68% 0px", threshold: 0});
  headings.forEach((heading) => observer.observe(heading.closest("section")));
})();
