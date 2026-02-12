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

  // تغيير محاذاة النصوص تلقائيًا (مثال للhero-center)
  document.querySelectorAll('.hero-center').forEach(el => {
    el.style.textAlign = lang === 'ar' ? 'right' : 'left';
  });

  // تغيير موقع Dropdown حسب الاتجاه
  const langDropdown = document.querySelector('.language-dropdown');
  if (langDropdown) {
    if (lang === 'ar') {
      langDropdown.style.left = '20px';
      langDropdown.style.right = 'auto';
    } else {
      langDropdown.style.right = '20px';
      langDropdown.style.left = 'auto';
    }
  }

  // مثال: تغيير loginTitle
  const el = document.getElementById('loginTitle');
  if(el){
      const text = el.getAttribute(`data-${lang}`);
      el.innerHTML = text.replace('|', '<br>');
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
  if(languageSelect){
      languageSelect.value = savedLang;
  }
});