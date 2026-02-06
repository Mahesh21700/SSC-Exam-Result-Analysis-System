// SSC EXAM DATABASE WITH REAL DATA
const examDatabase = {
    'SSC CGL': {
        2025: {
            totalPosts: 14582,
            totalApplications: 2800000,
            totalAttempts: 1300000,
            tier1Passed: 139395,
            tier2Passed: 'coming soon'
        },
        2024: {
            totalPosts: 18236,
            totalApplications: 3600000,
            totalAttempts: 1350000,
            tier1Passed: 186509,
            tier2Passed: 88000
        }
    },
    'SSC CHSL': {
        2025: {
            totalPosts: 14582,
            totalApplications: 2815000,
            totalAttempts: 1350000,
            tier1Passed: 139395,
            tier2Passed: 'coming soon'
        },
        2024: {
            totalPosts: 17700,
            totalApplications: 3670000,
            totalAttempts: 1813000,
            tier1Passed: 186000,
            tier2Passed: 88051
        }
    },
    'SSC GD': {
        2025: {
            totalPosts: 53690,
            totalApplications: 5269000,
            totalAttempts: 2521839,
            tier1Passed: 394121,
            tier2Passed: 126736
        },
        2024: {
            totalPosts: 46617,
            totalApplications: 4745000,
            totalAttempts: 1520062,
            tier1Passed: 351176,
            tier2Passed: 'coming soon'
        }
    },
    'SSC JE': {
        2023: {
            totalPosts: 'coming soon',
            totalApplications: 'coming soon',
            totalAttempts: 'coming soon',
            tier1Passed: 'coming soon',
            tier2Passed: 'coming soon'
        }
    }
};

// SAMPLE DATA
const sampleStudents = [
    {
        rollNumber: '2401567890',
        name: 'Rahul Kumar',
        password: 'Rewa@123',
        email: 'rahul@example.com',
        phone: '9876543210',
        category: 'OBC',
        exams: [
            {
                examName: 'SSC CGL',
                examYear: 2024,
                tier1: {
                    reasoning: { total: 50, obtained: 42 },
                    quantitativeAptitude: { total: 50, obtained: 38 },
                    generalAwareness: { total: 50, obtained: 35 },
                    english: { total: 50, obtained: 40 },
                    totalMarks: 200,
                    obtainedMarks: 155,
                    status: 'Qualified'
                },
                tier2: {
                    paper1: { subject: 'Maths + Reasoning', total: 300, obtained: 212, status: 'Pass' },
                    paper2: { subject: 'English Language', total: 200, obtained: 138, status: 'Pass' },
                    totalMarks: 500,
                    obtainedMarks: 350,
                    status: 'Qualified'
                },
                finalResult: {
                    tier1Status: 'Qualified',
                    tier2Status: 'Qualified',
                    documentVerification: 'Completed',
                    finalSelection: 'Selected',
                    allottedPost: 'Assistant Section Officer',
                    department: 'Central Secretariat',
                    postingZone: 'Delhi',
                    rank: 145
                }
            }
        ]
    },
    {
        rollNumber: '2401567891',
        name: 'Priya Singh',
        password: 'Rewa@123',
        category: 'General',
        exams: [
            {
                examName: 'SSC CHSL',
                examYear: 2024,
                tier1: {
                    reasoning: { total: 25, obtained: 22 },
                    english: { total: 25, obtained: 18 },
                    quantitativeAptitude: { total: 25, obtained: 20 },
                    generalAwareness: { total: 25, obtained: 19 },
                    totalMarks: 100,
                    obtainedMarks: 79,
                    status: 'Qualified'
                },
                tier2: {
                    english: { total: 200, obtained: 145, status: 'Pass' },
                    totalMarks: 200,
                    obtainedMarks: 145,
                    status: 'Qualified'
                },
                finalResult: {
                    tier1Status: 'Qualified',
                    tier2Status: 'Qualified',
                    documentVerification: 'Pending',
                    finalSelection: 'Selected',
                    allottedPost: 'Lower Division Clerk',
                    department: 'Ministry of Finance',
                    postingZone: 'Mumbai'
                }
            }
        ]
    }
];

// ADMIN USERS
const adminUsers = {
    'Mahesh sk': 'Linux'
};

// OPERATOR USERS
const operatorUsers = {
    'vivek': 'vivek123',
    'amit': 'amit123'
};

// STUDENT USERS
let studentUsers = JSON.parse(localStorage.getItem('studentUsers')) || [
    {
        rollNumber: '2401567890',
        name: 'Rahul Kumar',
        email: 'rahul@ssc.gov.in',
        password: 'Rewa@123',
        category: 'General',
        exams: []
    },
    {
        rollNumber: '2401567891',
        name: 'Priya Singh',
        email: 'priya@ssc.gov.in',
        password: 'Priya@123',
        category: 'General',
        exams: []
    }
];

// Operator Details
const operatorDetails = {
    'vivek': {
        name: 'Vivek Kumar',
        email: 'vivek@ssc.gov.in',
        joinedDate: '2024-06-15',
        status: 'Active',
        lastLogin: new Date().toISOString(),
        recordsProcessed: 1250,
        department: 'Result Processing'
    },
    'amit': {
        name: 'Amit Sharma',
        email: 'amit@ssc.gov.in',
        joinedDate: '2024-07-20',
        status: 'Active',
        lastLogin: new Date(Date.now() - 3600000).toISOString(),
        recordsProcessed: 890,
        department: 'Data Entry'
    }
};

// CURRENT USER
let currentUser = null;
let userRole = null;

// INITIALIZE
document.addEventListener('DOMContentLoaded', function() {
    loadDataFromStorage();
    setupHamburger();
    initializeSampleData();
    checkUserSession();
});

// INITIALIZE SAMPLE DATA
function initializeSampleData() {
    if (!localStorage.getItem('students')) {
        localStorage.setItem('students', JSON.stringify(sampleStudents));
    }
    
    // Load exam database from storage or use default
    const savedExams = localStorage.getItem('examDatabase');
    if (savedExams) {
        Object.assign(examDatabase, JSON.parse(savedExams));
    } else {
        localStorage.setItem('examDatabase', JSON.stringify(examDatabase));
    }
}

// LOAD DATA FROM STORAGE
function loadDataFromStorage() {
    const students = localStorage.getItem('students');
    if (students) {
        window.allStudents = JSON.parse(students);
    } else {
        window.allStudents = [];
    }
}

// SAVE DATA TO STORAGE
function saveDataToStorage() {
    localStorage.setItem('students', JSON.stringify(window.allStudents));
}

// CHECK USER SESSION
function checkUserSession() {
    const session = localStorage.getItem('userSession');
    if (session) {
        const user = JSON.parse(session);
        currentUser = user;
        userRole = user.role;
        updateNavigation();
    }
}

// UPDATE NAVIGATION
function updateNavigation() {
    const loginNav = document.getElementById('loginNav');
    const dashboardNav = document.getElementById('dashboardNav');
    const logoutNav = document.getElementById('logoutNav');

    if (currentUser) {
        loginNav.style.display = 'none';
        dashboardNav.style.display = 'block';
        logoutNav.style.display = 'block';
    } else {
        loginNav.style.display = 'block';
        dashboardNav.style.display = 'none';
        logoutNav.style.display = 'none';
    }
}

// NAVIGATION
function navigateTo(page) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(p => p.classList.remove('active'));

    // Close mobile menu
    const navLinks = document.getElementById('navLinks');
    if (navLinks) navLinks.classList.remove('active');

    if (page === 'dashboard') {
        if (!currentUser) {
            showLogin();
            return;
        }
        if (userRole === 'admin') {
            document.getElementById('adminDashboard').classList.add('active');
            loadAdminDashboard();
        } else if (userRole === 'operator') {
            document.getElementById('operatorDashboard').classList.add('active');
            loadOperatorDashboard();
        } else if (userRole === 'student') {
            document.getElementById('dashboard').classList.add('active');
            loadStudentDashboard();
        }
    } else {
        document.getElementById(page).classList.add('active');
        if (page === 'survey') {
            loadSurveyData();
        } else if (page === 'papers') {
            loadPapersPage();
        }
    }
}

// HAMBURGER MENU
function setupHamburger() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }
}

// LOGIN FUNCTIONS
function showLogin() {
    const loginPage = document.getElementById('login');
    const navLinks = document.getElementById('navLinks');
    
    // Hide mobile menu if open
    if (navLinks) navLinks.classList.remove('active');
    
    // Remove active from all pages first
    document.querySelectorAll('.page:not(#login)').forEach(p => {
        p.classList.remove('active');
    });
    
    // Show login modal
    loginPage.classList.add('active');
    
    // Reset legacy container if present
    const legacyContainer = document.getElementById('loginContainer');
    if (legacyContainer) legacyContainer.classList.remove('active');
}

function closeLogin() {
    const loginPage = document.getElementById('login');
    loginPage.classList.remove('active');
    document.getElementById('home').classList.add('active');
}

// Legacy toggle elements removed in the new modal markup.
// Keep safe no-op references to avoid runtime errors if old IDs are missing.
// If future toggles are needed, wire them here.

function handleLogin(e) {
    e.preventDefault();
    const username = document.getElementById('loginUsername').value.trim();
    const password = document.getElementById('loginPassword').value.trim();
    
    // Check all login types
    if (adminUsers.some(u => u.username === username && u.password === password)) {
        adminLogin(e);
    } else if (operatorUsers.some(u => u.username === username && u.password === password)) {
        operatorLogin(e);
    } else if (studentUsers.some(u => (u.rollNumber === username || u.email === username) && u.password === password)) {
        studentLogin(e);
    } else {
        showAlert('Invalid credentials', 'error');
    }
}

function studentSignUp(e) {
    e.preventDefault();
    const name = document.getElementById('signupName').value.trim();
    const email = document.getElementById('signupEmail').value.trim();
    const phone = document.getElementById('signupPhone').value.trim();
    const password = document.getElementById('signupPassword').value.trim();
    const confirmPassword = document.getElementById('signupConfirm').value.trim();
    
    // Validation
    if (!name || !email || !phone || !password || !confirmPassword) {
        showAlert('Please fill all fields', 'error');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showAlert('Please enter a valid email', 'error');
        return;
    }
    
    // Phone validation
    if (!/^\d{10}$/.test(phone.replace(/[-\s]/g, ''))) {
        showAlert('Please enter a valid 10-digit phone number', 'error');
        return;
    }
    
    // Password match validation
    if (password !== confirmPassword) {
        showAlert('Passwords do not match', 'error');
        return;
    }
    
    // Password strength validation
    if (password.length < 6) {
        showAlert('Password must be at least 6 characters long', 'error');
        return;
    }
    
    // Check if email already exists
    if (studentUsers.some(u => u.email === email)) {
        showAlert('Email already registered', 'error');
        return;
    }
    
    // Create new student
    const newStudent = {
        rollNumber: 'STU' + Date.now(),
        name: name,
        email: email,
        phone: phone,
        password: password,
        category: 'General',
        exams: [],
        registrationDate: new Date().toISOString()
    };
    
    studentUsers.push(newStudent);
    localStorage.setItem('studentUsers', JSON.stringify(studentUsers));
    
    showAlert('Account created successfully! Please login.', 'success');
    
    // Clear form
    document.getElementById('studentSignUpForm').reset();
    
    // Switch to login
    setTimeout(() => {
        showLoginForm();
        // Set student mode as default
        const studentTab = document.querySelector('.mode-tab:nth-child(3)');
        if (studentTab) studentTab.click();
    }, 500);
}

function switchLoginMode(mode) {
    // Hide all forms (use display styles compatible with the new modal)
    const adminForm = document.getElementById('adminLoginForm');
    const operatorForm = document.getElementById('operatorLoginForm');
    const studentForm = document.getElementById('studentLoginForm');
    if (adminForm) adminForm.style.display = 'none';
    if (operatorForm) operatorForm.style.display = 'none';
    if (studentForm) studentForm.style.display = 'none';

    // Clear active state for both old tabs and new role buttons
    document.querySelectorAll('.mode-tab, .role-btn').forEach(tab => tab.classList.remove('active'));

    // Show selected form and mark corresponding control active
    if (mode === 'admin') {
        if (adminForm) adminForm.style.display = 'flex';
        const first = document.querySelector('.mode-tab:nth-child(1), .role-btn:nth-child(1)');
        if (first) first.classList.add('active');
    } else if (mode === 'operator') {
        if (operatorForm) operatorForm.style.display = 'flex';
        const second = document.querySelector('.mode-tab:nth-child(2), .role-btn:nth-child(2)');
        if (second) second.classList.add('active');
    } else if (mode === 'student') {
        if (studentForm) studentForm.style.display = 'flex';
        const third = document.querySelector('.mode-tab:nth-child(3), .role-btn:nth-child(3)');
        if (third) third.classList.add('active');
    }
}

function switchLoginTab(tab) {
    switchLoginMode(tab);
}

// Show Login Form (Sign In)
function showLoginForm() {
    // New modal uses `authSignIn`/`authSignUp` panels and `authTabSignIn`/`authTabSignUp` tabs
    const authSignIn = document.getElementById('authSignIn');
    const authSignUp = document.getElementById('authSignUp');
    const tabSignIn = document.getElementById('authTabSignIn');
    const tabSignUp = document.getElementById('authTabSignUp');

    if (authSignIn) authSignIn.style.display = 'block';
    if (authSignUp) authSignUp.style.display = 'none';
    if (tabSignIn) tabSignIn.classList.add('active');
    if (tabSignUp) tabSignUp.classList.remove('active');

    // Reset to admin mode by default
    switchLoginMode('admin');

    // Scroll modal into view
    document.querySelector('.auth-modal')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// Show Sign Up Form
function showSignUpForm() {
    const authSignIn = document.getElementById('authSignIn');
    const authSignUp = document.getElementById('authSignUp');
    const tabSignIn = document.getElementById('authTabSignIn');
    const tabSignUp = document.getElementById('authTabSignUp');

    if (authSignIn) authSignIn.style.display = 'none';
    if (authSignUp) authSignUp.style.display = 'block';
    if (tabSignIn) tabSignIn.classList.remove('active');
    if (tabSignUp) tabSignUp.classList.add('active');

    // Update header
    const title = document.getElementById('authTitle');
    const subtitle = document.getElementById('authSubtitle');
    if (title) title.textContent = 'Create Account';
    if (subtitle) subtitle.textContent = 'Register as a student';

    // Scroll modal into view
    document.querySelector('.auth-modal')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// Update Toggle Button State
function updateAuthToggleState(state) {
    const toggleBtns = document.querySelectorAll('.toggle-btn');
    toggleBtns.forEach(btn => {
        btn.classList.remove('active');
        if ((state === 'signin' && btn.textContent.includes('Sign In')) ||
            (state === 'signup' && btn.textContent.includes('Sign Up'))) {
            btn.classList.add('active');
        }
    });
    
    // Update header (support legacy `headerText` or new `authTitle`/`authSubtitle`)
    const headerText = document.getElementById('headerText');
    if (headerText) {
        headerText.textContent = state === 'signin' ? 'Welcome back!' : 'Create your account';
    } else {
        const title = document.getElementById('authTitle');
        const subtitle = document.getElementById('authSubtitle');
        if (title) title.textContent = state === 'signin' ? 'Account Access' : 'Create Account';
        if (subtitle) subtitle.textContent = state === 'signin' ? 'Login or create a new account' : 'Register as a student';
    }
}

function adminLogin(e) {
    if (e) e.preventDefault();
    const username = document.getElementById('adminUsername').value.trim();
    const password = document.getElementById('adminPassword').value.trim();

    if (!username || !password) {
        showAlert('Please fill all fields!', 'error');
        return;
    }

    if (adminUsers[username] === password) {
        currentUser = { username, role: 'admin' };
        userRole = 'admin';
        localStorage.setItem('userSession', JSON.stringify(currentUser));
        updateNavigation();
        document.getElementById('login').classList.remove('active');
        document.getElementById('adminUsername').value = '';
        document.getElementById('adminPassword').value = '';
        setTimeout(() => navigateTo('adminDashboard'), 100);
        showAlert('Admin login successful!', 'success');
    } else {
        showAlert('Invalid credentials!', 'error');
    }
}

function operatorLogin(e) {
    if (e) e.preventDefault();
    const username = document.getElementById('operatorUsername').value.trim();
    const password = document.getElementById('operatorPassword').value.trim();

    if (!username || !password) {
        showAlert('Please fill all fields!', 'error');
        return;
    }

    if (operatorUsers[username] === password) {
        currentUser = { username, role: 'operator' };
        userRole = 'operator';
        localStorage.setItem('userSession', JSON.stringify(currentUser));
        updateNavigation();
        closeLogin();
        document.getElementById('operatorUsername').value = '';
        document.getElementById('operatorPassword').value = '';
        setTimeout(() => navigateTo('operatorDashboard'), 100);
        showAlert('Operator login successful!', 'success');
    } else {
        showAlert('Invalid credentials!', 'error');
    }
}

function studentLogin(e) {
    if (e) e.preventDefault();
    const rollNumber = document.getElementById('studentRoll').value.trim();
    const password = document.getElementById('studentPassword').value.trim();

    if (!rollNumber || !password) {
        showAlert('Please fill all fields!', 'error');
        return;
    }

    const student = window.allStudents.find(s => s.rollNumber === rollNumber);

    if (student && student.password === password) {
        currentUser = { rollNumber, name: student.name, role: 'student' };
        userRole = 'student';
        localStorage.setItem('userSession', JSON.stringify(currentUser));
        updateNavigation();
        closeLogin();
        document.getElementById('studentRoll').value = '';
        document.getElementById('studentPassword').value = '';
        setTimeout(() => navigateTo('dashboard'), 100);
        showAlert('Student login successful!', 'success');
    } else {
        showAlert('Invalid Roll Number or Password!', 'error');
    }
}

function logout() {
    localStorage.removeItem('userSession');
    currentUser = null;
    userRole = null;
    updateNavigation();
    navigateTo('home');
    showAlert('Logged out successfully!', 'success');
}

function togglePassword(fieldId) {
    const field = document.getElementById(fieldId);
    if (field.type === 'password') {
        field.type = 'text';
    } else {
        field.type = 'password';
    }
}

// FORGOT PASSWORD FUNCTIONS
function showForgotPassword(role) {
    // Simple fallback flow for forgot-password since the old forgot section
    // was removed in the redesigned modal. Use a prompt to capture the email.
    const email = prompt('Enter your registered email to reset password:');
    if (!email) return;

    const normalized = email.trim();
    const userExists = (window.allStudents || []).some(s => s.email === normalized) ||
                       Object.values(operatorDetails || {}).some(d => d.email === normalized) ||
                       normalized === 'admin@ssc.gov.in';

    if (userExists) {
        showAlert('Password reset link sent to ' + normalized + '. Please check your email.', 'success');
    } else {
        showAlert('Email not found in system!', 'error');
    }
}

function backToLogin() {
    // Restore login view in the new modal
    const authSignIn = document.getElementById('authSignIn');
    const authSignUp = document.getElementById('authSignUp');
    const title = document.getElementById('authTitle');
    const subtitle = document.getElementById('authSubtitle');

    if (authSignIn) authSignIn.style.display = 'block';
    if (authSignUp) authSignUp.style.display = 'none';
    if (title) title.textContent = 'Account Access';
    if (subtitle) subtitle.textContent = 'Login or create a new account';
}

function handleForgotPassword(event) {
    event.preventDefault();
    const el = document.getElementById('forgotEmail');
    const email = el ? el.value.trim() : '';

    if (!email) {
        showAlert('Please enter your email!', 'error');
        return;
    }

    // Check if email exists in system
    const userExists = (window.allStudents || []).some(s => s.email === email) ||
                       Object.values(operatorDetails || {}).some(d => d.email === email) ||
                       email === 'admin@ssc.gov.in';

    if (userExists) {
        showAlert('Password reset link sent to ' + email + '. Please check your email.', 'success');
        setTimeout(() => {
            backToLogin();
            if (el) el.value = '';
        }, 2000);
    } else {
        showAlert('Email not found in system!', 'error');
    }
}

// SURVEY PAGE
function loadSurveyData() {
    const exam = document.getElementById('examSelect').value;
    const year = document.getElementById('yearSelect').value;

    if (!exam || !year) {
        document.getElementById('statsCards').style.display = 'none';
        document.getElementById('tableBody').innerHTML = '';
        document.getElementById('noData').style.display = 'block';
        return;
    }

    // Get stats from exam database
    const stats = getExamStats(exam, year);

    // Display stats
    document.getElementById('totalPosts').textContent = stats.totalPosts === 'coming soon' ? 'coming soon' : stats.totalPosts.toLocaleString();
    document.getElementById('totalApplications').textContent = stats.totalApplications === 'coming soon' ? 'coming soon' : stats.totalApplications.toLocaleString();
    document.getElementById('totalAttempts').textContent = stats.totalAttempts === 'coming soon' ? 'coming soon' : stats.totalAttempts.toLocaleString();
    document.getElementById('tier1Passed').textContent = stats.tier1Passed === 'coming soon' ? 'coming soon' : stats.tier1Passed.toLocaleString();
    document.getElementById('tier2Passed').textContent = stats.tier2Passed === 'coming soon' ? 'coming soon' : stats.tier2Passed.toLocaleString();

    document.getElementById('statsCards').style.display = 'grid';

    // Generate sample results
    const results = generateSampleResults(exam, year, 500);
    window.currentResults = results;
    displayResults(results);
}

function getExamStats(exam, year) {
    if (examDatabase[exam] && examDatabase[exam][year]) {
        return examDatabase[exam][year];
    }
    return {
        totalPosts: 'N/A',
        totalApplications: 'N/A',
        totalAttempts: 'N/A',
        tier1Passed: 'N/A',
        tier2Passed: 'N/A'
    };
}

function generateSampleResults(exam, year, count) {
    const categories = ['General', 'OBC', 'SC', 'ST', 'EWS'];
    const results = [];

    for (let i = 1; i <= count; i++) {
        results.push({
            rollNumber: '24' + String(Math.random()).slice(2, 12),
            name: ['Arun', 'Bhavna', 'Chitra', 'Deepak', 'Esha', 'Fahad', 'Gauri', 'Harshit'][Math.floor(Math.random() * 8)] + ' ' + 
                  ['Kumar', 'Singh', 'Patel', 'Sharma', 'Verma'][Math.floor(Math.random() * 5)],
            category: categories[Math.floor(Math.random() * categories.length)],
            totalMarks: Math.floor(Math.random() * 100) + 50,
            rank: i,
            status: Math.random() > 0.3 ? 'Tier-1 Pass' : 'Failed'
        });
    }

    return results.sort((a, b) => b.totalMarks - a.totalMarks)
                  .map((r, idx) => ({ ...r, rank: idx + 1 }));
}

function displayResults(results) {
    const tbody = document.getElementById('tableBody');
    const noData = document.getElementById('noData');

    if (results.length === 0) {
        noData.style.display = 'block';
        tbody.innerHTML = '';
        return;
    }

    noData.style.display = 'none';
    tbody.innerHTML = results.slice(0, 100).map(r => `
        <tr>
            <td>${r.rollNumber}</td>
            <td>${r.name}</td>
            <td>${r.category}</td>
            <td>${r.totalMarks}</td>
            <td>${r.rank}</td>
            <td><span class="status-badge ${r.status.includes('Pass') ? 'status-pass' : 'status-fail'}">${r.status}</span></td>
        </tr>
    `).join('');
}

function applyFilters() {
    if (!window.currentResults) return;

    let results = [...window.currentResults];

    const search = document.getElementById('searchInput').value.toLowerCase();
    const resultFilter = document.getElementById('resultFilter').value;
    const rankFilter = document.getElementById('rankFilter').value;
    const categoryFilter = document.getElementById('categoryFilter').value;

    if (search) {
        results = results.filter(r => 
            r.rollNumber.includes(search) || r.name.toLowerCase().includes(search)
        );
    }

    if (resultFilter) {
        results = results.filter(r => r.status === resultFilter);
    }

    if (rankFilter) {
        const rankMap = { top10: 10, top50: 50, top100: 100, top500: 500 };
        results = results.slice(0, rankMap[rankFilter]);
    }

    if (categoryFilter) {
        results = results.filter(r => r.category === categoryFilter);
    }

    displayResults(results);
}

function resetFilters() {
    document.getElementById('examSelect').value = '';
    document.getElementById('yearSelect').value = '';
    document.getElementById('searchInput').value = '';
    document.getElementById('resultFilter').value = '';
    document.getElementById('rankFilter').value = '';
    document.getElementById('categoryFilter').value = '';
    loadSurveyData();
}

function sortTable(column) {
    if (!window.currentResults) return;

    const order = window.sortOrder === 'asc' ? 'desc' : 'asc';
    window.sortOrder = order;

    const colNames = ['rollNumber', 'name', 'category', 'totalMarks', 'rank'];
    const col = colNames[column];

    window.currentResults.sort((a, b) => {
        if (typeof a[col] === 'number') {
            return order === 'asc' ? a[col] - b[col] : b[col] - a[col];
        } else {
            return order === 'asc' ? 
                String(a[col]).localeCompare(String(b[col])) : 
                String(b[col]).localeCompare(String(a[col]));
        }
    });

    displayResults(window.currentResults);
}

function exportTable(format) {
    if (!window.currentResults || window.currentResults.length === 0) {
        showAlert('No data to export!', 'error');
        return;
    }

    if (format === 'excel') {
        const ws = XLSX.utils.json_to_sheet(window.currentResults);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Results');
        XLSX.writeFile(wb, `exam-results-${Date.now()}.xlsx`);
    } else if (format === 'pdf') {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        const tableData = window.currentResults.slice(0, 50).map(r => [
            r.rollNumber, r.name, r.category, r.totalMarks, r.rank, r.status
        ]);
        doc.autoTable({
            head: [['Roll Number', 'Name', 'Category', 'Marks', 'Rank', 'Status']],
            body: tableData
        });
        doc.save(`exam-results-${Date.now()}.pdf`);
    }
    showAlert(`Exported to ${format}!`, 'success');
}

// REQUIREMENTS PAGE
const requirements = {
    CGL: {
        title: 'SSC CGL Requirements',
        content: `
            <h2>Educational Qualification</h2>
            <p>Graduation पास (किसी भी मान्यता प्राप्त यूनिवर्सिटी से)</p>
            <p>Final year के छात्र भी आवेदन कर सकते हैं</p>

            <h2>Age Limit</h2>
            <p>अलग-अलग posts के लिए अलग age limit है:</p>
            <ul>
                <li>कुछ posts: 18-27 years</li>
                <li>कुछ posts: 20-30 years</li>
                <li>कुछ posts: 18-32 years</li>
            </ul>

            <h2>Age Relaxation</h2>
            <ul>
                <li>SC/ST: 5 years</li>
                <li>OBC: 3 years</li>
                <li>PwBD: 10 years</li>
            </ul>

            <h2>Selection Process</h2>
            <ul>
                <li>Tier-1 परीक्षा (Computer Based Test)</li>
                <li>Tier-2 परीक्षा (Advanced)</li>
                <li>दोनों पास करना अनिवार्य</li>
                <li>Document Verification</li>
            </ul>

            <h2>Attempts</h2>
            <p>कोई लिमिट नहीं (Unlimited attempts)</p>

            <h2>Physical Test</h2>
            <p>नहीं होता (No physical test required)</p>
        `
    },
    CHSL: {
        title: 'SSC CHSL Requirements',
        content: `
            <h2>Educational Qualification</h2>
            <p>12th Pass (10+2) किसी भी मान्यता प्राप्त बोर्ड से</p>
            <p>Science, Commerce, Arts - कोई भी stream</p>

            <h2>Age Limit</h2>
            <p>18-27 years (as on 01/01/exam year)</p>

            <h2>Age Relaxation</h2>
            <ul>
                <li>SC/ST: 5 years</li>
                <li>OBC: 3 years</li>
                <li>PwBD: 10 years</li>
                <li>Ex-Servicemen: 3 years</li>
            </ul>

            <h2>Selection Process</h2>
            <ul>
                <li>Tier-1: Computer Based Test (Objective)</li>
                <li>Tier-2: Computer Based Test (Objective)</li>
                <li>Tier-3: Skill Test/Typing Test</li>
            </ul>

            <h2>Typing Test Requirements</h2>
            <ul>
                <li>English Typing: 35 WPM</li>
                <li>Hindi Typing: 30 WPM</li>
            </ul>

            <h2>Posts Available</h2>
            <ul>
                <li>Lower Division Clerk (LDC)</li>
                <li>Junior Secretariat Assistant (JSA)</li>
                <li>Postal Assistant (PA)</li>
                <li>Sorting Assistant (SA)</li>
                <li>Data Entry Operator (DEO)</li>
            </ul>
        `
    },
    GD: {
        title: 'SSC GD (General Duty) Requirements',
        content: `
            <h2>Educational Qualification</h2>
            <p>10th Pass (Matriculation) from recognized board</p>

            <h2>Age Limit</h2>
            <p>18-23 years</p>

            <h2>Physical Standards (Male)</h2>
            <ul>
                <li>Height: General/OBC/SC: 170 cm | ST: 165 cm</li>
                <li>Chest: Unexpanded: 80 cm | Expanded: 85 cm (5 cm expansion)</li>
            </ul>

            <h2>Physical Standards (Female)</h2>
            <ul>
                <li>Height: General/OBC/SC: 157 cm | ST: 155 cm</li>
                <li>Weight: Proportionate to height and age</li>
            </ul>

            <h2>Medical Standards</h2>
            <ul>
                <li>Eyes: 6/9, 6/9 (Corrected)</li>
                <li>Knock Knee: Not acceptable</li>
                <li>Flat Foot: Not acceptable</li>
            </ul>

            <h2>Physical Efficiency Test</h2>
            <ul>
                <li>Male: 5 km race in 24 minutes</li>
                <li>Female: 1.6 km race in 8.5 minutes</li>
            </ul>

            <h2>Selection Process</h2>
            <ul>
                <li>Computer Based Test (CBT)</li>
                <li>Physical Efficiency Test (PET)</li>
                <li>Physical Standard Test (PST)</li>
                <li>Medical Examination</li>
                <li>Document Verification</li>
            </ul>
        `
    },
    JE: {
        title: 'SSC JE (Junior Engineer) Requirements',
        content: `
            <h2>Educational Qualification</h2>
            <p>Engineering Degree (B.E./B.Tech) OR Diploma in Engineering</p>
            <p>Branches: Civil, Electrical, Mechanical, Quantity Surveying</p>

            <h2>Age Limit</h2>
            <p>18-32 years (varies by department)</p>

            <h2>Age Relaxation</h2>
            <ul>
                <li>SC/ST: 5 years</li>
                <li>OBC: 3 years</li>
                <li>PwBD: 10 years</li>
            </ul>

            <h2>Selection Process</h2>
            <ul>
                <li>Paper-I: Computer Based Test (Objective)</li>
                <li>Paper-II: Written Examination (Descriptive)</li>
            </ul>

            <h2>Paper-I Subjects</h2>
            <ul>
                <li>General Intelligence & Reasoning</li>
                <li>General Awareness</li>
                <li>General Engineering (Civil/Electrical/Mechanical)</li>
            </ul>

            <h2>Posts Available</h2>
            <ul>
                <li>Junior Engineer (Civil)</li>
                <li>Junior Engineer (Electrical)</li>
                <li>Junior Engineer (Mechanical)</li>
                <li>Junior Engineer (Quantity Surveying & Contract)</li>
            </ul>

            <h2>Departments</h2>
            <ul>
                <li>Central Water Commission (CWC)</li>
                <li>Central Public Works Department (CPWD)</li>
                <li>Border Roads Organization (BRO)</li>
                <li>Military Engineer Services (MES)</li>
            </ul>
        `
    },
    STENO: {
        title: 'SSC Stenographer Requirements',
        content: `
            <h2>Educational Qualification</h2>
            <p>12th Pass या किसी भी मान्यता प्राप्त यूनिवर्सिटी से Graduation</p>

            <h2>Age Limit</h2>
            <p>18-27 years</p>

            <h2>Age Relaxation</h2>
            <ul>
                <li>SC/ST: 5 years</li>
                <li>OBC: 3 years</li>
                <li>PwBD: 10 years</li>
            </ul>

            <h2>Stenography Skills Required</h2>
            <ul>
                <li>English Stenography: 80 WPM (10 minutes)</li>
                <li>Hindi Stenography: 60 WPM (10 minutes)</li>
            </ul>

            <h2>Selection Process</h2>
            <ul>
                <li>Computer Based Test (CBT)</li>
                <li>Stenography Test</li>
                <li>Document Verification</li>
            </ul>

            <h2>Posts Available</h2>
            <ul>
                <li>Stenographer Grade C</li>
                <li>Stenographer Grade D</li>
            </ul>

            <h2>Departments</h2>
            <ul>
                <li>Central Secretariat</li>
                <li>High Courts</li>
                <li>Income Tax Department</li>
                <li>Ministry of Labour</li>
            </ul>
        `
    },
    CPO: {
        title: 'SSC CPO (Central Police Organization) Requirements',
        content: `
            <h2>Educational Qualification</h2>
            <p>12th Pass (10+2) from recognized board</p>

            <h2>Age Limit</h2>
            <p>20-25 years</p>

            <h2>Age Relaxation</h2>
            <ul>
                <li>SC/ST: 5 years</li>
                <li>OBC: 3 years</li>
                <li>PwBD: 10 years</li>
                <li>Ex-Servicemen: 3 years</li>
            </ul>

            <h2>Physical Standards (Male)</h2>
            <ul>
                <li>Height: 165 cm (SC/ST: 160 cm)</li>
                <li>Chest: Unexpanded 82 cm | Expanded 87 cm</li>
            </ul>

            <h2>Physical Standards (Female)</h2>
            <ul>
                <li>Height: 150 cm (SC/ST: 145 cm)</li>
                <li>Weight: Proportionate to height</li>
            </ul>

            <h2>Selection Process</h2>
            <ul>
                <li>Paper-I: Computer Based Test</li>
                <li>Paper-II: Physical Efficiency Test</li>
                <li>Medical Examination</li>
                <li>Document Verification</li>
            </ul>

            <h2>Posts Available</h2>
            <ul>
                <li>Sub-Inspector (SI)</li>
                <li>Head Constable</li>
            </ul>
        `
    },
    MTS: {
        title: 'SSC MTS (Multi Tasking Staff) Requirements',
        content: `
            <h2>Educational Qualification</h2>
            <p>10th Pass (Matriculation) से किसी भी recognized board से</p>

            <h2>Age Limit</h2>
            <p>18-25 years</p>

            <h2>Age Relaxation</h2>
            <ul>
                <li>SC/ST: 5 years</li>
                <li>OBC: 3 years</li>
                <li>PwBD: 10 years</li>
                <li>Ex-Servicemen: 3 years</li>
            </ul>

            <h2>Selection Process</h2>
            <ul>
                <li>Computer Based Test (Paper-I)</li>
                <li>Typing Test / Computer Proficiency Test</li>
                <li>Document Verification</li>
            </ul>

            <h2>Posts Available</h2>
            <ul>
                <li>Multi-Tasking Staff (MTS)</li>
                <li>Havaldar (Ministerial)</li>
            </ul>

            <h2>Departments</h2>
            <ul>
                <li>Income Tax Department</li>
                <li>Ministry of External Affairs</li>
                <li>Various Secretariats</li>
                <li>Passport Offices</li>
            </ul>
        `
    },
    CONSTABLE: {
        title: 'SSC Constable (BSF/CRPF/ITBP/SSB) Requirements',
        content: `
            <h2>Educational Qualification</h2>
            <p>10th Pass (Matriculation) from recognized board</p>

            <h2>Age Limit</h2>
            <p>18-23 years</p>

            <h2>Physical Standards (Male)</h2>
            <ul>
                <li>Height: General/OBC/SC: 170 cm | ST: 162 cm</li>
                <li>Chest: Unexpanded: 80 cm | Expanded: 85 cm</li>
                <li>Vision: 6/6, 6/9 (Corrected)</li>
            </ul>

            <h2>Physical Standards (Female)</h2>
            <ul>
                <li>Height: 157 cm (ST: 150 cm)</li>
                <li>Weight: Proportionate to height and age</li>
            </ul>

            <h2>Selection Process</h2>
            <ul>
                <li>Computer Based Test (CBT)</li>
                <li>Physical Efficiency Test (PET)</li>
                <li>Physical Standard Test (PST)</li>
                <li>Medical Examination</li>
                <li>Document Verification</li>
            </ul>

            <h2>Paramilitary Forces</h2>
            <ul>
                <li>Border Security Force (BSF)</li>
                <li>Central Reserve Police Force (CRPF)</li>
                <li>Indo-Tibetan Border Police (ITBP)</li>
                <li>Sashastra Seema Bal (SSB)</li>
            </ul>
        `
    },
    DEO: {
        title: 'SSC DEO (Data Entry Operator) Requirements',
        content: `
            <h2>Educational Qualification</h2>
            <p>12th Pass (10+2) from recognized board</p>
            <p>Basic knowledge of computer operations preferred</p>

            <h2>Age Limit</h2>
            <p>18-25 years</p>

            <h2>Age Relaxation</h2>
            <ul>
                <li>SC/ST: 5 years</li>
                <li>OBC: 3 years</li>
                <li>PwBD: 10 years</li>
                <li>Ex-Servicemen: 3 years</li>
            </ul>

            <h2>Selection Process</h2>
            <ul>
                <li>Computer Based Test (CBT)</li>
                <li>Skill Test - Typing/Data Entry</li>
                <li>Document Verification</li>
            </ul>

            <h2>Computer Skills Required</h2>
            <ul>
                <li>English Typing: 35 WPM minimum</li>
                <li>Hindi Typing: 30 WPM minimum</li>
                <li>Data Entry Speed: 8000 KSPH</li>
            </ul>

            <h2>Departments</h2>
            <ul>
                <li>Ministry of Finance</li>
                <li>Ministry of Labour</li>
                <li>Various PSUs</li>
                <li>Government Offices</li>
            </ul>
        `
    },
    SCIENTIFIC: {
        title: 'SSC Scientific Assistant Requirements',
        content: `
            <h2>Educational Qualification</h2>
            <p>Bachelor's Degree in Science (Physics/Chemistry/Botany/Zoology) से recognized यूनिवर्सिटी से</p>
            <p>बिना प्रमुख विषय के Science Graduate भी आवेदन कर सकते हैं</p>

            <h2>Age Limit</h2>
            <p>18-30 years</p>

            <h2>Age Relaxation</h2>
            <ul>
                <li>SC/ST: 5 years</li>
                <li>OBC: 3 years</li>
                <li>PwBD: 10 years</li>
            </ul>

            <h2>Selection Process</h2>
            <ul>
                <li>Part-A: General Studies (CBT)</li>
                <li>Part-B: Science Subject (CBT)</li>
                <li>Document Verification</li>
            </ul>

            <h2>Subjects Covered</h2>
            <ul>
                <li>Physics</li>
                <li>Chemistry</li>
                <li>Biology</li>
                <li>General Science</li>
            </ul>

            <h2>Working Departments</h2>
            <ul>
                <li>Ministry of Defence</li>
                <li>National Physical Laboratory (NPL)</li>
                <li>Central Scientific Instruments Organization (CSIO)</li>
                <li>Various Research Institutions</li>
            </ul>
        `
    }
};

function showRequirementModal(exam) {
    const modal = document.getElementById('requirementModal');
    const body = document.getElementById('modalBody');
    
    const req = requirements[exam];
    body.innerHTML = `<h2>${req.title}</h2>${req.content}`;
    modal.classList.add('active');
}

function closeRequirementModal() {
    document.getElementById('requirementModal').classList.remove('active');
}

// PAPERS PAGE
const previousPapers = [
    // SSC CGL Papers
    { exam: 'CGL', year: 2024, tier: 'Tier-1', questions: 100, subject: 'General Knowledge & Reasoning' },
    { exam: 'CGL', year: 2024, tier: 'Tier-2', questions: 300, subject: 'Quantitative Aptitude' },
    { exam: 'CGL', year: 2024, tier: 'Tier-1', questions: 100, subject: 'English Language' },
    { exam: 'CGL', year: 2023, tier: 'Tier-1', questions: 100, subject: 'General Knowledge & Reasoning' },
    { exam: 'CGL', year: 2023, tier: 'Tier-2', questions: 200, subject: 'English Language' },
    { exam: 'CGL', year: 2022, tier: 'Tier-1', questions: 100, subject: 'Quantitative Aptitude' },
    // SSC CHSL Papers
    { exam: 'CHSL', year: 2024, tier: 'Tier-1', questions: 100, subject: 'General Knowledge & Reasoning' },
    { exam: 'CHSL', year: 2024, tier: 'Tier-2', questions: 200, subject: 'English Language' },
    { exam: 'CHSL', year: 2024, tier: 'Descriptive', questions: 50, subject: 'Essay & Letter Writing' },
    { exam: 'CHSL', year: 2023, tier: 'Tier-1', questions: 100, subject: 'General Knowledge & Reasoning' },
    { exam: 'CHSL', year: 2023, tier: 'Tier-2', questions: 200, subject: 'Quantitative Aptitude' },
    { exam: 'CHSL', year: 2022, tier: 'Tier-1', questions: 100, subject: 'English Language' },
    // SSC GD Papers
    { exam: 'GD', year: 2024, tier: 'CBT', questions: 100, subject: 'General Knowledge & Awareness' },
    { exam: 'GD', year: 2024, tier: 'Physical', questions: 50, subject: 'Physical Test' },
    { exam: 'GD', year: 2023, tier: 'CBT', questions: 100, subject: 'General Knowledge & Reasoning' },
    { exam: 'GD', year: 2022, tier: 'CBT', questions: 100, subject: 'General Awareness' },
    // SSC JE Papers
    { exam: 'JE', year: 2024, tier: 'Paper-1', questions: 200, subject: 'General Engineering' },
    { exam: 'JE', year: 2024, tier: 'Paper-2', questions: 300, subject: 'Technical Subject' },
    { exam: 'JE', year: 2023, tier: 'Paper-1', questions: 200, subject: 'General Engineering' },
    { exam: 'JE', year: 2022, tier: 'Paper-1', questions: 200, subject: 'General Engineering' },
    // SSC Stenographer
    { exam: 'Stenographer', year: 2024, tier: 'Written', questions: 80, subject: 'General Knowledge & Reasoning' },
    { exam: 'Stenographer', year: 2024, tier: 'Shorthand', questions: 50, subject: 'Stenography' },
    { exam: 'Stenographer', year: 2023, tier: 'Written', questions: 80, subject: 'English & General Knowledge' },
    { exam: 'Stenographer', year: 2022, tier: 'Written', questions: 80, subject: 'General Awareness' },
    // SSC MTS
    { exam: 'MTS', year: 2024, tier: 'Paper-1', questions: 100, subject: 'Numerical & Mental Ability' },
    { exam: 'MTS', year: 2023, tier: 'Paper-1', questions: 100, subject: 'General Knowledge' },
    { exam: 'MTS', year: 2022, tier: 'Paper-1', questions: 100, subject: 'English Language' },
    // SSC CPO
    { exam: 'CPO', year: 2024, tier: 'Paper-1', questions: 200, subject: 'General Studies' },
    { exam: 'CPO', year: 2023, tier: 'Paper-1', questions: 200, subject: 'General Awareness' },
    { exam: 'CPO', year: 2022, tier: 'Paper-1', questions: 200, subject: 'Reasoning' },
    // SSC DEO
    { exam: 'DEO', year: 2024, tier: 'Tier-1', questions: 100, subject: 'General Knowledge' },
    { exam: 'DEO', year: 2023, tier: 'Tier-1', questions: 100, subject: 'English Language' },
    // SSC Constable
    { exam: 'Constable', year: 2024, tier: 'CBT', questions: 100, subject: 'General Knowledge & Awareness' },
    { exam: 'Constable', year: 2023, tier: 'CBT', questions: 100, subject: 'General Reasoning' },
    // SSC Scientific Assistant
    { exam: 'Scientific', year: 2024, tier: 'Paper-1', questions: 150, subject: 'Scientific Knowledge' },
    { exam: 'Scientific', year: 2023, tier: 'Paper-1', questions: 150, subject: 'General Science' },
];

function loadPapersPage() {
    displayPapers(previousPapers);
}

function displayPapers(papers) {
    const grid = document.getElementById('papersGrid');
    grid.innerHTML = papers.map(p => `
        <div class="paper-card">
            <div class="paper-header">
                <h4>SSC ${p.exam}</h4>
                <span class="paper-year">${p.year}</span>
            </div>
            <div class="paper-body">
                <p><strong>Tier/Paper:</strong> ${p.tier}</p>
                <p><strong>Subject:</strong> ${p.subject}</p>
                <p><strong>Questions:</strong> ${p.questions}</p>
                <div class="paper-download">
                    <a href="#" class="download-btn pdf"><i class="fas fa-file-pdf"></i> PDF</a>
                    <a href="#" class="download-btn solution"><i class="fas fa-lightbulb"></i> Solution</a>
                </div>
            </div>
        </div>
    `).join('');
}

function filterPapers() {
    const exam = document.getElementById('papersExamSelect').value;
    const year = document.getElementById('papersYearSelect').value;

    let filtered = previousPapers;
    if (exam) filtered = filtered.filter(p => p.exam === exam);
    if (year) filtered = filtered.filter(p => p.year == year);

    displayPapers(filtered);
}

// STUDENT DASHBOARD
function loadStudentDashboard() {
    const student = window.allStudents.find(s => s.rollNumber === currentUser.rollNumber);
    
    if (!student) return;

    document.getElementById('displayName').textContent = student.name;
    document.getElementById('displayRoll').textContent = student.rollNumber;
    document.getElementById('userName').textContent = student.name;
    document.getElementById('displayCategory').textContent = student.category;

    // Filter exams - only show exams that have data in examDatabase
    const validExams = student.exams.filter((e, idx) => {
        if (examDatabase[e.examName] && examDatabase[e.examName][e.examYear]) {
            const stats = examDatabase[e.examName][e.examYear];
            // Check if exam has at least some data (not all "coming soon")
            return stats.totalPosts !== 'coming soon' || 
                   stats.totalApplications !== 'coming soon' || 
                   stats.totalAttempts !== 'coming soon';
        }
        return false;
    });

    if (validExams.length === 0) {
        // No valid exams found
        document.getElementById('examSelectionCard').style.display = 'none';
        document.getElementById('tier1Body').innerHTML = '<tr><td colspan="4" style="text-align:center; padding: 20px;">No exam data available</td></tr>';
        document.getElementById('tier2Body').innerHTML = '<tr><td colspan="4" style="text-align:center; padding: 20px;">No exam data available</td></tr>';
        document.getElementById('displayExam').textContent = 'No Data Available';
        return;
    }

    if (validExams.length > 1) {
        document.getElementById('examSelectionCard').style.display = 'block';
        const select = document.getElementById('studentExamSelect');
        select.innerHTML = '<option value="">-- Select Exam --</option>' + 
            validExams.map((e, idx) => `<option value="${idx}">${e.examName} (${e.examYear})</option>`).join('');
        window.studentValidExams = validExams;
    } else {
        document.getElementById('examSelectionCard').style.display = 'none';
        window.studentValidExams = validExams;
    }

    loadStudentResults();
}

function loadStudentResults() {
    const student = window.allStudents.find(s => s.rollNumber === currentUser.rollNumber);
    if (!student) return;

    const validExams = window.studentValidExams || student.exams.filter((e, idx) => {
        if (examDatabase[e.examName] && examDatabase[e.examName][e.examYear]) {
            const stats = examDatabase[e.examName][e.examYear];
            return stats.totalPosts !== 'coming soon' || 
                   stats.totalApplications !== 'coming soon' || 
                   stats.totalAttempts !== 'coming soon';
        }
        return false;
    });

    if (validExams.length === 0) {
        document.getElementById('tier1Body').innerHTML = '<tr><td colspan="4" style="text-align:center; padding: 20px;">No exam data available</td></tr>';
        document.getElementById('tier2Body').innerHTML = '<tr><td colspan="4" style="text-align:center; padding: 20px;">No exam data available</td></tr>';
        document.getElementById('displayExam').textContent = 'No Data Available';
        return;
    }

    const examSelect = document.getElementById('studentExamSelect');
    let selectedExam = validExams[0];

    if (examSelect.value !== '') {
        selectedExam = validExams[parseInt(examSelect.value)];
    }

    document.getElementById('displayExam').textContent = selectedExam.examName + ' (' + selectedExam.examYear + ')';

    // Tier-1
    const tier1Body = document.getElementById('tier1Body');
    tier1Body.innerHTML = `
        <tr>
            <td>Reasoning</td>
            <td>${selectedExam.tier1.reasoning.total}</td>
            <td>${selectedExam.tier1.reasoning.obtained}</td>
            <td><span class="status-badge status-pass">Pass</span></td>
        </tr>
        <tr>
            <td>Quantitative Aptitude</td>
            <td>${selectedExam.tier1.quantitativeAptitude.total}</td>
            <td>${selectedExam.tier1.quantitativeAptitude.obtained}</td>
            <td><span class="status-badge status-pass">Pass</span></td>
        </tr>
        <tr>
            <td>General Awareness</td>
            <td>${selectedExam.tier1.generalAwareness.total}</td>
            <td>${selectedExam.tier1.generalAwareness.obtained}</td>
            <td><span class="status-badge status-pass">Pass</span></td>
        </tr>
        <tr>
            <td>English</td>
            <td>${selectedExam.tier1.english.total}</td>
            <td>${selectedExam.tier1.english.obtained}</td>
            <td><span class="status-badge status-pass">Pass</span></td>
        </tr>
        <tr style="background: #f0f0f0; font-weight: bold;">
            <td>Total</td>
            <td>${selectedExam.tier1.totalMarks}</td>
            <td>${selectedExam.tier1.obtainedMarks}</td>
            <td><span class="status-badge status-pass">${selectedExam.tier1.status}</span></td>
        </tr>
    `;

    // Tier-2
    const tier2Body = document.getElementById('tier2Body');
    tier2Body.innerHTML = `
        <tr>
            <td>Paper-1</td>
            <td>${selectedExam.tier2.paper1.subject}</td>
            <td>${selectedExam.tier2.paper1.total}</td>
            <td>${selectedExam.tier2.paper1.obtained}</td>
            <td><span class="status-badge status-pass">${selectedExam.tier2.paper1.status}</span></td>
        </tr>
        <tr>
            <td>Paper-2</td>
            <td>${selectedExam.tier2.paper2.subject}</td>
            <td>${selectedExam.tier2.paper2.total}</td>
            <td>${selectedExam.tier2.paper2.obtained}</td>
            <td><span class="status-badge status-pass">${selectedExam.tier2.paper2.status}</span></td>
        </tr>
        <tr style="background: #f0f0f0; font-weight: bold;">
            <td>Total</td>
            <td>-</td>
            <td>${selectedExam.tier2.totalMarks}</td>
            <td>${selectedExam.tier2.obtainedMarks}</td>
            <td><span class="status-badge status-pass">${selectedExam.tier2.status}</span></td>
        </tr>
    `;

    // Final Result
    const fr = selectedExam.finalResult;
    document.getElementById('finalTier1Status').textContent = fr.tier1Status;
    document.getElementById('finalTier2Status').textContent = fr.tier2Status;
    document.getElementById('finalDocStatus').textContent = fr.documentVerification;
    document.getElementById('finalSelection').textContent = fr.finalSelection;
    document.getElementById('finalPost').textContent = fr.allottedPost;
    document.getElementById('finalDepartment').textContent = fr.department;
}

function downloadScorecard() {
    const student = window.allStudents.find(s => s.rollNumber === currentUser.rollNumber);
    if (!student) return;

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text('SSC Exam Scorecard', 20, 20);

    doc.setFontSize(12);
    doc.text(`Name: ${student.name}`, 20, 35);
    doc.text(`Roll Number: ${student.rollNumber}`, 20, 45);

    doc.autoTable({
        head: [['Field', 'Value']],
        body: [
            ['Category', student.category],
            ['Email', student.email || 'N/A'],
            ['Phone', student.phone || 'N/A']
        ],
        startY: 55
    });

    doc.save(`scorecard-${student.rollNumber}.pdf`);
    showAlert('Scorecard downloaded!', 'success');
}

// ADMIN DASHBOARD
function loadAdminDashboard() {
    loadAdminOverview();
    loadStudentsTable();
    loadOperatorsTable();
    loadFeedbacks();
    switchAdminTab('overview');
}

function loadAdminOverview() {
    document.getElementById('adminTotalStudents').textContent = window.allStudents.length;
    const passCount = window.allStudents.filter(s => s.exams && s.exams[0] && s.exams[0].finalResult && s.exams[0].finalResult.finalSelection === 'Selected').length;
    const percentage = window.allStudents.length > 0 ? Math.round((passCount / window.allStudents.length) * 100) : 0;
    document.getElementById('adminPassPercentage').textContent = percentage + '%';

    // Create chart
    setTimeout(() => {
        createAdminChart();
    }, 100);
}

function createAdminChart() {
    const ctx = document.getElementById('overviewChart');
    if (!ctx || window.overviewChartInstance) return;

    window.overviewChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Students', 'Selected', 'Failed', 'Pending'],
            datasets: [{
                label: 'Student Status',
                data: [
                    window.allStudents.length,
                    Math.floor(window.allStudents.length * 0.6),
                    Math.floor(window.allStudents.length * 0.2),
                    Math.floor(window.allStudents.length * 0.2)
                ],
                backgroundColor: ['#2563eb', '#10b981', '#ef4444', '#f59e0b']
            }]
        },
        options: { responsive: true, maintainAspectRatio: false }
    });
}

function switchAdminTab(tab) {
    document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
    document.getElementById(tab + 'Tab').classList.add('active');

    document.querySelectorAll('.menu-item').forEach(m => m.classList.remove('active'));
    if (event.target) {
        event.target.classList.add('active');
    }
    
    // Load content for specific tabs
    if (tab === 'exams') {
        loadExamManagement();
    } else if (tab === 'feedback') {
        loadFeedbacks();
    }
}

function loadStudentsTable() {
    const tbody = document.getElementById('studentsTableBody');
    tbody.innerHTML = window.allStudents.map(s => `
        <tr>
            <td>${s.rollNumber}</td>
            <td>${s.name}</td>
            <td>${s.email || '-'}</td>
            <td>${s.category}</td>
            <td>${s.exams && s.exams[0] ? s.exams[0].examName : '-'}</td>
            <td>
                <button class="btn btn-small" onclick="editStudent('${s.rollNumber}')">Edit</button>
                <button class="btn btn-small" style="background:#ef4444;color:white;" onclick="deleteStudent('${s.rollNumber}')">Delete</button>
            </td>
        </tr>
    `).join('');
}

function showAddStudentForm() {
    document.getElementById('addStudentForm').style.display = 'block';
}

function cancelAddStudent() {
    document.getElementById('addStudentForm').style.display = 'none';
    document.querySelector('#addStudentForm form').reset();
}

function saveNewStudent(e) {
    e.preventDefault();
    const newStudent = {
        rollNumber: document.getElementById('newRoll').value,
        name: document.getElementById('newName').value,
        email: document.getElementById('newEmail').value,
        phone: document.getElementById('newPhone').value,
        category: document.getElementById('newCategory').value,
        password: 'Rewa@123',
        exams: [{
            examName: document.getElementById('newExam').value,
            examYear: new Date().getFullYear(),
            tier1: { totalMarks: 200, obtainedMarks: 0, status: 'Pending' },
            tier2: { totalMarks: 500, obtainedMarks: 0, status: 'Pending' },
            finalResult: {}
        }]
    };

    window.allStudents.push(newStudent);
    saveDataToStorage();
    loadStudentsTable();
    cancelAddStudent();
    showAlert('Student added successfully!', 'success');
}

function deleteStudent(rollNumber) {
    if (confirm('Are you sure you want to delete this student?')) {
        window.allStudents = window.allStudents.filter(s => s.rollNumber !== rollNumber);
        saveDataToStorage();
        loadStudentsTable();
        showAlert('Student deleted!', 'success');
    }
}

function editStudent(rollNumber) {
    const student = window.allStudents.find(s => s.rollNumber === rollNumber);
    if (student) {
        alert('Edit feature - Update student details for: ' + student.name);
    }
}

function exportAllStudents() {
    const ws = XLSX.utils.json_to_sheet(window.allStudents);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Students');
    XLSX.writeFile(wb, 'all-students.xlsx');
    showAlert('Students exported!', 'success');
}

function triggerFileUpload() {
    document.getElementById('csvFile').click();
}

function handleCSVUpload(e) {
    const file = e.target.files[0];
    if (file) {
        Papa.parse(file, {
            header: true,
            complete: function(results) {
                results.data.forEach(row => {
                    if (row.rollNumber && row.name) {
                        const exists = window.allStudents.find(s => s.rollNumber === row.rollNumber);
                        if (!exists) {
                            window.allStudents.push({
                                rollNumber: row.rollNumber,
                                name: row.name,
                                category: row.category || 'General',
                                password: 'Rewa@123',
                                exams: [{ examName: 'SSC CGL', examYear: 2024 }]
                            });
                        }
                    }
                });
                saveDataToStorage();
                loadStudentsTable();
                showAlert('CSV imported successfully!', 'success');
            }
        });
    }
}

function loadOperatorsTable() {
    const tbody = document.getElementById('operatorsTableBody');
    const operators = Object.keys(operatorUsers).map(username => {
        const details = operatorDetails[username];
        const joinDate = new Date(details.joinedDate);
        const today = new Date();
        const daysActive = Math.floor((today - joinDate) / (1000 * 60 * 60 * 24));
        const monthsActive = Math.floor(daysActive / 30);
        
        let activeTime = '';
        if (monthsActive > 0) {
            activeTime = `${monthsActive} months`;
        } else {
            activeTime = `${daysActive} days`;
        }

        const lastLoginDate = new Date(details.lastLogin);
        const minutesAgo = Math.floor((today - lastLoginDate) / (1000 * 60));
        let lastLoginText = '';
        if (minutesAgo < 60) {
            lastLoginText = `${minutesAgo} min ago`;
        } else {
            const hoursAgo = Math.floor(minutesAgo / 60);
            lastLoginText = `${hoursAgo} hours ago`;
        }

        return {
            username: username,
            name: details.name,
            email: details.email,
            department: details.department,
            status: details.status,
            activeTime: activeTime,
            lastLogin: lastLoginText,
            recordsProcessed: details.recordsProcessed
        };
    });

    tbody.innerHTML = operators.map(op => `
        <tr>
            <td><strong>${op.username}</strong></td>
            <td>${op.name}</td>
            <td>${op.email}</td>
            <td>${op.department}</td>
            <td>${op.activeTime}</td>
            <td>${op.recordsProcessed}</td>
            <td>${op.lastLogin}</td>
            <td><span class="status-badge status-pass">${op.status}</span></td>
            <td>
                <button class="btn btn-small" onclick="editOperator('${op.username}')">Edit</button>
            </td>
        </tr>
    `).join('');
}

function showAddOperatorForm() {
    alert('Add operator form - Implement operator creation');
}

function editOperator(username) {
    alert('Edit operator: ' + username);
}

// EXAM MANAGEMENT FUNCTIONS
function loadExamManagement() {
    const container = document.getElementById('examManagementContainer');
    let html = `
        <div style="padding: 20px;">
            <h2 style="margin-bottom: 20px; color: #2563eb;">Exam Management</h2>
            <button class="btn" onclick="showAddExamForm()" style="margin-bottom: 20px;">+ Add New Exam Year</button>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px;">
    `;
    
    for (const exam in examDatabase) {
        html += `
            <div style="border: 1px solid #e5e7eb; border-radius: 8px; padding: 15px; background: #f9fafb;">
                <h3 style="color: #1f2937; margin: 0 0 15px 0;">${exam}</h3>
                <div id="years-${exam.replace(/\s+/g, '-')}" style="margin-bottom: 10px;">
        `;
        
        for (const year in examDatabase[exam]) {
            html += `
                <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px; background: white; border-radius: 4px; margin-bottom: 5px;">
                    <span style="font-weight: 500;">${year}</span>
                    <button class="btn btn-small" style="background: #ef4444; padding: 5px 10px;" onclick="removeExamYear('${exam}', ${year})">Remove</button>
                </div>
            `;
        }
        
        html += `
                </div>
                <button class="btn btn-small" onclick="showAddYearForm('${exam}')" style="width: 100%; background: #10b981;">+ Add Year</button>
            </div>
        `;
    }
    
    html += `</div></div>`;
    container.innerHTML = html;
}

function showAddExamForm() {
    // Show modal form for adding new exam
    document.getElementById('addExamModal').classList.add('active');
}

function closeAddExamModal() {
    document.getElementById('addExamModal').classList.remove('active');
    document.getElementById('addExamForm').reset();
}

function saveNewExam(e) {
    e.preventDefault();
    const examName = document.getElementById('newExamName').value.trim();
    const year = parseInt(document.getElementById('newExamYear').value);
    const totalPosts = document.getElementById('newTotalPosts').value;
    const totalApplications = document.getElementById('newTotalApplications').value;
    const totalAttempts = document.getElementById('newTotalAttempts').value;
    const tier1Passed = document.getElementById('newTier1Passed').value;
    const tier2Passed = document.getElementById('newTier2Passed').value || 'coming soon';

    if (!examName || !year) {
        showAlert('Please fill exam name and year', 'error');
        return;
    }

    if (!examDatabase[examName]) {
        examDatabase[examName] = {};
    }

    if (examDatabase[examName][year]) {
        showAlert('This exam year already exists!', 'error');
        return;
    }

    examDatabase[examName][year] = {
        totalPosts: isNaN(totalPosts) ? totalPosts : parseInt(totalPosts),
        totalApplications: isNaN(totalApplications) ? totalApplications : parseInt(totalApplications),
        totalAttempts: isNaN(totalAttempts) ? totalAttempts : parseInt(totalAttempts),
        tier1Passed: isNaN(tier1Passed) ? tier1Passed : parseInt(tier1Passed),
        tier2Passed: tier2Passed
    };

    localStorage.setItem('examDatabase', JSON.stringify(examDatabase));
    showAlert(`Exam ${examName} - ${year} added successfully!`, 'success');
    closeAddExamModal();
    loadExamManagement();
}

function showAddYearForm(exam) {
    // Show modal form for adding year to exam
    document.getElementById('addYearExamName').value = exam;
    document.getElementById('addYearModal').classList.add('active');
}

function closeAddYearModal() {
    document.getElementById('addYearModal').classList.remove('active');
    document.getElementById('addYearForm').reset();
}

function saveNewYear(e) {
    e.preventDefault();
    const exam = document.getElementById('addYearExamName').value;
    const year = parseInt(document.getElementById('addYear').value);
    const totalPosts = document.getElementById('addTotalPosts').value;
    const totalApplications = document.getElementById('addTotalApplications').value;
    const totalAttempts = document.getElementById('addTotalAttempts').value;
    const tier1Passed = document.getElementById('addTier1Passed').value;
    const tier2Passed = document.getElementById('addTier2Passed').value || 'coming soon';

    if (!year) {
        showAlert('Please fill all required fields', 'error');
        return;
    }

    if (!examDatabase[exam]) {
        examDatabase[exam] = {};
    }

    if (examDatabase[exam][year]) {
        showAlert('This year already exists for this exam!', 'error');
        return;
    }

    examDatabase[exam][year] = {
        totalPosts: isNaN(totalPosts) ? totalPosts : parseInt(totalPosts),
        totalApplications: isNaN(totalApplications) ? totalApplications : parseInt(totalApplications),
        totalAttempts: isNaN(totalAttempts) ? totalAttempts : parseInt(totalAttempts),
        tier1Passed: isNaN(tier1Passed) ? tier1Passed : parseInt(tier1Passed),
        tier2Passed: tier2Passed
    };

    localStorage.setItem('examDatabase', JSON.stringify(examDatabase));
    showAlert(`Year ${year} added to ${exam}!`, 'success');
    closeAddYearModal();
    loadExamManagement();
}

function removeExamYear(exam, year) {
    if (confirm(`Are you sure you want to remove ${exam} - ${year}?`)) {
        delete examDatabase[exam][year];
        if (Object.keys(examDatabase[exam]).length === 0) {
            delete examDatabase[exam];
        }
        localStorage.setItem('examDatabase', JSON.stringify(examDatabase));
        showAlert(`Removed ${exam} - ${year}`, 'success');
        loadExamManagement();
    }
}

function backupData() {
    const backup = {
        students: window.allStudents,
        timestamp: new Date().toISOString()
    };
    const dataStr = JSON.stringify(backup, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `backup-${Date.now()}.json`;
    link.click();
    showAlert('Backup created!', 'success');
}

function triggerRestoreUpload() {
    document.getElementById('restoreFile').click();
}

function restoreData(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = function(event) {
        try {
            const data = JSON.parse(event.target.result);
            if (data.students && Array.isArray(data.students)) {
                window.allStudents = data.students;
                saveDataToStorage();
                loadStudentsTable();
                showAlert('Data restored successfully!', 'success');
            }
        } catch (err) {
            showAlert('Error restoring data!', 'error');
        }
    };
    reader.readAsText(file);
}

function changeAdminPassword(e) {
    e.preventDefault();
    const current = document.getElementById('currentPassword').value;
    const newPass = document.getElementById('newPassword').value;

    if (current === 'Linux') {
        adminUsers['Mahesh sk'] = newPass;
        showAlert('Password changed successfully!', 'success');
        e.target.reset();
    } else {
        showAlert('Current password is incorrect!', 'error');
    }
}

// OPERATOR DASHBOARD
function loadOperatorDashboard() {
    document.getElementById('opTotalStudents').textContent = window.allStudents.length;
    loadOpStudentsTable();
    loadOperatorFeedbacks();
    switchOperatorTab('overview');
}

function switchOperatorTab(tab) {
    document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
    document.getElementById('operator' + tab.charAt(0).toUpperCase() + tab.slice(1) + 'Tab').classList.add('active');
    event.target.classList.add('active');
    
    if (tab === 'feedback') {
        loadOperatorFeedbacks();
    }
}

function loadOpStudentsTable() {
    const tbody = document.getElementById('opStudentsTableBody');
    tbody.innerHTML = window.allStudents.slice(0, 20).map(s => `
        <tr>
            <td>${s.rollNumber}</td>
            <td>${s.name}</td>
            <td>${s.category}</td>
            <td>${s.exams && s.exams[0] ? s.exams[0].examName : '-'}</td>
        </tr>
    `).join('');
}

function showOpResultUploadForm() {
    document.getElementById('opResultUploadForm').style.display = 'block';
    const select = document.getElementById('opResultStudentSelect');
    select.innerHTML = '<option value="">Select Student</option>' +
        window.allStudents.map(s => `<option value="${s.rollNumber}">${s.name} (${s.rollNumber})</option>`).join('');
}

function cancelOpResultUpload() {
    document.getElementById('opResultUploadForm').style.display = 'none';
}

function opUploadResults(e) {
    e.preventDefault();
    showAlert('Results uploaded successfully!', 'success');
    cancelOpResultUpload();
}

function updateTierFields() {
    const tier = document.getElementById('opTierSelect').value;
    const fields = document.getElementById('opTierFields');
    
    if (tier === 'Tier-1') {
        fields.innerHTML = `
            <input type="number" placeholder="Reasoning Marks" min="0" max="50">
            <input type="number" placeholder="Quant Marks" min="0" max="50">
            <input type="number" placeholder="GA Marks" min="0" max="50">
            <input type="number" placeholder="English Marks" min="0" max="50">
        `;
    } else if (tier === 'Tier-2') {
        fields.innerHTML = `
            <input type="number" placeholder="Paper-1 Marks" min="0" max="300">
            <input type="number" placeholder="Paper-2 Marks" min="0" max="200">
        `;
    }
}

// Modal click-outside functionality
document.addEventListener('DOMContentLoaded', function() {
    // Close modals when clicking outside
    window.addEventListener('click', function(event) {
        const addExamModal = document.getElementById('addExamModal');
        const addYearModal = document.getElementById('addYearModal');
        const feedbackModal = document.getElementById('feedbackModal');
        
        if (event.target === addExamModal) {
            closeAddExamModal();
        }
        if (event.target === addYearModal) {
            closeAddYearModal();
        }
        if (event.target === feedbackModal) {
            closeFeedbackModal();
        }
    });
});

// FEEDBACK FUNCTIONS
function showFeedbackForm() {
    document.getElementById('feedbackModal').classList.add('active');
}

function closeFeedbackModal() {
    document.getElementById('feedbackModal').classList.remove('active');
    document.getElementById('feedbackForm').reset();
}

function saveFeedback(e) {
    e.preventDefault();
    
    const fullName = document.getElementById('feedbackFullName').value.trim();
    const email = document.getElementById('feedbackEmail').value.trim();
    const message = document.getElementById('feedbackMessage').value.trim();
    
    if (!fullName || !email || !message) {
        showAlert('Please fill all required fields', 'error');
        return;
    }
    
    // Get existing feedbacks or create new array
    let feedbacks = JSON.parse(localStorage.getItem('feedbacks')) || [];
    
    // Add new feedback
    const newFeedback = {
        id: Date.now(),
        fullName: fullName,
        email: email,
        message: message,
        date: new Date().toLocaleString()
    };
    
    feedbacks.push(newFeedback);
    localStorage.setItem('feedbacks', JSON.stringify(feedbacks));
    
    showAlert('Feedback sent successfully! Thank you for your input.', 'success');
    closeFeedbackModal();
}

function loadFeedbacks() {
    const feedbacks = JSON.parse(localStorage.getItem('feedbacks')) || [];
    const container = document.getElementById('feedbackContainer');
    
    if (!container) return;
    
    if (feedbacks.length === 0) {
        container.innerHTML = '<div class="feedback-empty"><i class="fas fa-inbox"></i><p>No feedback yet</p></div>';
        return;
    }
    
    let html = '';
    feedbacks.reverse().forEach(feedback => {
        html += `
            <div class="feedback-card">
                <div class="feedback-card-header">
                    <div class="feedback-name"><i class="fas fa-user-circle"></i> ${escapeHtml(feedback.fullName)}</div>
                    <div class="feedback-email"><i class="fas fa-envelope"></i> ${escapeHtml(feedback.email)}</div>
                    <div class="feedback-date"><i class="fas fa-calendar"></i> ${feedback.date}</div>
                </div>
                <div class="feedback-message">${escapeHtml(feedback.message)}</div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

function loadOperatorFeedbacks() {
    const feedbacks = JSON.parse(localStorage.getItem('feedbacks')) || [];
    const container = document.getElementById('operatorFeedbackContainer');
    
    if (!container) return;
    
    if (feedbacks.length === 0) {
        container.innerHTML = '<div class="feedback-empty"><i class="fas fa-inbox"></i><p>No feedback yet</p></div>';
        return;
    }
    
    let html = '';
    feedbacks.reverse().forEach(feedback => {
        html += `
            <div class="feedback-card">
                <div class="feedback-card-header">
                    <div class="feedback-name"><i class="fas fa-user-circle"></i> ${escapeHtml(feedback.fullName)}</div>
                    <div class="feedback-email"><i class="fas fa-envelope"></i> ${escapeHtml(feedback.email)}</div>
                    <div class="feedback-date"><i class="fas fa-calendar"></i> ${feedback.date}</div>
                </div>
                <div class="feedback-message">${escapeHtml(feedback.message)}</div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// UTILITY
function showAlert(message, type) {
    const alert = document.createElement('div');
    alert.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1000;
        animation: slideDown 0.3s ease-out;
    `;
    alert.textContent = message;
    document.body.appendChild(alert);
    setTimeout(() => alert.remove(), 3000);
}

function showResultUploadForm() {
    document.getElementById('resultUploadForm').style.display = 'block';
    const select = document.getElementById('resultStudentSelect');
    select.innerHTML = '<option value="">Select Student</option>' +
        window.allStudents.map(s => `<option value="${s.rollNumber}">${s.name}</option>`).join('');
}

function cancelResultUpload() {
    document.getElementById('resultUploadForm').style.display = 'none';
}

function uploadResults(e) {
    e.preventDefault();
    showAlert('Results uploaded!', 'success');
    cancelResultUpload();
}
