"use client";

import { useState } from "react";
import { BookList } from "@/const/bookList";
import FormBook from "@/components/cms/_books/form";

export default function BooksPage() {
  const [books, setBooks] = useState(BookList);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const [editingBook, setEditingBook] = useState(null);

  const deleteBook = (id) => {
    setBooks(books.filter((book) => book.id !== id));
  };

  const editBook = (book) => {
    setEditingBook(book);
    setShowForm(true);
  };

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1>Books Management</h1>
          <p className="text-muted">Manage your book collection</p>
        </div>

        <button
          className="btn btn-success"
          onClick={() => {
            setEditingBook(null);
            setShowForm(true);
          }}
        >
          <i className="bi bi-plus-circle me-2"></i>
          Add New Book
        </button>
      </div>

      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card">
            <div className="card-body">
              <small className="text-muted">Total Books</small>
              <h3>{books.length}</h3>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card">
            <div className="card-body">
              <small className="text-muted">Categories</small>
              <h3>2</h3>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card">
            <div className="card-body">
              <small className="text-muted">Latest Year</small>
              <h3>2025</h3>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card">
            <div className="card-body">
              <small className="text-muted">Authors</small>
              <h3>{books.length}</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h5>Book List</h5>

            <input
              type="text"
              className="form-control w-25"
              placeholder="Search here..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <table className="table align-middle">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Author</th>
                <th>Language</th>
                <th>Rate/View</th>
                <th>Subscribe</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredBooks.map((book) => (
                <tr key={book.id}>
                  <td>#{book.id}</td>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.language}</td>
                  <td>
                    ⭐ {book.rating}
                    <br />
                    👁️ {book.views}
                  </td>
                  <td>
                    <span className="badge bg-secondary">
                      {book.subscribe}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn btn-outline-warning btn-sm me-2"
                      onClick={() => editBook(book)}
                    >
                      <i className="bi bi-pencil"></i>
                    </button>

                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => deleteBook(book.id)}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showForm && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
          style={{
            background: "rgba(0,0,0,0.5)",
            zIndex: 9999,
          }}
        >
          <div
            className="bg-white p-4 rounded shadow"
            style={{
              width: "600px",
              maxHeight: "90vh",
              overflowY: "auto",
            }}
          >
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4>
                {editingBook ? "Edit Book" : "Add New Book"}
              </h4>

              <button
                className="btn-close"
                onClick={() => {
                  setShowForm(false);
                  setEditingBook(null);
                }}
              ></button>
            </div>

            <FormBook
              initialData={editingBook}
              handleSave={(data) => {
                if (editingBook) {
                  const updatedBooks = books.map((book) =>
                    book.id === editingBook.id
                      ? {
                          ...book,
                          title: data.title,
                          author: data.author,
                          type: data.type,
                          sinopsis: data.sinopsis,
                          story: data.story,
                        }
                      : book
                  );

                  setBooks(updatedBooks);
                  setEditingBook(null);
                } else {
                  const newBook = {
                    id: books.length + 1,
                    title: data.title,
                    author: data.author,
                    type: data.type,
                    sinopsis: data.sinopsis,
                    story: data.story,
                    language: "id-ID",
                    rating: 0,
                    views: 0,
                    subscribe: "No",
                  };

                  setBooks([...books, newBook]);
                }

                setShowForm(false);
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}