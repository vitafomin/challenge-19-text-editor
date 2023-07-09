import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log("This is to PUT to the database")

  const jateDb = await openDB("jate", 1);

  const tx = jateDb.transaction("jate", "readwrite");

  const store = tx.objectStore("jate");

  const request = store.put({ jate: content });

  const result = await request;

  console.log("Result", result);
};
// console.error('putDb not implemented');

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log("This is to GET ALL from the database");

  const jateDb = await openDB("jate", 1);
  

  const tx = jateDb.transaction("jate", "readonly");
  console.log("jake tx: "+ tx);

  const store = tx.objectStore("jate");
  console.log("jake store: "+ store);

  const request = store.getAll();

  const result = await request;
  console.log("Result", result)
  if (result.length === 0) {
    return null;
  }
  let s = "";
  result.forEach(entry => {
    s.concat(entry);
  })

  return s;
};
// console.error('getDb not implemented');

initdb();
