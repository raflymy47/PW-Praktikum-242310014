import React from "react";

const genre_data = [
  { name: "Fiction", icon: "bi-journal-text", color: "primary" },
  { name: "Non-Fiction", icon: "bi-newspaper", color: "success" },
  { name: "Science", icon: "bi-lightbulb", color: "info" },
  { name: "History", icon: "bi-clock-history", color: "warning" },
  { name: "Biography", icon: "bi-person", color: "danger" },
  { name: "Children", icon: "bi-balloon", color: "secondary" },
];

export function CategoriesSection() {
  return (
    <section id="categories" className="py-5 bg-light">
      <div className="container">

        <div className="text-center mb-5">
          <h2 className="fw-bold">Book Categories</h2>
          <p className="text-muted">
            Browse books by category
          </p>
        </div>

        <div className="row g-4">
          {genre_data.map((genre, index) => (
            <div className="col-md-4" key={index}>
              <div className="card text-center shadow-sm h-100">
                <div className="card-body">
                  <i
                    className={`bi ${genre.icon} text-${genre.color}`}
                    style={{ fontSize: "3rem" }}
                  ></i>

                  <h5 className="mt-3">
                    {genre.name}
                  </h5>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}