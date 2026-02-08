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

  const el = document.getElementById('loginTitle');
  const text = el.getAttribute(`data-${lang}`);
  
  // استخدمنا | كفاصل بين السطرين
  el.innerHTML = text.replace('|', '<br>');

  // حفظ اللغة
  localStorage.setItem('lang', lang);
}


// عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function () {
  const savedLang = localStorage.getItem('lang') || 'ar'; // الافتراضي عربي
  setLanguage(savedLang);
});


document.addEventListener('DOMContentLoaded', function () {
  const savedLang = localStorage.getItem('lang') || 'ar'; // الافتراضي عربي
  setLanguage(savedLang);

  // تحديث قيمة Dropdown حسب اللغة المحفوظة
  const languageSelect = document.getElementById('languageSelect');
  if(languageSelect){
      languageSelect.value = savedLang;
  }
});

// تغيير موقع Dropdown حسب الاتجاه
const langDropdown = document.querySelector('.language-dropdown');
if(langDropdown){
    if(lang === 'ar'){
        langDropdown.style.left = '20px';
        langDropdown.style.right = 'auto';
    } else {
        langDropdown.style.right = '20px';
        langDropdown.style.left = 'auto';
    }
}


