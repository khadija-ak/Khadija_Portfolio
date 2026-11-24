(() => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav-links');
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }));

  const roles = ['Full Stack Developer', 'Frontend Developer', 'Digital Marketing Learner'];
  const roleNode = document.getElementById('typed-role');
  let roleIndex = 0, charIndex = 0, deleting = false;
  function typeRole() {
    const current = roles[roleIndex];
    roleNode.textContent = current.slice(0, charIndex);
    if (!deleting && charIndex < current.length) {
      charIndex++; setTimeout(typeRole, 72);
    } else if (!deleting) {
      deleting = true; setTimeout(typeRole, 1450);
    } else if (charIndex > 0) {
      charIndex--; setTimeout(typeRole, 35);
    } else {
      deleting = false; roleIndex = (roleIndex + 1) % roles.length; setTimeout(typeRole, 250);
    }
  }
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) typeRole();
  else roleNode.textContent = roles[0];

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  const filterButtons = document.querySelectorAll('.filter');
  const projectCards = document.querySelectorAll('.project-card');
  filterButtons.forEach(button => button.addEventListener('click', () => {
    filterButtons.forEach(item => item.classList.remove('active'));
    button.classList.add('active');
    const category = button.dataset.filter;
    projectCards.forEach(card => {
      card.hidden = category !== 'all' && card.dataset.category !== category;
    });
  }));

  const sections = [...document.querySelectorAll('main section[id]')];
  const navLinks = [...document.querySelectorAll('.nav-links a')];
  const activeObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
      }
    });
  }, { rootMargin: '-35% 0px -55% 0px' });
  sections.forEach(section => activeObserver.observe(section));
})();