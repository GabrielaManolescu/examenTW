import { Shelves, Books } from "./sync.js";
import seq from "sequelize";
import express from "express";
//Examennnn  carti - rafturi
//metoda init are 3 metode:
//1 metoda de autentificare:
async function sequelizeAuth(sequelizeConnection) {
    try {
        await sequelizeConnection.authenticate();
        console.log("Sequelize s-a conectat cu succes la baza de date!");
    }
    catch (err) {
        console.error(`Eroare : ${err}`);
    }
}

//dupa ce ne am conectat treb sa definim entitatile pe care sa le inseram in baza de date node ./sequelize/api
//fac o metoda prin care sa le sincronizam in bd
async function sequelizeSync(sequelizeConnection) {
    try {
        await sequelizeConnection.sync({ force: true, alter: true });
        console.log("Sync completed!");
    }
    catch (err) {
        console.error(`Sync failed : ${err}`);
    }
}
//creare entitate folosind sequelize, le populam=INSERTTT baza
// async function executeInitialDatabasePopulation() {
//     await Books.create({
//         BookName: "Cartea 1",
//         Gen: "istoric",
//         Url: "url",
//     });
//     await Books.create({
//         BookName: "Cartea 2",
//         Gen: "literar",
//         Url: "url",
//     });
//     await Books.create({
//         BookName: "Cartea 3",
//         Gen: "copii",
//         Url: "url",
//     });
//     await Shelves.create({
//         Description: "raft 1",
//         Date: "2022-03-12 07:50:25",
//         BookId: 1,
//     });
//     await Shelves.create({
//         Description: "raft 2",
//         Date: "2022-01-02 07:44:25",
//         BookId: 2,
//     });
//     await Shelves.create({
//         Description: "raft 3",
//         Date: "2022-01-30 08:43:40",
//         BookId: 2,
//     });
//     await Shelves.create({
//         Description: "raft 4",
//         Date: "2022-01-29 08:43:25",
//         BookId: 3,
//     });

// }



async function executeInitialDatabasePopulation() {


    await Shelves.create({
        Description: "raft 1",
        Date: "2022-03-12 07:50:25",

    });
    await Shelves.create({
        Description: "raft 2",
        Date: "2022-01-02 07:44:25",

    });
    await Shelves.create({
        Description: "raft 3",
        Date: "2022-01-30 08:43:40",

    });


    await Books.create({
        BookName: "Cartea 1",
        Gen: "istoric",
        Url: "url",
        ShelfId: 1,
    });
    await Books.create({
        BookName: "Cartea 2",
        Gen: "literar",
        Url: "url",
        ShelfId: 2,
    });
    await Books.create({
        BookName: "Cartea 3",
        Gen: "copii",
        Url: "url",
        ShelfId: 3,
    });
    await Books.create({
        BookName: "Cartea 3",
        Gen: "copii",
        Url: "url",
        ShelfId: 4,
    });


}
//2. metoda 
async function sequelizeInit(sequelizeConnection) {
    await sequelizeAuth(sequelizeConnection);
    await sequelizeSync(sequelizeConnection);
    await executeInitialDatabasePopulation();
}

function validateId(sentId, response, callbackFn = function () { }) {
    if (Number.isFinite(sentId) && sentId > 0) return callbackFn();
    else response.status(500).json("ID Invalid!");
}
function validateValue(sentValue, response, callbackFn = function () { }) {
    if (Number.isFinite(sentValue) && sentValue > 0) return callbackFn();
    else response.status(500).json("Valoare invalida!");
}
function validateBody(sentBody, response, callbackFn = function () { }) {
    if (Object.keys(sentBody).length != 0) return callbackFn();
    else response.status(500).json("Lipsessc datele din body!");
}

async function execAsyncRequest(asyncRequest) {
    try {
        return await asyncRequest();
    } catch (err) {
        throw err;
    }
}

async function getBooks() {
    return await execAsyncRequest(async function retreivedBooks() {
        return await Books.findAll();
    })
}

async function getShelves() {
    return await execAsyncRequest(async function retreivedShalves() {
        return await Shelves.findAll();
    })
}



async function getShelfById(shelfId) {
    return await execAsyncRequest(async function retreivedShalves() {
        return Shelves.findByPk(shelfId);
    });
}

async function getBookById(bookId) {
    return await execAsyncRequest(async function retreivedBooks() {
        return Books.findByPk(bookId);
    });
}









async function createShelf(shelf) {
    await execAsyncRequest(async function createShelf() {
        await Shelves.create({
            Description: shelf.Description,
            Date: shelf.Date,

        });
    });
}

async function createBook(book) {
    await execAsyncRequest(async function createBook() {
        await Books.create({
            BookName: book.BookName,
            Gen: book.Gen,
            Url: book.Url,
            ShelfId: book.ShelfId,
        });

    });
}



async function createShelfWithBooks(shelf) {
    await execAsyncRequest(async function createShelfWithBooks() {
        const result = await Shelves.create({
            Description: shelf.Description,
            Date: shelf.Date,

        });
        var { Books: books } = shelf;
        books.forEach(book => {
            Books.create({
                BookName: book.BookName,
                Gen: book.Gen,
                Url: book.Url,
                ShelfId: result.ShelfId,
            });
        });
    });
}


async function updateShelf(shelfId, shelf) {
    await execAsyncRequest(async function updateShelf() {
        const record = await Shelves.findByPk(shelfId);
        if (record) {
            await record.update({
                Description: shelf.Description,
                Date: shelf.Date,
            });
        }
    });
}

async function updateBook(bookId, book) {
    await execAsyncRequest(async function updateBook() {
        const record = await Books.findByPk(bookId);
        if (record) {
            await record.update({
                BookName: book.BookName,
                Gen: book.Gen,
                Url: book.Url,
                ShelfId: book.ShelfId,
            });
        }
    });
}





async function deleteShelf(shelfId) {
    await execAsyncRequest(async function deleteShelf() {
        const record = await Shelves.findByPk(shelfId);
        if (record) await record.destroy();
    });
}

async function deleteBook(bookId) {
    await execAsyncRequest(async function deleteBook() {
        const record = await Books.findByPk(bookId);
        if (record) await record.destroy();
    });
}



//export un fisier
export const sequelizeOperationsAPI = {
    init: sequelizeInit,
    validateId: validateId,
    validateValue: validateValue,
    validateBody: validateBody,
    getBooks: getBooks,
    getShelves: getShelves,

    getShelfById: getShelfById,
    getBookById: getBookById,



    createShelf: createShelf,
    createBook: createBook,

    createShelfWithBooks: createShelfWithBooks,

    updateShelf: updateShelf,
    updateBook: updateBook,

    deleteShelf: deleteShelf,
    deleteBook: deleteBook,

};