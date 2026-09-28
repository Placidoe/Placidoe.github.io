const progress = document.querySelector('.reading-progress')

function updateProgress() {
  if (!progress) return
  const height = document.documentElement.scrollHeight - window.innerHeight
  progress.style.width = `${height <= 0 ? 0 : Math.min(100, (window.scrollY / height) * 100)}%`
}

window.addEventListener('scroll', updateProgress, { passive: true })
updateProgress()

const tocLinks = [...document.querySelectorAll('.toc a[href^="#"]')]
const sections = tocLinks
  .map((link) => document.querySelector(link.getAttribute('href')))
  .filter(Boolean)

if (sections.length) {
  const observer = new IntersectionObserver((entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
    if (!visible) return
    tocLinks.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === `#${visible.target.id}`)
    })
  }, { rootMargin: '-18% 0px -70% 0px' })
  sections.forEach((section) => observer.observe(section))
}

const search = document.querySelector('#case-search')
const cards = [...document.querySelectorAll('[data-search]')]
const count = document.querySelector('#filter-count')
const empty = document.querySelector('#empty-search')

function filterCases() {
  if (!search) return
  const query = search.value.trim().toLocaleLowerCase()
  let visible = 0
  cards.forEach((card) => {
    const match = card.dataset.search.toLocaleLowerCase().includes(query)
    card.hidden = !match
    if (match) visible += 1
  })
  if (count) count.textContent = `${visible} / ${cards.length} cases`
  if (empty) empty.style.display = visible ? 'none' : 'block'
}

search?.addEventListener('input', filterCases)
filterCases()
