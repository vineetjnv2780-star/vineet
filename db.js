let db;
const request = indexedDB.open("VKAppsDB", 1);

request.onupgradeneeded = e => {
  db = e.target.result;
  db.createObjectStore("entries", { keyPath: "id", autoIncrement: true });
};

request.onsuccess = e => db = e.target.result;
