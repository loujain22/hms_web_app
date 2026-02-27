



//------ Scroll Up ------------

function scrollUpSection() {
    document.getElementById("home-page").scrollIntoView({
        behavior: "smooth"
    });
}





// ------------------ Health Insurance & Auto Scroll Dawon ---------------


document.querySelectorAll('.page').forEach(page => {

    const checkbox = page.querySelector('.health_insurance_auto_scroll');
    const sections = page.querySelectorAll('.health_insurance_Section');
    const scrollTarget = page.querySelector('.mediacal_insurance_auto_scroll');

    if (!checkbox || sections.length === 0) return;

    checkbox.addEventListener('change', function () {

        sections.forEach(section => {
            section.classList.toggle('d-none', !this.checked);
        });

        // scroll فقط عند التفعيل
        if (this.checked && scrollTarget) {
            scrollTarget.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});







document.addEventListener("DOMContentLoaded", function () {
    const sidebar = document.querySelector('.sidebar');
    const links = document.querySelectorAll('.sidebar .nav-link');
    let tooltips = [];

    // تفعيل Tooltips لكل الروابط
    function enableTooltips() {
        links.forEach(el => {
            // استخدمي data-title لو موجود أو title من HTML
            const title = el.dataset.title || el.getAttribute('title') || el.textContent.trim();
            if (title) {
                el.setAttribute('data-bs-toggle', 'tooltip');
                el.setAttribute('data-bs-placement', 'right');
                el.setAttribute('title', title);
                tooltips.push(new bootstrap.Tooltip(el));
            }
        });
    }

    // تعطيل Tooltips
    function disableTooltips() {
        tooltips.forEach(t => t.dispose());
        tooltips = [];
        links.forEach(el => {
            el.removeAttribute('data-bs-toggle');
            el.removeAttribute('data-bs-placement');
            el.removeAttribute('title');
        });
    }

    // تحقق من حالة sidebar
    function checkSidebarState() {
        if (sidebar.classList.contains('sidebar-mini')) { // <-- الكلاس اللي يمثل collapsed
            enableTooltips();   // Sidebar مصغر → فعل Tooltips
        } else {
            disableTooltips();  // Sidebar مفتوح → إخفاء Tooltips
        }
    }

    // أول تحميل الصفحة
    checkSidebarState();

    // مراقبة أي تغيير في class الخاص بالـ sidebar
    new MutationObserver(checkSidebarState).observe(sidebar, {
        attributes: true,
        attributeFilter: ['class']
    });
});


// document.addEventListener("DOMContentLoaded", function () {
//     const sidebarLinks = document.querySelectorAll('.sidebar .nav-link[data-target]');
//     const pages = document.querySelectorAll('.page');

//     function showPage(pageId) {
//         pages.forEach(page => {
//             page.style.display = (page.id === pageId) ? 'block' : 'none';
//         });

//         sessionStorage.setItem('currentPage', pageId);
//     }

//     sidebarLinks.forEach(link => {
//         link.addEventListener('click', function (e) {
//             e.preventDefault();

//             sidebarLinks.forEach(l => l.classList.remove('active'));
//             this.classList.add('active');

//             const target = this.dataset.target;
//             if (target) {
//                 showPage(target);
//             }
//         });
//     });

//     const savedPage = sessionStorage.getItem('currentPage');
//     const defaultPage = document.body.dataset.defaultPage;

//     if (savedPage && document.getElementById(savedPage)) {
//         showPage(savedPage);

//         sidebarLinks.forEach(link => {
//             if (link.dataset.target === savedPage) {
//                 link.classList.add('active');
//             }
//         });
//     } 
//     else if (defaultPage && document.getElementById(defaultPage)) {
//         showPage(defaultPage);

//         sidebarLinks.forEach(link => {
//             if (link.dataset.target === defaultPage) {
//                 link.classList.add('active');
//             }
//         });
//     }
// });


document.addEventListener("DOMContentLoaded", function () {
    const sidebarLinks = document.querySelectorAll('.sidebar .nav-link[data-target]');
    const pages = document.querySelectorAll('.page');

    function showPage(pageId) {
        pages.forEach(page => {
            page.style.display = (page.id === pageId) ? 'block' : 'none';
        });

        // حفظ الصفحة الحالية في sessionStorage
        sessionStorage.setItem('currentPage', pageId);
    }

    sidebarLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            sidebarLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');

            const target = this.dataset.target;
            if (target) {
                showPage(target);
            }
        });
    });

    // عند تحميل الصفحة
    const savedPage = sessionStorage.getItem('currentPage');

    if (savedPage && document.getElementById(savedPage)) {
        showPage(savedPage);

        sidebarLinks.forEach(link => {
            if (link.dataset.target === savedPage) {
                link.classList.add('active');
            }
        });
    } else {
        // 👇 Clinics هي الصفحة الافتراضية
        showPage('details');

        sidebarLinks.forEach(link => {
            if (link.dataset.target === 'details') {
                link.classList.add('active');
            }
        });
    }
});


document.addEventListener('DOMContentLoaded', function () {

    // مثال: اللغة الحالية
    const currentLang = 'ar'; // أو 'en'

    // تهيئة جميع الـ buttons اللي فيها data-title
    const buttons = document.querySelectorAll('[data-title-ar][data-title-en]');

    buttons.forEach(btn => {
        // اختر الـ title المناسب حسب اللغة
        btn.setAttribute('title', currentLang === 'ar' ? btn.dataset.titleAr : btn.dataset.titleEn);

        // فعّل الـ Tooltip
        new bootstrap.Tooltip(btn);
    });

});




document.addEventListener("DOMContentLoaded", function () {

    const detailsWrapper = document.getElementById('observationDetailsWrapper');

    // كل أزرار Select داخل جدول طلب ملاحظة
    const selectButtons = document.querySelectorAll(
        'table button[data-en="Select"]'
    );

    selectButtons.forEach(btn => {
        btn.addEventListener('click', function () {

            // إظهار الأقسام
            detailsWrapper.style.display = 'block';

            // (اختياري) سكرول عليهم
            detailsWrapper.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });

});


/* ======================= Offline Editor =================== */

const quill = new Quill('#editor', {
    theme: 'snow',
    placeholder: '',
    modules: {
        toolbar: [
            ['bold', 'italic', 'underline'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['link'],
            ['clean']
        ]
    }
});





/* ======================= Empty Datatabel ============= */

const tables = document.querySelectorAll('.table'); 
tables.forEach(table => {
    const tbody = table.querySelector('tbody');

    if (!tbody || tbody.children.length === 0) {
        const emptyRow = document.createElement('tr');
        const td = document.createElement('td');
        td.colSpan = table.querySelectorAll('thead th').length; 
        td.style.textAlign = 'center';
        td.style.fontStyle = 'italic';
        td.textContent = 'لم يتم إضافة بيانات بعد';
        emptyRow.appendChild(td);
        tbody.appendChild(emptyRow);
    }
});





// ================================================
// تحديث عنوان الصفحة حسب التاب واللغة
// ================================================
function updatePageTitle(link) {
    const pageTitle = document.getElementById('page-title');
    const currentLang = window.currentLang || 'ar';
    const title = link.querySelector('.item-name')?.getAttribute(`data-${currentLang}`);
    if (title) pageTitle.textContent = title;

    // حفظ التاب الحالي في localStorage
    const target = link.getAttribute('data-target') || link.getAttribute('href');
    localStorage.setItem('activeTab', target);
}

// ================================================
// التعامل مع كل التابات
// ================================================
const navLinks = document.querySelectorAll('.nav-link[data-target]');

// عند الضغط على أي تاب
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');

        updatePageTitle(link);
    });
});

// ================================================
// عند تحميل الصفحة، ضبط أول تاب كـ active إذا لا يوجد تاب مخزن
// ================================================
window.addEventListener('DOMContentLoaded', () => {
    const savedTab = localStorage.getItem('activeTab');
    let activeLink;

    if (savedTab) {
        // استخدم التاب المخزن إذا موجود
        activeLink = Array.from(navLinks).find(link => 
            link.getAttribute('data-target') === savedTab
        );
    }

    // إذا لم يوجد تاب مخزن أو لأول مرة، اختر أول تاب في القائمة
    if (!activeLink) activeLink = navLinks[0];

    // ضبط active
    navLinks.forEach(l => l.classList.remove('active'));
    if (activeLink) activeLink.classList.add('active');

    // تحديث العنوان
    if (activeLink) updatePageTitle(activeLink);
});

// ================================================
// دالة تغيير اللغة
// ================================================
function setLanguage(lang) {
    window.currentLang = lang;

    // تحديث كل النصوص حسب اللغة
    document.querySelectorAll('[data-ar][data-en]').forEach(el => {
        el.textContent = el.getAttribute(`data-${lang}`);
    });

    // تحديث العنوان حسب التاب الحالي دون تغيير الـ active tab
    const activeLink = document.querySelector('.nav-link.active');
    if (activeLink) {
        updatePageTitle(activeLink);
    }

    // حفظ اللغة
    localStorage.setItem('lang', lang);
}