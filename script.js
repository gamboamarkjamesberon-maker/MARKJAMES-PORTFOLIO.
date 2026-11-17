document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const menuToggle = document.getElementById('menuToggle');
  const mobileNav = document.getElementById('mobileNav');

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    });

    mobileNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Scroll Reveal Observer
  const revealItems = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealItems.forEach((el) => observer.observe(el));

  // Certificate Modal Data
  const certificates = {
    csharp: {
      badge: 'CODECHUM C# · VERIFIED',
      score: '99.8% · 1312/1315',
      subtitle: 'C# Programming 1 (1F3-ITC112-CSharp)',
      description:
        'has successfully completed C# Programming 1 in 1F3-ITC112-CSharp with a total score of 1312/1315 at Mindoro State University.',
      date: 'Nov. 8, 2026',
      id: '32405',
      rawScore: '1312 / 1315',
      url: 'https://minsu.codechum.com/certificates/32405'
    },
    clang: {
      badge: 'CODECHUM C · VERIFIED',
      score: '99.0% · 1352/1365',
      subtitle: 'C Programming 1 (1F3-ITC112)',
      description:
        'has successfully completed C Programming 1 in 1F3-ITC112 with a total score of 1352/1365 at Mindoro State University.',
      date: 'Nov. 8, 2026',
      id: '32362',
      rawScore: '1352 / 1365',
      url: 'https://minsu.codechum.com/certificates/32362'
    }
  };

  const modal = document.getElementById('certModal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const modalDoneBtn = document.getElementById('modalDoneBtn');

  function openCertModal(key) {
    const data = certificates[key];
    if (!data || !modal) return;

    document.getElementById('modalBadge').textContent = data.badge;
    document.getElementById('modalScore').textContent = data.score;
    document.getElementById('modalSubtitle').textContent = data.subtitle;
    document.getElementById('modalDescription').textContent = data.description;
    document.getElementById('modalDate').textContent = data.date;
    document.getElementById('modalCertId').textContent = data.id;
    document.getElementById('modalRawScore').textContent = data.rawScore;
    document.getElementById('modalVerifyLink').href = data.url;

    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
  }

  function closeCertModal() {
    if (!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
  }

  document.querySelectorAll('.cert-card').forEach((card) => {
    card.addEventListener('click', () => {
      openCertModal(card.dataset.cert);
    });
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openCertModal(card.dataset.cert);
      }
    });
  });

  if (closeModalBtn) closeModalBtn.addEventListener('click', closeCertModal);
  if (modalDoneBtn) modalDoneBtn.addEventListener('click', closeCertModal);

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeCertModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeCertModal();
  });

  // Copy Email Button
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', async () => {
      const email = copyEmailBtn.dataset.email;
      try {
        await navigator.clipboard.writeText(email);
        const original = copyEmailBtn.textContent;
        copyEmailBtn.textContent = 'Copied!';
        setTimeout(() => {
          copyEmailBtn.textContent = original;
        }, 2000);
      } catch {
        copyEmailBtn.textContent = email;
      }
    });
  }

  // Quick Message Form -> Opens Mail Client Pre-filled
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('senderName').value.trim();
      const message = document.getElementById('senderMessage').value.trim();
      const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
      const body = encodeURIComponent(`Hi Mark James (MJ),\n\n${message}\n\nFrom,\n${name}`);
      window.location.href = `mailto:gamboamarkjamesberon@gmail.com?subject=${subject}&body=${body}`;
    });
  }
});
