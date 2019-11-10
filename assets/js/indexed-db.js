// file untuk mengatur indexedDB di browser
const DB_NAME = 'football';
const DB_VERSION = 1;
const OBJECT_STORE_NAME = 'my_team';

// membuat object store
// fungsi ini digunakan dalam fungsi db()
const createObjectStore = (upgradeDB) => {
  return upgradeDB.createObjectStore(OBJECT_STORE_NAME, { keyPath: 'id' });
}

// database
const database = async () => {
  // check indexedDB 
  if (!window.indexedDB) {
    console.log('[IndexedDB]: browser tidak mendukung');
    return null
  }
  // membuat indexedDB dalam bentuk promise
  return await idb.open(DB_NAME, DB_VERSION, createObjectStore);
}

// insert data baru 
const dbDataCreate = async ({ objectStore = OBJECT_STORE_NAME , payload }) => {
  try {
    const db = await database();
    const transaction = db.transaction(objectStore, 'readwrite');
    const store = transaction.objectStore(objectStore);
    store.add(payload);
    console.log(`[IndexedDB]: menambah data '${objectStore}'`);
    return transaction.complete;
  } catch (error) {
    console.error(`[IndexedDB]: ${error}`);
  }
}

// hapus data
const dbDataDelete = async ({ objectStore = OBJECT_STORE_NAME, keyPath }) => {
  try {    
    const db = await database();
    const transaction = db.transaction(objectStore, 'readwrite');
    const store = transaction.objectStore(objectStore);
    store.delete(keyPath) // tipe data keyPath harus sama
    console.log(`[IndexedDB]: manghapus data: '${objectStore}' dengan keyPath: ${keyPath}`);
    return transaction.complete;
  } catch (error) {
    console.error(`[IndexedDB]: ${error}`);
  }
};

// read data
const dbDataRead = async ({ objectStore = OBJECT_STORE_NAME, keyPath = '' }) => {
  try {
    const db = await database();
    const transaction = db.transaction(objectStore, 'readonly');
    let store = transaction.objectStore(objectStore);
    console.log('[IndexedDB]: read data');
    if (keyPath)
      return store.get(keyPath);
    return store.getAll();
  } catch (error) {
    console.error(`[IndexedDB]: ${error}`);
  }
};