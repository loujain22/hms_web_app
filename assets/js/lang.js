



function setLanguage(lang) {
  window.currentLang = lang;

  // تحديد التاب الحالي قبل التغيير
  const activeLink = document.querySelector('.nav-link.active');
  const activeTarget = activeLink?.getAttribute('data-target') || activeLink?.getAttribute('href');

  // تغيير اتجاه الصفحة واللغة
  if (lang === 'ar') {
    document.documentElement.dir = 'rtl';
    document.documentElement.lang = 'ar';
  } else {
    document.documentElement.dir = 'ltr';
    document.documentElement.lang = 'en';
  }

  // تحديث كل النصوص حسب اللغة
  document.querySelectorAll('[data-ar][data-en]').forEach(el => {
    el.textContent = el.getAttribute(`data-${lang}`);
  });

  // تغيير محاذاة النصوص تلقائيًا
  document.querySelectorAll('.hero-center').forEach(el => {
    el.style.textAlign = lang === 'ar' ? 'right' : 'left';
  });

  // إعادة تفعيل نفس التاب بعد تغيير اللغة
  if (activeTarget) {
    document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
    const currentLink = Array.from(document.querySelectorAll('.nav-link')).find(
      link => link.getAttribute('data-target') === activeTarget || link.getAttribute('href') === activeTarget
    );
    if (currentLink) currentLink.classList.add('active');

    // تحديث العنوان حسب التاب الحالي
    const pageTitle = document.getElementById('page-title');
    if (pageTitle) {
      const title = currentLink.querySelector('.item-name')?.getAttribute(`data-${lang}`) || pageTitle.getAttribute(`data-${lang}`);
      pageTitle.textContent = title;
    }
  }


/* =========== Sidebar Tooltip ================ */

  if (typeof refreshSidebarTooltips === 'function') {
    refreshSidebarTooltips();
  }



  // حفظ اللغة
  localStorage.setItem('lang', lang);
}


// عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function () {
  const savedLang = localStorage.getItem('lang') || 'ar'; // الافتراضي عربي
  setLanguage(savedLang);

  // تحديث Dropdown إذا موجود
  const languageSelect = document.getElementById('languageSelect');
  if (languageSelect) {
    languageSelect.value = savedLang;
  }
});