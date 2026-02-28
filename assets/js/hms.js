


//------ Scroll Up ------------

function scrollUpSection() {
    document.getElementById("home-page").scrollIntoView({
        behavior: "smooth"
    });
}


// ------------------ Extra Discount ---------------

document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.page').forEach(page => {
        const checkbox = page.querySelector('#extra_discount');
        const formGroup = page.querySelector('#hospitalPercentageSection');

        if (!checkbox || !formGroup) return;

        checkbox.addEventListener('change', function () {
            if (this.checked) {
                formGroup.classList.remove('d-none');
            } else {
                formGroup.classList.add('d-none');
            }
        });
    });
});



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



// ------------------ Special Doctor Percentage ---------------

document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.page').forEach(page => {
        const checkbox = page.querySelector('#specialDoctorPercentage');
        const formGroup = page.querySelector('#doctorPercentageSection');

        if (!checkbox || !formGroup) return;

        checkbox.addEventListener('change', function () {
            if (this.checked) {
                formGroup.classList.remove('d-none');
            } else {
                formGroup.classList.add('d-none');
            }
        });
    });
});


// ------------------ Patient ---------------

document.querySelectorAll('.page').forEach(page => {
    const patientSelect = page.querySelector('#patient');
    const patientSection = page.querySelector('#patientSection');

    patientSelect.addEventListener('change', function () {
        if (this.value !== "") {
            patientSection.classList.remove('d-none');
        } else {
            patientSection.classList.add('d-none');
        }
    });
});



document.addEventListener("DOMContentLoaded", function () {
    const sidebar = document.querySelector('.sidebar');
    const links = document.querySelectorAll('.sidebar .nav-link');
    let tooltips = [];

    // تفعيل Tooltips لكل الروابط
    function enableTooltips() {
        const currentLang = window.currentLang || 'ar';

        links.forEach(el => {
            const title = el.getAttribute(`data-title-${currentLang}`);
            if (!title) return;

            el.setAttribute('data-bs-toggle', 'tooltip');
            el.setAttribute('data-bs-placement', 'right');
            el.setAttribute('data-bs-title', title);

            tooltips.push(new bootstrap.Tooltip(el));
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


    window.refreshSidebarTooltips = function () {
        if (sidebar.classList.contains('sidebar-mini')) {
            disableTooltips();
            enableTooltips();
        }
    };
    // أول تحميل الصفحة
    checkSidebarState();

    // مراقبة أي تغيير في class الخاص بالـ sidebar
    new MutationObserver(checkSidebarState).observe(sidebar, {
        attributes: true,
        attributeFilter: ['class']
    });
});




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
        showPage('clinics');

        sidebarLinks.forEach(link => {
            if (link.dataset.target === 'clinics') {
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


// -------------------- Add New Row  ----------------------


const tbody = document.querySelector('#basic-table tbody');

document.getElementById('addRowBtnClinicProcedure').addEventListener('click', function () {

    const newRow = document.createElement('tr');

    newRow.innerHTML = `
        <td>
            <input class="form-check-input" type="checkbox">
        </td>

        <td>
            <input type="text" class="form-control form-control-sm" data-ar="أدخل الإجراء الطبي" data-en="Enter Clinic Procedure"  placeholder="أدخل الإجراء الطبي">
        </td>

        <td>
            <input type="number" class="form-control form-control-sm" min="1" value="1">
        </td>

        <td class="text-nowrap d-flex align-items-center gap-1">

            <!-- Save -->
            <button type="button"
                class="btn btn-sm btn-success d-flex align-items-center justify-content-center"
                onclick="saveRow(this)"
              data-ar="حفظ" data-en="Save"  title="Save"
                disabled>
                حفظ
            </button>

            <!-- Edit -->
            <button type="button"
                class="btn btn-sm btn-warning d-flex align-items-center justify-content-center"
                onclick="editRow(this)"
               data-ar="تعديل" data-en="Edit" title="Edit">
                تعديل
            </button>

            <!-- Delete -->
            <button type="button"
                class="btn btn-sm btn-danger d-flex align-items-center justify-content-center"
                onclick="deleteRow(this)"
               data-ar="حذف" data-en="Delete" title="Delete">
                حذف
            </button>

        </td>
    `;

    tbody.appendChild(newRow);

    // إزالة رسالة "لم يتم إضافة بيانات بعد" إذا كانت موجودة
    const placeholderRow = tbody.querySelector('.placeholder');
    if (placeholderRow) placeholderRow.remove();

    // تفعيل زر save عند إدخال أي بيانات في الصف الجديد
    const inputs = newRow.querySelectorAll('input[type="text"], input[type="number"]');
    const saveBtn = newRow.querySelector('button.btn-success');

    inputs.forEach(input => {
        input.addEventListener('input', () => {
            saveBtn.disabled = false;
        });
    });
});

// دالة Edit
function editRow(btn) {
    const row = btn.closest('tr');
    const tds = row.querySelectorAll('td');

    tds.forEach(td => {
        // تجاهل td الذي يحتوي على زر أو checkbox
        if (!td.querySelector('button') && !td.querySelector('input[type="checkbox"]')) {
            const value = td.innerText;
            if (!isNaN(value)) {
                td.innerHTML = `<input type="number" class="form-control form-control-sm" value="${value}">`;
            } else {
                td.innerHTML = `<input type="text" class="form-control form-control-sm" value="${value}">`;
            }
        }
    });

    // تفعيل زر save عند الضغط على edit
    const saveBtn = row.querySelector('button.btn-success');
    saveBtn.disabled = false;
}

// دالة Save
function saveRow(btn) {
    const row = btn.closest('tr');
    const tds = row.querySelectorAll('td');

    tds.forEach(td => {
        const input = td.querySelector('input[type="text"], input[type="number"]');
        if (input) {
            td.innerText = input.value.trim() || 'لم يتم إضافة بيانات بعد';
        }
    });

    btn.disabled = true;

    // إذا لم يوجد أي صف بيانات حقيقي، نضيف رسالة placeholder
    checkEmptyTable();
}

// دالة Delete
function deleteRow(btn) {
    btn.closest('tr').remove();
    checkEmptyTable();
}

// دالة لإظهار رسالة إذا الجدول فارغ
function checkEmptyTable() {
    const tbody = document.querySelector('#basic-table tbody');
    const rows = tbody.querySelectorAll('tr');

    // تحديد اللغة (العربية أو الإنجليزية)
    const lang = document.documentElement.lang || 'ar'; // default عربي
    const placeholderText = lang === 'en' ? 'No data yet' : 'لم يتم إضافة بيانات بعد';

    // إذا كل الصفوف تحتوي فقط على placeholder أو لا يوجد صفوف
    if (!rows.length || [...rows].every(r => r.innerText.trim() === 'لم يتم إضافة بيانات بعد' || r.innerText.trim() === 'No data yet')) {
        tbody.innerHTML = '';

        const placeholderRow = document.createElement('tr');
        placeholderRow.classList.add('placeholder');
        placeholderRow.innerHTML = `<td colspan="4" class="text-center text-muted">${placeholderText}</td>`;
        tbody.appendChild(placeholderRow);
    }
}


// تفعيل الرسالة الافتراضية عند تحميل الصفحة إذا لم يوجد بيانات
checkEmptyTable();



// !--------------- Multi Select (Dental)

const select = document.getElementById('procedureSelect');
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







document.addEventListener('DOMContentLoaded', function () {
    const sessionType = document.getElementById('session_type');
    const countSessionsDiv = document.getElementById('count_sessions').closest('.form-group');
    const followSessionsCheckbox = document.getElementById('follow_sessions');
    const availableSessionsDiv = document.getElementById('available_sessions').closest('.form-group');

    // عند اختيار نوع الجلسة
    sessionType.addEventListener('change', function () {
        if (this.value !== "") {
            countSessionsDiv.classList.remove('d-none');
        } else {
            countSessionsDiv.classList.add('d-none');
            // إخفاء available sessions لو النوع لم يُختار
            availableSessionsDiv.classList.add('d-none');
            followSessionsCheckbox.checked = false;
        }
    });

    // عند الضغط على Follow Sessions checkbox
    followSessionsCheckbox.addEventListener('change', function () {
        if (this.checked) {
            availableSessionsDiv.classList.remove('d-none');
        } else {
            availableSessionsDiv.classList.add('d-none');
        }
    });
});






/* ======================= Empty Datatable ============= */

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