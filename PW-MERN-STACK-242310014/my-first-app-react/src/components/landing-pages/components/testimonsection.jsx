import React from "react";

const user_testimonials = [
  {
    name: "Anton Sukamto",
    review: "Amazing collection! Found all my favorite books here.",
    rating: 5,
  },
  {
    name: "Isnan Mulia",
    review: "Fast delivery and great customer service.",
    rating: 5,
  },
  {
    name: "Edi Nurachmad",
    review: "Best prices I've found online.",
    rating: 4,
  },
];

export function TestimonSection() {
  return (
    <section className="py-5">
      <div className="container">

        <div className="text-center mb-5">
          <h2 className="fw-bold">
            What Our Readers Say
          </h2>

          <p className="text-muted">
            Join thousands of satisfied book lovers
          </p>
        </div>

        <div className="row g-4">

          {user_testimonials.map((testimonial, index) => (
            <div key={index} className="col-md-4">

              <div className="card h-100 shadow-sm">
                <div className="card-body">

                  <div className="mb-3">
                    {[...Array(5)].map((_, i) => (
                      <i
                        key={i}
                        className={`bi bi-star${
                          i < testimonial.rating
                            ? "-fill"
                            : ""
                        } text-warning`}
                      ></i>
                    ))}
                  </div>

                  <p>
                    "{testimonial.review}"
                  </p>

                  <h6>{testimonial.name}</h6>

                </div>
              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}