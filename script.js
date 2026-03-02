const firebaseConfig = {
  apiKey: "AIzaSyDjgsWQSosY9WxM3Fgmp0Ay-mLQKQc-s-I",
  authDomain: "juz-zhuirik.firebaseapp.com",
  databaseURL: "https://juz-zhuirik-default-rtdb.firebaseio.com",
  projectId: "juz-zhuirik",
  storageBucket: "juz-zhuirik.firebasestorage.app",
  messagingSenderId: "985309043409",
  appId: "1:985309043409:web:5236aa1ae8a71a92dec3f0"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.database();
const auth = firebase.auth();

const BASE_SCORE = 0;

const SECTIONS = [
    { title: "І бөлім: Білім сапасы (әр тоқсан + жылдық)", criteria: [
        { key: "Білім: Үздік", score: 10 },
        { key: "Білім: Бір төрті бар", score: 7 },
        { key: "Білім: Екпінді", score: 5 },
        { key: "Білім: Бір үші бар", score: 3 },
        { key: "Білім: Қанағаттанарлық", score: 1 },
    ]},
    { title: "ІІ бөлім: Үйірмеге қатысуы", criteria: [
        { key: "Үйірме: Екі немесе одан да көп үйірмеге қатысса", score: 10 },
        { key: "Үйірме: Бір үйірмеге қатысса", score: 5 },
    ]},
    { title: "ІІІ бөлім: Олимпиада, ғылыми жобаға қатысуы", criteria: [
        { key: "Олимпиада: Халықаралық 1-орын", score: 20 },
        { key: "Олимпиада: Халықаралық 2-орын", score: 19 },
        { key: "Олимпиада: Халықаралық 3-орын", score: 18 },
        { key: "Олимпиада: Халықаралық алғыс хат", score: 17 },
        { key: "Олимпиада: Халықаралыққа барып орын алмаса", score: 15 },
        { key: "Олимпиада: Республикалық 1-орын", score: 17 },
        { key: "Олимпиада: Республикалық 2-орын", score: 16 },
        { key: "Олимпиада: Республикалық 3-орын", score: 15 },
        { key: "Олимпиада: Республикалық алғыс хат", score: 14 },
        { key: "Олимпиада: Республикалыққа барып орын алмаса", score: 10 },
        { key: "Олимпиада: Облыстық 1-орын", score: 14 },
        { key: "Олимпиада: Облыстық 2-орын", score: 13 },
        { key: "Олимпиада: Облыстық 3-орын", score: 12 },
        { key: "Олимпиада: Облыстық алғыс хат", score: 11 },
        { key: "Олимпиада: Облысқа барып орын алмаса", score: 5 },
    ]},
    { title: "ІV бөлім: Мектеп өміріндегі белсенділігі", criteria: [
        { key: "Белсенділік: Көшбасшы, ұйымдастырушы", score: 10 },
        { key: "Белсенділік: Белсенді қатысушы (әр қатысқанына)", score: 5 },
    ]},
    { title: "V бөлім: Сабаққа қатысуы, тәртібі (әр күнге)", criteria: [
        { key: "Тәртіп: Әнұранға кешіксе", score: -1 },
        { key: "Тәртіп: Себепсіз қалу", score: -1 },
        { key: "Тәртіп: Мектепішілік есепте болса", score: -10 },
    ]},
    { title: "VІ бөлім: Мектеп ережесін сақтауы (әр тәртіп бұзғаны үшін)", criteria: [
        { key: "Ереже: Мұғалімен ескерту алса", score: -1 },
        { key: "Ереже: Тәртіп бұзғаны үшін", score: -3 },
    ]},
    { title: "VІІ бөлім: Ата-анасының мектеп өмірімен байланысы", criteria: [
        { key: "Ата-ана: Белсенділік танытып іс-шараларға қатысса", score: 10 },
        { key: "Ата-ана: Жиналысқа үздіксіз қатысып отырса", score: 5 },
        { key: "Ата-ана: Жиналысқа қатыспаса", score: -5 },
    ]},
    { title: "VІІІ бөлім: Түрлі конкурстардан жүлдегер атанса (әр қатысқаны үшін)", criteria: [
        { key: "Конкурс: Халықаралық 1-орын", score: 15 },
        { key: "Конкурс: Халықаралық 2-орын", score: 14 },
        { key: "Конкурс: Халықаралық 3-орын", score: 13 },
        { key: "Конкурс: Халықаралық алғыс хат", score: 12 },
        { key: "Конкурс: Республикалық байқау 1-орын", score: 12 },
        { key: "Конкурс: Республикалық байқау 2-орын", score: 11 },
        { key: "Конкурс: Республикалық байқау 3-орын", score: 10 },
        { key: "Конкурс: Республикалық байқау алғыс хат", score: 9 },
        { key: "Конкурс: Облыстық 1-орын", score: 9 },
        { key: "Конкурс: Облыстық 2-орын", score: 8 },
        { key: "Конкурс: Облыстық 3-орын", score: 7 },
        { key: "Конкурс: Облыстық алғыс хат", score: 6 },
        { key: "Конкурс: Аудандық 1-орын", score: 6 },
        { key: "Конкурс: Аудандық 2-орын", score: 5 },
        { key: "Конкурс: Аудандық 3-орын", score: 4 },
        { key: "Конкурс: Аудандық алғыс хат", score: 3 },
        { key: "Конкурс: Мектепішілік орын алса", score: 3 },
    ]},
    { title: "ІХ бөлім: Түрлі конкурстарға онлайн қатысып, жүлдегер атанса (әр қатысқаны үшін)", criteria: [
        { key: "Онлайн конкурс: Халықаралық 1-орын", score: 5 },
        { key: "Онлайн конкурс: Халықаралық 2-орын", score: 4 },
        { key: "Онлайн конкурс: Халықаралық 3-орын", score: 3 },
        { key: "Онлайн конкурс: Республикалық 1-орын", score: 4 },
        { key: "Онлайн конкурс: Республикалық 2-орын", score: 3 },
        { key: "Онлайн конкурс: Республикалық 3-орын", score: 2 },
        { key: "Онлайн конкурс: Облыстық 1-орын", score: 3 },
        { key: "Онлайн конкурс: Облыстық 2-орын", score: 2 },
        { key: "Онлайн конкурс: Облыстық 3-орын", score: 1 },
    ]},
    { title: "Х бөлім: Спорттағы жетістік (әр жетістігі үшін)", criteria: [
        { key: "Спорт: Жүлдегер атанса", score: 5 },
    ]},
    { title: "ХІ бөлім: Мектеп формасы (әр күнге)", criteria: [
        { key: "Форма: Мектеп формасын сақтамаса", score: -1 },
    ]},
    { title: "ХІІ бөлім: Өзін-өзі дамыту және soft skills", criteria: [
        { key: "Soft skills: Өзін-өзі жетілдіру үшін түрлі сайыстарға, курстарға (ҰБТ-дан бөлек) қатысса", score: 5 },
    ]},
];

const CRITERIA = {};
SECTIONS.forEach(s => s.criteria.forEach(c => { CRITERIA[c.key] = c.score; }));

let isAdmin = false, students = [], classes = [], nextId = 1, activeTab = "school";

auth.onAuthStateChanged(user => {
    isAdmin = !!user;
    document.getElementById("adminPanel").classList.toggle("hidden", !isAdmin);
    document.getElementById("loginBtn").classList.toggle("hidden", isAdmin);
    document.getElementById("logoutBtn").classList.toggle("hidden", !isAdmin);
    renderTabs(); renderStudents();
});

db.ref("/").on("value", snap => {
    const d = snap.val() || {};
    students = d.students ? Object.values(d.students) : [];
    classes = d.classes || [];
    nextId = d.nextId || 1;
    renderTabs(); renderStudents();
});

function adminLogin() {
    document.getElementById("loginModal").classList.remove("hidden");
    setTimeout(() => document.getElementById("loginEmail").focus(), 100);
}

function closeLoginModal() {
    document.getElementById("loginModal").classList.add("hidden");
    document.getElementById("loginEmail").value = "";
    document.getElementById("loginPassword").value = "";
    document.getElementById("loginError").textContent = "";
}

async function submitLogin() {
    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;
    const btn = document.getElementById("loginSubmitBtn");
    const err = document.getElementById("loginError");

    if (!email || !password) { err.textContent = "Email мен паролді толтырыңыз!"; return; }

    btn.disabled = true;
    btn.textContent = "Кіруде...";
    err.textContent = "";

    try {
        await auth.signInWithEmailAndPassword(email, password);
        closeLoginModal();
    } catch(e) {
        err.textContent = "Қате email немесе пароль! ❌";
        btn.disabled = false;
        btn.textContent = "Кіру";
    }
}

function adminLogout() { auth.signOut(); }

function addClass() {
    if (!isAdmin) return;
    const inp = document.getElementById("newClassName");
    const name = inp.value.trim().toUpperCase();
    if (!name) return alert("Сынып атын жазыңыз!");
    if (classes.includes(name)) return alert("Бұл сынып бар!");
    db.ref("/classes").set([...classes, name]);
    inp.value = "";
}

function deleteClass(cls) {
    if (!isAdmin) return;
    if (!confirm(`"${cls}" сыныбын өшіру?`)) return;
    const newStudents = students.filter(s => s.class !== cls);
    const obj = {}; newStudents.forEach(s => obj[s.id] = s);
    if (activeTab === cls) activeTab = "school";
    db.ref("/classes").set(classes.filter(c => c !== cls));
    db.ref("/students").set(Object.keys(obj).length ? obj : null);
}

function addStudent() {
    if (!isAdmin) return;
    const name = document.getElementById("newName").value.trim();
    const cls = document.getElementById("newClass").value;
    const baseScoreInput = document.getElementById("newBaseScore").value;
    const baseScore = parseInt(baseScoreInput) || 0;
    if (!name || !cls) return alert("Аты-жөні мен сыныбын таңдаңыз!");
    const id = nextId;
    const scores = {}; for (let k in CRITERIA) scores[k] = 0;
    db.ref(`/students/${id}`).set({ id, name, class: cls, scores, baseScore });
    db.ref("/nextId").set(id + 1);
    document.getElementById("newName").value = "";
    document.getElementById("newBaseScore").value = "";
}

function editBaseScore(sid) {
    if (!isAdmin) return;
    const s = students.find(s => s.id === sid); if (!s) return;
    const val = prompt(`"${s.name}" оқушысының бастапқы баллы:`, s.baseScore || 0);
    if (val === null) return;
    const num = parseInt(val);
    if (isNaN(num)) return alert("Сан енгізіңіз!");
    db.ref(`/students/${sid}/baseScore`).set(num);
}

const scoreUpdateQueue = {};

function updateScore(sid, key, adding) {
    if (!isAdmin) return;
    const s = students.find(s => s.id === sid); if (!s) return;
    const step = Math.abs(CRITERIA[key]);

    // Debounce: накапливаем изменения и отправляем через 400мс
    const queueKey = `${sid}_${key}`;
    if (!scoreUpdateQueue[queueKey]) {
        scoreUpdateQueue[queueKey] = { sid, key, delta: 0, base: s.scores[key] || 0 };
    }
    scoreUpdateQueue[queueKey].delta += adding ? step : -step;

    // Визуально обновляем сразу
    const newVal = scoreUpdateQueue[queueKey].base + scoreUpdateQueue[queueKey].delta;
    const allVals = document.querySelectorAll(`[data-sid="${sid}"][data-key="${key}"]`);
    allVals.forEach(el => {
        el.textContent = newVal;
        el.className = `score-val ${newVal > 0 ? 'pos' : newVal < 0 ? 'neg' : ''}`;
    });

    clearTimeout(scoreUpdateQueue[queueKey].timer);
    scoreUpdateQueue[queueKey].timer = setTimeout(() => {
        const q = scoreUpdateQueue[queueKey];
        const finalVal = q.base + q.delta;

        const open = {};
        document.querySelectorAll('.criteria-body').forEach((b, i) => open[i] = b.style.display !== 'none');

        db.ref(`/students/${q.sid}/scores/${q.key}`).set(finalVal).then(() => {
            delete scoreUpdateQueue[queueKey];
            setTimeout(() => {
                document.querySelectorAll('.criteria-body').forEach((b, i) => {
                    if (open[i]) {
                        b.style.display = 'block';
                        const btn = b.previousElementSibling;
                        if (btn?.classList.contains('toggle-btn')) {
                            btn.textContent = '🔼 Жабу';
                            btn.classList.add('open');
                        }
                    }
                });
            }, 300);
        });
    }, 400);
}

function deleteStudent(sid) {
    if (!isAdmin) return;
    const s = students.find(s => s.id === sid); if (!s) return;
    if (confirm(`"${s.name}" өшірілсін бе?`)) db.ref(`/students/${sid}`).remove();
}

function totalScore(s) {
    let sum = BASE_SCORE + (s.baseScore || 0);
    for (let k in CRITERIA) sum += (s.scores?.[k] || 0);
    return sum;
}

function classTotal(cls) {
    let earned = 0;
    students.filter(s => s.class === cls).forEach(s => {
        for (let k in CRITERIA) earned += (s.scores?.[k] || 0);
    });
    return earned;
}

function setTab(tab) { activeTab = tab; renderTabs(); renderStudents(); }

function renderTabs() {
    const c = document.getElementById("tabs");
    let html = `<button class="tab-btn ${activeTab==='school'?'active':''}" onclick="setTab('school')">🏫 Мектеп</button>`;
    classes.forEach(cls => html += `<button class="tab-btn ${activeTab===cls?'active':''}" onclick="setTab('${cls}')">${cls}</button>`);
    html += `<button class="tab-btn ${activeTab==='top'?'active':''}" onclick="setTab('top')">🏆 Топ</button>`;
    html += `<button class="tab-btn ${activeTab==='classrating'?'active':''}" onclick="setTab('classrating')">📊 Сыныптар</button>`;
    c.innerHTML = html;

    const sel = document.getElementById("newClass");
    if (sel) sel.innerHTML = `<option value="">— Сынып —</option>` + classes.map(c => `<option value="${c}">${c}</option>`).join("");

    const delBtn = document.getElementById("deleteClassBtn");
    if (delBtn) {
        if (activeTab !== "school" && activeTab !== "top" && activeTab !== "classrating") {
            delBtn.textContent = `🗑 "${activeTab}" сыныбын өшіру`;
            delBtn.classList.remove("hidden");
        } else { delBtn.classList.add("hidden"); }
    }
}

function renderStudents() {
    if (activeTab === "top") { renderTopPage(); return; }
    if (activeTab === "classrating") { renderClassRating(); return; }

    const container = document.getElementById("studentList");
    const top3box = document.getElementById("top3");
    const filterVal = (document.getElementById("filterInput")?.value || "").toLowerCase();

    let pool = activeTab === "school" ? students : students.filter(s => s.class === activeTab);
    const filtered = [...pool].filter(s =>
        s.name.toLowerCase().includes(filterVal) || s.class.toLowerCase().includes(filterVal)
    );

    document.getElementById("sectionTitle").textContent =
        activeTab === "school" ? "📊 Мектеп рейтингі" : `📊 ${activeTab} сынып рейтингі`;

    if (filtered.length === 0) {
        container.innerHTML = `<div class="no-results">Оқушылар табылмады 🔍</div>`;
        top3box.innerHTML = "";
        return;
    }

    container.innerHTML = "";
    filtered.forEach((s, idx) => {
        const card = document.createElement("div");
        card.className = "card";
        card.style.animationDelay = `${idx * 0.05}s`;

        const score = totalScore(s);
        const scoreClass = score > 0 ? 'pos' : score < 0 ? 'neg' : '';

        let criteriaHtml = '';
        SECTIONS.forEach(sec => {
            criteriaHtml += `<div class="section-label">${sec.title}</div>`;
            sec.criteria.forEach(c => {
                const val = s.scores?.[c.key] || 0;
                const hint = c.score > 0 ? `+${c.score}` : `${c.score}`;
                const valClass = val > 0 ? 'pos' : val < 0 ? 'neg' : '';
                criteriaHtml += `
                <div class="score-row">
                    <span class="score-row-name">${c.key.split(': ')[1]} <span class="score-hint">(${hint})</span></span>
                    <div class="score-controls">
                        <span class="score-val ${valClass}" data-sid="${s.id}" data-key="${c.key}">${val}</span>
                        ${isAdmin ? `
                        <button class="btn-plus" onclick="updateScore(${s.id},'${c.key}',true)">+</button>
                        <button class="btn-minus" onclick="updateScore(${s.id},'${c.key}',false)">−</button>
                        ` : ''}
                    </div>
                </div>`;
            });
        });

        card.innerHTML = `
            <div class="card-header">
                <div><span class="card-name">${s.name}</span><span class="card-class">${s.class}</span></div>
                <div style="display:flex;align-items:center;gap:10px">
                    ${s.baseScore ? `<span style="font-size:12px;color:var(--text2);background:rgba(255,255,255,0.06);padding:4px 10px;border-radius:20px;">🎯 Бастапқы: ${s.baseScore}</span>` : ''}
                    <div class="card-score-badge ${scoreClass}">${score} балл</div>
                </div>
            </div>
            <button class="toggle-btn" onclick="toggleCriteria(this)">📋 Критерийлер</button>
            <div class="criteria-body" style="display:none">${criteriaHtml}</div>
            <div style="display:flex;gap:8px;flex-wrap:wrap">${isAdmin ? `<button class="btn-delete" onclick="deleteStudent(${s.id})">🗑 Өшіру</button><button class="btn-delete" style="color:var(--accent);border-color:rgba(124,106,255,0.3);background:rgba(124,106,255,0.1)" onclick="editBaseScore(${s.id})">✏️ Бастапқы балл</button>` : ''}</div>
        `;
        container.appendChild(card);
    });

    // Топ-3 балл бойынша
    const sortedByScore = [...pool].sort((a, b) => totalScore(b) - totalScore(a));
    const withScore = sortedByScore.filter(s => totalScore(s) > 0);
    const allEqual = sortedByScore.length > 0 && sortedByScore.every(s => totalScore(s) === totalScore(sortedByScore[0]));
    renderTop3(withScore.slice(0, 3), allEqual);
}

function renderTopPage() {
    document.getElementById("sectionTitle").textContent = "🏆 Топ оқушылар";
    document.getElementById("top3").innerHTML = "";
    const container = document.getElementById("studentList");

    if (students.length === 0) { container.innerHTML = `<div class="no-results">Оқушылар жоқ</div>`; return; }

    const sortedDesc = [...students].sort((a, b) => totalScore(b) - totalScore(a));
    const sortedAsc = [...students].sort((a, b) => totalScore(a) - totalScore(b));
    const highest = sortedDesc.filter(s => totalScore(s) > 0).slice(0, 3);
    const lowest = sortedAsc.slice(0, 3);

    let html = `<div class="top-header gold">🥇 Ең жоғары балл алғандар</div>`;
    if (highest.length === 0) {
        html += `<div class="no-results" style="padding:20px">Балл алған оқушы жоқ</div>`;
    } else {
        highest.forEach((s, i) => {
            const medals = ["🥇","🥈","🥉"];
            const prev = i > 0 ? totalScore(highest[i-1]) : null;
            const medal = (i === 0 || totalScore(s) !== prev) ? medals[i] : '';
            html += `<div class="card" style="animation-delay:${i*0.07}s">
                <div class="card-header">
                    <div><span style="font-size:22px">${medal}</span> <span class="card-name">${s.name}</span><span class="card-class">${s.class}</span></div>
                    <div class="card-score-badge pos">${totalScore(s)} балл</div>
                </div>
            </div>`;
        });
    }

    html += `<div class="top-header red" style="margin-top:30px">⚠️ Ең төмен балл</div>`;
    lowest.forEach((s, i) => {
        const prev = i > 0 ? totalScore(lowest[i-1]) : null;
        html += `<div class="card" style="border-left:3px solid var(--red);animation-delay:${i*0.07}s">
            <div class="card-header">
                <div><span class="card-name">${s.name}</span><span class="card-class">${s.class}</span></div>
                <div class="card-score-badge ${totalScore(s) < 0 ? 'negative' : ''}" style="background:linear-gradient(135deg,var(--red),#ff6b6b);-webkit-background-clip:text;-webkit-text-fill-color:transparent">${totalScore(s)} балл</div>
            </div>
        </div>`;
    });

    container.innerHTML = html;
}

function renderClassRating() {
    document.getElementById("sectionTitle").textContent = "📊 Сыныптар рейтингі";
    document.getElementById("top3").innerHTML = "";
    const container = document.getElementById("studentList");

    if (classes.length === 0) { container.innerHTML = `<div class="no-results">Сыныптар жоқ</div>`; return; }

    const sorted = [...classes].sort((a, b) => classTotal(b) - classTotal(a));
    const topScore = classTotal(sorted[0]);
    const allEqual = sorted.every(c => classTotal(c) === topScore);
    const medals = ["🥇","🥈","🥉"];
    const borders = ["#FFD700","#C0C0C0","#CD7F32"];

    let html = '';
    sorted.forEach((cls, i) => {
        const score = classTotal(cls);
        const medal = (!allEqual && i < 3 && (i===0 || score !== classTotal(sorted[i-1]))) ? medals[i] : '';
        const border = (!allEqual && i < 3) ? borders[i] : 'var(--border)';
        const cnt = students.filter(s => s.class === cls).length;
        html += `<div class="class-card" style="border-left:4px solid ${border};animation-delay:${i*0.07}s">
            <div class="class-card-header">
                <div class="class-card-name">${medal} ${cls} сыныбы</div>
                <div class="class-card-score">${score} балл</div>
            </div>
            <div class="class-card-meta">${cnt} оқушы</div>
        </div>`;
    });

    container.innerHTML = html;
}

function renderTop3(top, allEqual) {
    const box = document.getElementById("top3");
    if (!top || top.length === 0 || allEqual) { box.innerHTML = ""; return; }
    const medals = ["🥇","🥈","🥉"];
    let html = `<div class="top3-wrap">`;
    top.forEach((s, i) => {
        const prev = i > 0 ? totalScore(top[i-1]) : null;
        const medal = (i === 0 || totalScore(s) !== prev) ? medals[i] : '—';
        html += `<div class="top3-card" style="animation-delay:${i*0.1}s">
            <div class="top3-medal">${medal}</div>
            <div class="top3-name">${s.name}</div>
            <div class="top3-class">${s.class}</div>
            <div class="top3-score">${totalScore(s)} балл</div>
        </div>`;
    });
    html += `</div>`;
    box.innerHTML = html;
}

function toggleCriteria(btn) {
    const body = btn.nextElementSibling;
    const isOpen = body.style.display !== 'none';
    body.style.display = isOpen ? 'none' : 'block';
    btn.textContent = isOpen ? '📋 Критерийлер' : '🔼 Жабу';
    btn.classList.toggle('open', !isOpen);
}
sOpen);
}
