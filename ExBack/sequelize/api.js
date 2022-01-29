import "./sync.js";
import { router } from "../server-init.js";

import { sequelizeOperationsAPI } from "./operations-api.js";


//RUTA GET---//http://localhost:8080/api/sequelize/books
router.route("/sequelize/books")
    .get(async function getBooks(_, response) {
        const result = await sequelizeOperationsAPI.getBooks();
        if (result.length == 0) {
            response.status(500).json("Nu exista aceasta carte!");
        }
        else response.status(200).json(result);
    });

//RUTA GET---//http://localhost:8080/api/sequelize/shelves
router.route("/sequelize/shelves")
    .get(async function getShelves(_, response) {
        const result = await sequelizeOperationsAPI.getShelves();
        if (result.length == 0) {
            response.status(500).json("Nu exista acest raft!");
        }
        else response.status(200).json(result);
    });

//////
//get by id--http://localhost:8080/api/sequelize/get-shelves/1
router.route("/sequelize/get-shelves/:shelvesId")
    .get(async function getShelfById(request, response) {
        const shelvesId = +request.params.shelvesId;
        sequelizeOperationsAPI.validateId(shelvesId, response, async function handleSuccessfulValidation() {
            const result = await sequelizeOperationsAPI.getShelfById(shelvesId);
            if (result == null) response.status(500).json(`Aceast raft nu exista!`);
            else response.status(200).json(result);
        });
    });

//GEt id ---/http://localhost:8080/api/sequelize/get-books/1
router.route("/sequelize/get-books/:booksId")
    .get(async function getBookById(request, response) {
        const booksId = +request.params.booksId;
        sequelizeOperationsAPI.validateId(booksId, response, async function handleSuccessfulValidation() {
            const result = await sequelizeOperationsAPI.getBookById(booksId);
            if (result == null) response.status(500).json(`Aceasta carte nu exista!`);
            else response.status(200).json(result);
        })
    });

////

//post- Create Books---In POSTMANN   //Ruta de POST= creeare  din POSTMAN--http://localhost:8080/api/sequelize/book
router.route("/sequelize/book")
    .post(async function createBook({ body }, response) {
        try {
            sequelizeOperationsAPI.validateBody(body, response, async function handleSuccessfulValidation() {
                if (Object.keys(body).length < 0) {
                    response.status(500).json("Formatul nu este corect!");
                }
                else {
                    await sequelizeOperationsAPI.createBook(body);
                    response.status(200).json("Cartea s-a adaugat cu succes!");
                }
            });
        } catch (err) {
            console.error(`There was an error while calling API: ${err}`);
        }
    });

//Post- Shelves In POSTMANN   //Ruta de POST= din POSTMAN--http://localhost:8080/api/sequelize/shelf

router.route("/sequelize/shelf")
    .post(async function createShelf({ body }, response) {
        try {
            sequelizeOperationsAPI.validateBody(body, response, async function handleSuccessfulValidation() {
                if (Object.keys(body).length < 2) {
                    response.status(500).json("Formatul nu este corect!");
                }
                else {
                    await sequelizeOperationsAPI.createShelf(body);
                    response.status(200).json("Raftul s-a creat cu succes!");
                }
            });
        } catch (err) {
            console.error(`Eroare: ${err}`);
        }
    });


//Post - Create shelf with books-- ma duc in Postmann --http://localhost:8080/api/sequelize/shelf-with-books
router.route("/sequelize/shelf-with-books")
    .post(async function createShelfWithBooks({ body }, response) {
        try {
            sequelizeOperationsAPI.validateBody(body, response, async function handleSuccessfulValidation() {
                await sequelizeOperationsAPI.createShelfWithBooks(body);
                response.status(200).json("S-a creat raftul cu cartile alese!");
            });
        } catch (err) {
            console.error(`Eroare :${err}`);
        }
    });


//Put- Update shelf-- ma duc in Postmann--http://localhost:8080/api/sequelize/update-shelves/4
router.route("/sequelize/update-shelves/:shelfId")
    .put(async function updateShelf({ params: { shelfId }, body }, response) {
        try {
            const record = await sequelizeOperationsAPI.getShelfById(+shelfId);
            if (record == null)
                response.status(200).json("Aceast raft nu exista!");
            else {
                sequelizeOperationsAPI.validateId(+shelfId, response, async function handleSuccessfulValidation() {
                    sequelizeOperationsAPI.validateBody(body, response, async function handleSuccessfulValidation() {
                        await sequelizeOperationsAPI.updateShelf(+shelfId, body);
                        response.status(200).json("Raftul s-a modificat cu succes!");
                    });
                });
            }

        } catch (err) {
            console.error(`There was an error while calling API :${err}`);
        }
    });

//PUT- Update books-- ma duc in Postmannn http://localhost:8080/api/sequelize/update-book/6
router.route("/sequelize/update-book/:bookId")
    .put(async function updateBook({ params: { bookId }, body }, response) {
        try {
            const record = await sequelizeOperationsAPI.getBookById(+bookId);
            if (record == null)
                response.status(500).json("Aceasta carte nu exista!");
            else {
                sequelizeOperationsAPI.validateId(+bookId, response, async function handleSuccessfulValidation() {
                    sequelizeOperationsAPI.validateBody(body, response, async function handleSuccessfulValidation() {
                        await sequelizeOperationsAPI.updateBook(+bookId, body);
                        response.status(200).json("Cartea s-a modificat cu succes!");
                    });
                });
            }
        } catch (err) {
            console.error(`Eroare :${err}`);
        }
    });
//- Delete shelf-- ma duc in POSTMANN http://localhost:8080/api/sequelize/delete-shelf/4
router.route("/sequelize/delete-shelf/:shelfId")
    .delete(async function deleteShelf({ params: { shelfId } }, response) {
        try {
            const record = await sequelizeOperationsAPI.getShelfById(+shelfId);
            if (record == null)
                response.status(200).json("Acest raft nu exista!");
            else {
                sequelizeOperationsAPI.validateId(+shelfId, response, async function handleSuccessfulValidation() {
                    await sequelizeOperationsAPI.deleteShelf(+shelfId);
                    response.status(200).json("Raftul s-a sters!");
                });
            }
        } catch (err) {
            console.error(`Eroare :${err}`);
        }
    });


// Delete -- Ma duc in POSTMANNN-http://localhost:8080/api/sequelize/delete-book/4
router.route("/sequelize/delete-book/:bookId")
    .delete(async function deleteBook({ params: { bookId } }, response) {
        try {
            const record = await sequelizeOperationsAPI.getBookById(+bookId);
            if (record == null)
                response.status(500).json("Aceasta carte nu exista!");
            else {
                sequelizeOperationsAPI.validateId(+bookId, response, async function handleSuccessfulValidation() {
                    await sequelizeOperationsAPI.deleteBook(+bookId);
                    response.status(200).json("Cartea s-a sters cu succes!");
                });
            }
        } catch (err) {
            console.error(`Eroare:${err}`);
        }
    });
