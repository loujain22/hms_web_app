function setLanguage(lang) {

  // تغيير النصوص
  document.querySelectorAll('[data-ar]').forEach(el => {
    el.textContent = el.getAttribute(`data-${lang}`);
  });

  // تغيير الاتجاه واللغة
  if (lang === 'ar') {
    document.documentElement.dir = 'rtl';
    document.documentElement.lang = 'ar';
  } else {
    document.documentElement.dir = 'ltr';
    document.documentElement.lang = 'en';
  }

  // حفظ اللغة
  localStorage.setItem('lang', lang);
}


// عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function () {
  const savedLang = localStorage.getItem('lang') || 'ar'; // الافتراضي عربي
  setLanguage(savedLang);
});
