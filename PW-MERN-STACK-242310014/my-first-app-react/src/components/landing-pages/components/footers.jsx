import React from "react";

export function Footers() {
  return (
    <footer
      id="contact"
      className="bg-light py-4"
    >
      <div className="container">

        <div className="row">

          <div className="col-md-4">
            <h5>
              <i className="bi bi-book-fill me-2"></i>
              Readly+
            </h5>

            <p className="text-muted">
              Your trusted online bookstore.
            </p>
          </div>

          <div className="col-md-4">
            <h6>Quick Links</h6>

            <ul className="list-unstyled">
              <li>About Us</li>
              <li>Contact</li>
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
            </ul>
          </div>

          <div className="col-md-4">
            <h6>Contact</h6>

            <p>
              <i className="bi bi-envelope me-2"></i>
              info@readly.com
            </p>

            <p>
              <i className="bi bi-telephone me-2"></i>
              +62 8123456789
            </p>
          </div>

        </div>

        <hr />

        <div className="text-center text-muted">
          © 2026 Readly+. All Rights Reserved.
        </div>

      </div>
    </footer>
  );
}