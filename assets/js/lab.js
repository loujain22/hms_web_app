



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
        showPage('laboratory-tool');

        sidebarLinks.forEach(link => {
            if (link.dataset.target === 'laboratory-tool') {
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



// !--------------- Multi Select (Dental)

const select = document.getElementById('observation');
const selectedItems = document.getElementById('selectedItems');

select.addEventListener('change', function () {
    const option = this.options[this.selectedIndex];
    if (!option.value) return;

    // إنشاء الـ tag
    const tag = document.createElement('div');
    tag.className = 'tag';
    tag.innerHTML = `
    <span>${option.text}</span>
    <button type="button">&times;</button>
  `;

    selectedItems.appendChild(tag);

    // حذف العنصر من الـ dropdown
    option.remove();

    // عند حذف الـ tag
    tag.querySelector('button').addEventListener('click', () => {
        // إرجاع option للـ select
        select.appendChild(option);
        tag.remove();
    });

    // إعادة تعيين select
    this.value = '';
});

