const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#main-nav');
function closeMenu() {
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open navigation');
  navigation.classList.remove('is-open');
}
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  navigation.classList.toggle('is-open', open);
});
navigation.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
    closeMenu(); menuButton.focus();
  }
});
document.addEventListener('click', event => { if (!event.target.closest('.site-header')) closeMenu(); });
matchMedia('(min-width: 651px)').addEventListener('change', event => { if(event.matches) closeMenu(); });
const navLinks = [...navigation.querySelectorAll('a')];
const sections = navLinks.map(link => document.querySelector(link.getAttribute('href')));
function updateActiveSection() {
  let active = null;
  for (const section of sections) if (section.getBoundingClientRect().top <= 170) active = section.id;
  if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 10) active = 'contact';
  navLinks.forEach(link => {
    if(link.hash === '#' + active) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
}
let scrollQueued = false;
window.addEventListener('scroll', () => {
  if (!scrollQueued) requestAnimationFrame(() => {updateActiveSection(); scrollQueued = false;});
  scrollQueued = true;
}, {passive:true});
updateActiveSection();
document.querySelector('#year').textContent = new Date().getFullYear();
document.querySelector('.copy-email').addEventListener('click', async () => {
  const status = document.querySelector('.copy-status');
  try { await navigator.clipboard.writeText('screed@rosesantiques.com'); status.textContent = 'Email address copied.'; }
  catch { status.textContent = 'Please select and copy the email address above.'; }
});
