(() => {
  const lesson = document.querySelector(".lesson");
  if (!lesson) return;

  const headings = [...lesson.querySelectorAll(":scope > section > h2")];
  if (headings.length < 2) return;

  if (!document.getElementById("lesson-toc-style")) {
    const style = document.createElement("style");
    style.id = "lesson-toc-style";
    style.textContent = `.toc{position:fixed;z-index:20;top:112px;left:max(16px,calc(50% - 650px));width:196px;max-height:calc(100vh - 140px);padding:15px 11px 15px 0;overflow:auto;border-right:1px solid #dce0e9;background:transparent;transition:width .2s ease,box-shadow .2s ease,background .2s ease}.toc-title{margin:0 0 10px;color:#687086;font:500 10px "DM Mono",monospace;letter-spacing:.1em}.toc nav{display:grid!important;grid-template-columns:1fr;gap:2px;height:auto!important}.toc a{display:block!important;padding:6px 7px;border-left:2px solid transparent;color:#697284;font:11px/1.35 "DM Sans",sans-serif}.toc a span{display:inline-block;width:27px;color:#9ba3b5;font:500 10px "DM Mono",monospace}.toc a:hover{color:#6152e9;background:#eef0ff}.toc a.active{border-left-color:#6152e9;color:#29225e;background:#eceafd}.toc a.active span{color:#6152e9}@media(max-width:1279px) and (min-width:761px){.toc{left:12px;width:30px;max-height:calc(100vh - 150px);padding:12px 7px;overflow:hidden;border:1px solid #dce0e9;border-radius:11px;background:rgba(255,255,255,.94);box-shadow:0 4px 16px rgba(25,34,62,.08);cursor:default}.toc:hover,.toc:focus-within{width:min(270px,calc(100vw - 44px));overflow:auto;background:#fff;box-shadow:0 16px 34px rgba(25,34,62,.18)}.toc-title{white-space:nowrap;opacity:0;transition:opacity .12s ease}.toc:hover .toc-title,.toc:focus-within .toc-title{opacity:1}.toc nav{gap:4px}.toc a{min-width:244px;border-left:0;border-radius:5px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.toc a.active{border-left:0}.toc:not(:hover):not(:focus-within) a{padding:6px 0;text-align:center}.toc:not(:hover):not(:focus-within) a span{width:auto;color:#6152e9}.toc:not(:hover):not(:focus-within) a{font-size:0}.toc:not(:hover):not(:focus-within) a span{font-size:10px}}@media(max-width:760px){.toc{position:static;width:calc(100% - 32px);max-height:220px;margin:24px auto 0;padding:15px;overflow:auto;border:1px solid #dce0e9;border-radius:11px;background:#fff;box-shadow:none}.toc-title{opacity:1}.toc nav{grid-template-columns:1fr!important;gap:4px}.toc a{min-width:0;border-left:0;border-radius:5px;white-space:normal}.toc a.active{border-left:0}}`;
    document.head.append(style);
    style.textContent += `@media(max-width:1440px) and (min-width:761px){.toc{right:12px!important;left:auto!important;width:30px;max-height:calc(100vh - 150px);padding:12px 7px;overflow:hidden;border:1px solid #dce0e9;border-radius:11px;background:rgba(255,255,255,.94);box-shadow:0 4px 16px rgba(25,34,62,.08);cursor:default}.toc:hover,.toc:focus-within{width:min(270px,calc(100vw - 44px));overflow:auto;background:#fff;box-shadow:0 16px 34px rgba(25,34,62,.18)}.toc-title{white-space:nowrap;opacity:0;transition:opacity .12s ease}.toc:hover .toc-title,.toc:focus-within .toc-title{opacity:1}.toc nav{gap:4px}.toc a{min-width:244px;border-left:0;border-radius:5px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.toc a.active{border-left:0}.toc:not(:hover):not(:focus-within) a{padding:6px 0;text-align:center;font-size:0}.toc:not(:hover):not(:focus-within) a span{width:auto;color:#6152e9;font-size:10px}}`;
  }

  if (!document.getElementById("lesson-toc-hover-style")) {
    const hoverStyle = document.createElement("style");
    hoverStyle.id = "lesson-toc-hover-style";
    hoverStyle.textContent = `@media(min-width:761px){.toc{top:112px!important;left:0!important;right:auto!important;width:270px!important;max-height:calc(100vh - 140px);padding:15px 11px 15px 15px;overflow:hidden;border:1px solid #dce0e9;border-left:0;border-radius:0 11px 11px 0;background:rgba(255,255,255,.98);box-shadow:0 8px 22px rgba(25,34,62,.12);transform:translateX(-242px);transition:transform .22s ease;cursor:default}.toc::after{content:"目录";position:absolute;top:0;right:0;width:28px;height:100%;display:flex;align-items:center;justify-content:center;color:#6152e9;background:#f4f3ff;font:500 10px "DM Mono",monospace;letter-spacing:.08em;writing-mode:vertical-rl}.toc:hover,.toc:focus-within{transform:translateX(0);overflow:auto}.toc:hover::after,.toc:focus-within::after{display:none}.toc-title{opacity:1;white-space:nowrap}.toc nav{grid-template-columns:1fr!important;gap:3px}.toc a{min-width:0;border-left:2px solid transparent;border-radius:4px;white-space:normal;overflow:visible;text-overflow:clip}.toc a.active{border-left-color:#6152e9}}@media(max-width:760px){.toc{transform:none!important}.toc::after{display:none}}`;
    document.head.append(hoverStyle);
    hoverStyle.textContent += `@media(min-width:761px){.toc::after{top:18px!important;height:94px!important;border-radius:0 10px 10px 0}}`;
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
    const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
    if (visible) setActive(visible.target.id);
  }, {rootMargin: "-18% 0px -68% 0px", threshold: 0});
  headings.forEach((heading) => observer.observe(heading.closest("section")));
})();
