const admin = require('firebase-admin');

// 初始化 Firebase Admin SDK
// 它會自動尋找 GOOGLE_APPLICATION_CREDENTIALS 環境變數
// 或使用預設的 Application Default Credentials
try {
  admin.initializeApp();
} catch (error) {
  // 如果已經初始化，忽略錯誤
  if (!error.message.includes('already initialized')) {
    throw error;
  }
}

const db = admin.firestore();

async function initializeTestData() {
  try {
    console.log('📝 開始寫入測試資料...');

    // 建立 test 集合並寫入一筆測試資料
    const testDocRef = await db.collection('test').add({
      title: '測試文件',
      description: '這是寫入 Firestore 的第一筆測試資料',
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
      count: 1,
      isActive: true,
      tags: ['test', 'firestore', 'initialization']
    });

    console.log('✅ 成功建立測試文件！');
    console.log(`📌 文件 ID: ${testDocRef.id}`);
    console.log(`📂 集合: test`);

    // 查詢剛建立的資料以驗證
    const docSnapshot = await testDocRef.get();
    console.log('\n📖 寫入的資料內容：');
    console.log(JSON.stringify(docSnapshot.data(), null, 2));

    // 列出 test 集合中的所有文件
    console.log('\n📊 test 集合中的所有文件：');
    const querySnapshot = await db.collection('test').get();

    querySnapshot.forEach((doc) => {
      console.log(`- ${doc.id}:`, doc.data());
    });

    console.log(`\n✨ 共有 ${querySnapshot.size} 筆資料`);

  } catch (error) {
    console.error('❌ 寫入資料時出錯：', error);
    process.exit(1);
  }
}

initializeTestData().then(() => {
  console.log('\n🎉 初始化完成！');
  process.exit(0);
});
