export function BookCard({ book }) {
  return (
    <div className="card h-100 shadow-sm">
      <div className="card-body">

        <div className="text-center mb-3">
          <i
            className="bi bi-book-fill text-primary"
            style={{ fontSize: "4rem" }}
          ></i>
        </div>

        <h5>{book.title}</h5>

        <p className="text-muted">
          Author : {book.author}
        </p>

        <p>
          {book.sinopsis}
        </p>

        <div className="d-flex justify-content-between">
          <span>
            ⭐ {book.rating}
          </span>

          <span>
            👁 {book.views}
          </span>
        </div>

        <div className="mt-3">
          {book.is_free ? (
            <span className="badge bg-success">
              Free
            </span>
          ) : (
            <span className="badge bg-warning text-dark">
              Premium
            </span>
          )}
        </div>

      </div>
    </div>
  );
}