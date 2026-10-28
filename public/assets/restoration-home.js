(function(){
function init(){

  const menu = document.querySelector('.menu-toggle');
  const mobile = document.getElementById('mobileMenu');
  menu?.addEventListener('click', () => {
    const opened = menu.getAttribute('aria-expanded') !== 'true';
    menu.setAttribute('aria-expanded', String(opened));
    menu.setAttribute('aria-label', opened ? '메뉴 닫기' : '메뉴 열기');
    mobile.classList.toggle('open', opened);
  });
  mobile?.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => {
    mobile.classList.remove('open');
    menu?.setAttribute('aria-expanded', 'false');
    menu?.setAttribute('aria-label', '메뉴 열기');
  }));
  const checks = Array.from(document.querySelectorAll('.prep-check'));
  const counter = document.getElementById('checkCounter');
  checks.forEach((check) => check.addEventListener('change', () => {
    counter.textContent = `준비된 항목 ${checks.filter((input) => input.checked).length} / ${checks.length}`;
  }));

}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
