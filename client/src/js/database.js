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
export const putDb = async (content) => console.error('putDb not implemented');

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log("This is to GET from the database");

  const jateDb = await openDB("jate", 1);

  const tx = jateDb.transaction("contact", "readonly");

  const store = tx.objectStore("jate");

  const request = store.getAll();

  const result = await request;
  console.log("Result", result)

  return result
};
// console.error('getDb not implemented');

initdb();
