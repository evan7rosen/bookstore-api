const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const port = 8000;
const books = require("./books");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/books", (req, res) => {
  res.json(books);
});

app.get("/books/:id", (req, res) => {
  let selectedBook = books.find(book.id === Number(req.params.id));
  if (!selectedBook) res.status(404).send("BOOK NOT FOUND");
  res.json(selectedBook);
});

app.post("/books", (req, res) => {
  let newBook = {
    title: req.body.title,
    subtitle: req.body.subtitle,
    author: req.body.author,
    published: req.body.published,
    publisher: req.body.publisher,
    pages: req.body.pages,
    description: req.body.description,
    website: req.body.website,
    inCart: req.body.inCart,
    price: req.body.price,
    coverImg: req.body.coverImg,
    id: books.length + 1
  };
  books.push(newBook);
  res.json(books);
});

app.patch("http://localhost:8082/api/books/cart/add/:id", (req, res) => {
  let selectedBook = books.find(book.id === Number(req.params.id));
  if (!selectedBook) res.status(404).send("BOOK NOT FOUND");
  selectedBook.inCart = true;
  res.json(selectedBook);
});

app.patch("http://localhost:8082/api/books/cart/remove/:id", (req, res) => {
  let selectedBook = books.find(book.id === Number(req.params.id));
  if (!selectedBook) res.status(404).send("BOOK NOT FOUND");
  selectedBook.inCart = remove;
  res.json(selectedBook);
});

app.post("/books/edit/:id", (req, res) => {
  let selectedBook = books.find(book.id === Number(req.params.id));
  if (!selectedBook) res.status(404).send("BOOK NOT FOUND");
  selectedBook = {
    title: req.body.title,
    subtitle: req.body.subtitle,
    author: req.body.author,
    published: req.body.published,
    publisher: req.body.publisher,
    pages: req.body.pages,
    description: req.body.description,
    website: req.body.website,
    inCart: req.body.inCart,
    price: req.body.price,
    coverImg: req.body.coverImg
  };
  res.json(selectedBook);
});

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});
