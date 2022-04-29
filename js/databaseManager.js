// //https://developers.google.com/web/ilt/pwa/working-with-indexeddb


// import { openDB, deleteDB, wrap, unwrap } from 'https://cdn.jsdelivr.net/npm/idb@7/+esm';

// var dbPromise;

// (function() {
//     'use strict';

//     //check for support
//     if (!('indexedDB' in window)) {
//         console.log('This browser doesn\'t support IndexedDB. Some things may not work 😔');
//         window.alert('This browser doesn\'t support IndexedDB. Some things may not work 😔');
//     } else {
//         console.log('This browser does support IndexedDB');
//     }

//     dbPromise = idb.open("HighNoon-db", 1, function(upgradeDb) {
//         if (!upgradeDb.objectStoreNames.contains('gameHistory')) {
//             var gameHistoryOS = upgradeDb.createObjectStore('gameHistory', {
//                 keyPath: 'id',
//                 autoIncrement: true
//             });
//         }
//     });

// })();

// dbPromise.then(function(db) {
//     var transaction = db.transaction('gameHistory', 'readwrite');
//     var gameHistoryStore = transaction.objectStore('gameHistory');
//     store.add({ name: 'test' });
//     return transaction.complete;
// });

// //https://github.com/jakearchibald/idb#installation



// //   async function doDatabaseStuff() {
// //     const db = await openDB(…);
// //   }