const API_BASE = '/api/employees';

let allEmployees = [];

const form = document.getElementById('employee-form');
const empIdInput = document.getElementById('emp-id');
const empIdDisplay = document.getElementById('emp-id-display');
const idDisplayGroup = document.getElementById('id-display-group');
const empNameInput = document.getElementById('emp-name');
const empSalaryInput = document.getElementById('emp-salary');
const formTitle = document.getElementById('form-title');
const formSubtitle = document.getElementById('form-subtitle');
const formMethodPill = document.getElementById('form-method-pill');
const submitBtn = document.getElementById('submit-btn');
const cancelEditBtn = document.getElementById('cancel-edit-btn');
const alertBox = document.getElementById('alert-box');
const tbody = document.getElementById('employee-tbody');
const searchInput = document.getElementById('search-input');
const refreshBtn = document.getElementById('refresh-btn');
const wsLog = document.getElementById('ws-log');
const lastStatus = document.getElementById('last-status');

const statCount = document.getElementById('stat-count');
const statAvg = document.getElementById('stat-avg');
const statMax = document.getElementById('stat-max');

function formatCurrency(value) {
    return new Intl.NumberFormat('vi-VN').format(Math.round(value || 0)) + ' VND';
}

function showAlert(message, type) {
    alertBox.textContent = message;
    alertBox.className = `alert ${type}`;
    alertBox.hidden = false;
}

function hideAlert() {
    alertBox.hidden = true;
}

function logWebServiceCall(method, url, requestBody, status, responseData) {
    const timestamp = new Date().toLocaleTimeString('vi-VN');
    lastStatus.textContent = `${method} ${status}`;
    lastStatus.className = `status-badge ${status >= 200 && status < 300 ? 'ok' : 'err'}`;

    const lines = [
        `[${timestamp}] ${method} ${url} -> HTTP ${status}`,
    ];
    if (requestBody) {
        lines.push('Request Payload:\n' + JSON.stringify(requestBody, null, 2));
    }
    lines.push('Response JSON:\n' + JSON.stringify(responseData, null, 2));
    wsLog.textContent = lines.join('\n\n');
}

function updateStats(employees) {
    statCount.textContent = employees.length;
    if (employees.length === 0) {
        statAvg.textContent = '0 VND';
        statMax.textContent = '0 VND';
        return;
    }
    const total = employees.reduce((sum, emp) => sum + Number(emp.salary || 0), 0);
    const max = Math.max(...employees.map((emp) => Number(emp.salary || 0)));
    statAvg.textContent = formatCurrency(total / employees.length);
    statMax.textContent = formatCurrency(max);
}

function escapeHtml(str) {
    return String(str)
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#39;');
}

function renderTable() {
    const keyword = searchInput.value.trim().toLowerCase();
    const filtered = allEmployees.filter((emp) =>
        !keyword ||
        String(emp.id).includes(keyword) ||
        emp.name.toLowerCase().includes(keyword)
    );

    if (filtered.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4" class="empty-cell">No matching employees found.</td></tr>';
        return;
    }

    tbody.innerHTML = filtered.map((emp) => `
        <tr>
            <td><strong>#${emp.id}</strong></td>
            <td>${escapeHtml(emp.name)}</td>
            <td class="text-right">${formatCurrency(emp.salary)}</td>
            <td class="text-center">
                <button type="button" class="btn btn-outline btn-sm" data-edit-id="${emp.id}">
                    Edit
                </button>
            </td>
        </tr>
    `).join('');
}

async function fetchEmployees() {
    try {
        const res = await fetch(API_BASE);
        const data = await res.json();
        logWebServiceCall('GET', API_BASE, null, res.status, data);

        if (!res.ok) {
            throw new Error(data.message || 'Failed to load employees');
        }
        allEmployees = Array.isArray(data) ? data : [];
        updateStats(allEmployees);
        renderTable();
    } catch (err) {
        tbody.innerHTML = `<tr><td colspan="4" class="empty-cell">Error: ${escapeHtml(err.message)}</td></tr>`;
    }
}

function startEditMode(employee) {
    hideAlert();
    empIdInput.value = employee.id;
    empIdDisplay.value = `#${employee.id}`;
    idDisplayGroup.hidden = false;
    empNameInput.value = employee.name;
    empSalaryInput.value = employee.salary;

    formTitle.textContent = 'Update Employee';
    formSubtitle.innerHTML = 'Calls web service method <code>updateEmployee(Employee e)</code>';
    formMethodPill.textContent = 'PUT /api/employees';
    formMethodPill.classList.add('is-put');
    submitBtn.textContent = 'Save Changes';
    cancelEditBtn.hidden = false;
    empNameInput.focus();
}

function resetToAddMode() {
    form.reset();
    empIdInput.value = '';
    idDisplayGroup.hidden = true;
    formTitle.textContent = 'Add Employee';
    formSubtitle.innerHTML = 'Calls web service method <code>addEmployees(Employee e)</code>';
    formMethodPill.textContent = 'POST /api/employees';
    formMethodPill.classList.remove('is-put');
    submitBtn.textContent = 'Add Employee';
    cancelEditBtn.hidden = true;
}

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    hideAlert();

    const name = empNameInput.value.trim();
    const salary = Number(empSalaryInput.value);
    const id = empIdInput.value ? Number(empIdInput.value) : null;

    if (!name) {
        showAlert('Please enter employee name.', 'error');
        return;
    }
    if (!salary || salary <= 0) {
        showAlert('Salary must be greater than 0.', 'error');
        return;
    }

    const isUpdate = id !== null;
    const method = isUpdate ? 'PUT' : 'POST';
    const payload = isUpdate ? { id, name, salary } : { name, salary };

    submitBtn.disabled = true;
    try {
        const res = await fetch(API_BASE, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });
        const data = await res.json();
        logWebServiceCall(method, API_BASE, payload, res.status, data);

        if (!res.ok) {
            showAlert(data.message || 'Operation failed', 'error');
            return;
        }

        showAlert(
            isUpdate
                ? `Updated employee #${data.id} (${data.name}) successfully.`
                : `Added employee #${data.id} (${data.name}) successfully.`,
            'success'
        );
        resetToAddMode();
        await fetchEmployees();
    } catch (err) {
        showAlert(`Network error: ${err.message}`, 'error');
    } finally {
        submitBtn.disabled = false;
    }
});

tbody.addEventListener('click', (event) => {
    const btn = event.target.closest('[data-edit-id]');
    if (!btn) return;
    const id = Number(btn.dataset.editId);
    const emp = allEmployees.find((item) => item.id === id);
    if (emp) startEditMode(emp);
});

cancelEditBtn.addEventListener('click', () => {
    hideAlert();
    resetToAddMode();
});

searchInput.addEventListener('input', renderTable);
refreshBtn.addEventListener('click', fetchEmployees);

// Load initial employee array via getEmployees()
fetchEmployees();
