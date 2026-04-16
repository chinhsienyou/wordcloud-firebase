// Firebase 初始化配置
const firebaseConfig = {
    apiKey: "AIzaSyCxLzEwLkosqlY5SzGWJRsTROv3hZGdRkg",
    authDomain: "itstudy-5bba9.firebaseapp.com",
    projectId: "itstudy-5bba9",
    storageBucket: "itstudy-5bba9.firebasestorage.app",
    messagingSenderId: "1047292165946",
    appId: "1:1047292165946:web:9324f356685aed9c9eda03"
};

// 初始化 Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// DOM 元素
const wordInput = document.getElementById('wordInput');
const submitBtn = document.getElementById('submitBtn');
const charCount = document.getElementById('charCount');
const cloudContainer = document.getElementById('cloudContainer');
const totalWordsEl = document.getElementById('totalWords');
const totalCountEl = document.getElementById('totalCount');
const statusEl = document.getElementById('status');
const recentList = document.getElementById('recentList');

let allWords = [];
let recentWords = [];
let unsubscribe = null;

// 初始化應用
function init() {
    attachEventListeners();
    setupRealtimeListener();
}

// 事件監聽
function attachEventListeners() {
    wordInput.addEventListener('input', updateCharCount);
    wordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') submitWord();
    });
    submitBtn.addEventListener('click', submitWord);
}

// 更新字數計數
function updateCharCount() {
    charCount.textContent = wordInput.value.length;
}

// 提交詞語
async function submitWord() {
    const word = wordInput.value.trim();

    if (!word) {
        showNotification('請輸入詞語', 'warning');
        return;
    }

    if (word.length > 20) {
        showNotification('詞語過長（最多 20 字）', 'warning');
        return;
    }

    try {
        submitBtn.disabled = true;
        submitBtn.textContent = '提交中...';

        // 用詞語本身當 document ID，徹底防止重複 + 避免 race condition
        const docRef = db.collection('wordcloud_words').doc(word);

        await db.runTransaction(async (transaction) => {
            const doc = await transaction.get(docRef);
            if (!doc.exists) {
                // 新詞，建立文件
                transaction.set(docRef, {
                    word: word,
                    count: 1,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp()
                });
            } else {
                // 已存在，增加計數
                transaction.update(docRef, {
                    count: firebase.firestore.FieldValue.increment(1),
                    lastUpdated: firebase.firestore.FieldValue.serverTimestamp()
                });
            }
        });

        showNotification(`「${word}」投稿成功！`, 'success');

        // 清空輸入
        wordInput.value = '';
        charCount.textContent = '0';
        wordInput.focus();

    } catch (error) {
        console.error('提交失敗：', error);
        showNotification('提交失敗，請重試', 'error');
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = '提交';
    }
}

// 實時監聽 Firestore
function setupRealtimeListener() {
    statusEl.textContent = '連接中...';

    unsubscribe = db.collection('wordcloud_words')
        .orderBy('count', 'desc')
        .limit(100)
        .onSnapshot(
            (snapshot) => {
                allWords = [];
                recentWords = [];

                snapshot.forEach((doc) => {
                    const data = doc.data();
                    allWords.push([data.word, data.count]);
                    recentWords.unshift({
                        word: data.word,
                        count: data.count,
                        timestamp: data.createdAt
                    });
                });

                // 更新統計
                updateStats();

                // 渲染文字雲
                renderCloud();

                // 更新最新投稿
                updateRecentList();

                statusEl.textContent = '已連接 ✓';
                statusEl.style.color = 'var(--success-color)';
            },
            (error) => {
                console.error('監聽失敗：', error);
                statusEl.textContent = '連接失敗';
                statusEl.style.color = 'var(--primary-color)';
                showNotification('無法連接到資料庫，請重新整理頁面', 'error');
            }
        );
}

// 更新統計資訊
function updateStats() {
    totalWordsEl.textContent = allWords.length;
    const totalCount = allWords.reduce((sum, [, count]) => sum + count, 0);
    totalCountEl.textContent = totalCount;
}

// 渲染文字雲
function renderCloud() {
    // 清空容器
    cloudContainer.innerHTML = '';

    if (allWords.length === 0) {
        cloudContainer.innerHTML = '<div class="loading"><p>暫無資料，快來投稿吧！</p></div>';
        return;
    }

    // 建立 Canvas
    const canvas = document.createElement('canvas');
    canvas.width = cloudContainer.clientWidth;
    canvas.height = cloudContainer.clientHeight || 400;
    cloudContainer.appendChild(canvas);

    // 配置顏色
    const colors = [
        '#ff6b6b', '#ee5a6f', '#c44569', '#f8b500', '#f6c90e',
        '#ffd700', '#00b894', '#00cec9', '#0984e3', '#6c5ce7',
        '#fd79a8', '#fdcb6e', '#a29bfe', '#74b9ff', '#81ecec'
    ];

    // 渲染文字雲
    WordCloud(canvas, {
        list: allWords,
        fontFamily: '"Microsoft JhengHei", PingFang SC, sans-serif',
        color: () => colors[Math.floor(Math.random() * colors.length)],
        rotateRatio: 0.3,
        rotationSteps: 2,
        backgroundColor: '#f8f9fa',
        minSize: 12,
        weightFactor: (size) => {
            return Math.pow(size / allWords[0][1], 1.2) * 80;
        },
        click: (item) => {
            wordInput.value = item[0];
            updateCharCount();
            wordInput.focus();
        }
    });

    // 響應式調整
    window.addEventListener('resize', debounce(() => {
        const newWidth = cloudContainer.clientWidth;
        if (canvas.width !== newWidth) {
            renderCloud();
        }
    }, 300));
}

// 更新最新投稿列表
function updateRecentList() {
    recentList.innerHTML = '';

    if (recentWords.length === 0) {
        recentList.innerHTML = '<li class="empty">暫無投稿</li>';
        return;
    }

    const recentItems = recentWords.slice(0, 10);
    recentItems.forEach((item) => {
        const li = document.createElement('li');
        li.textContent = `${item.word} (${item.count})`;
        recentList.appendChild(li);
    });
}

// 顯示通知
function showNotification(message, type = 'info') {
    // 簡單的控制台通知，可擴展為視覺通知
    console.log(`[${type.toUpperCase()}] ${message}`);
}

// 防抖函數
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 清理資源
window.addEventListener('beforeunload', () => {
    if (unsubscribe) unsubscribe();
});

// 啟動應用
init();
