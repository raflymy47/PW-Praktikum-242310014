import React from "react";
import { BookCard } from "./bookcard";

const ListBooks = [
  {
    id: 1,
    title: "React Fundamentals",
    author: "John Doe",
    is_free: true,
    sinopsis: "Learn React from beginner to advanced.",
    rating: 4.8,
    views: 1500,
  },
  {
    id: 2,
    title: "Next JS Complete Guide",
    author: "Jane Smith",
    is_free: false,
    sinopsis: "Master Next.js development.",
    rating: 4.9,
    views: 2300,
  },
  {
    id: 3,
    title: "JavaScript Modern",
    author: "Michael Brown",
    is_free: true,
    sinopsis: "Modern JavaScript for web developers.",
    rating: 4.7,
    views: 1800,
  },
  {
    id: 4,
    title: "UI UX Design",
    author: "Sarah Wilson",
    is_free: false,
    sinopsis: "Learn beautiful user interface design.",
    rating: 4.6,
    views: 1200,
  },
  {
    id: 5,
    title: "Node JS Backend",
    author: "David Miller",
    is_free: true,
    sinopsis: "Backend development with Node.js.",
    rating: 4.8,
    views: 2700,
  },
  {
    id: 6,
    title: "Database Essentials",
    author: "Robert King",
    is_free: false,
    sinopsis: "Introduction to modern databases.",
    rating: 4.5,
    views: 1100,
  },
];

export function FeaturedBooksSection() {
  return (
    <section
      id="books"
      className="py-5"
    >
      <div className="container">

        <div className="text-center mb-5">
          <h2 className="fw-bold">
            Featured Books
          </h2>

          <p className="text-muted">
            Explore our best-selling collection
          </p>
        </div>

        <div className="row g-4">
          {ListBooks.map((book) => (
            <div
              className="col-md-4"
              key={book.id}
            >
              <BookCard book={book} />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}