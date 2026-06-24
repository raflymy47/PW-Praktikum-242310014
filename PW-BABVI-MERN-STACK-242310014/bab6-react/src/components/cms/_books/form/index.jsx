"use client";

import { useState, useEffect } from "react";

export default function FormBook({
  handleSave,
  initialData = null,
}) {
  const [form, setForm] = useState({
    title: "",
    author: "",
    type: "",
    sinopsis: "",
    story: "",
    image: null,
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title || "",
        author: initialData.author || "",
        type: initialData.type || "",
        sinopsis: initialData.sinopsis || "",
        story: initialData.story || "",
        image: null,
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setForm({
      ...form,
      [name]: files ? files[0] : value,
    });
  };

  const submitForm = (e) => {
    e.preventDefault();
    handleSave(form);

    setForm({
      title: "",
      author: "",
      type: "",
      sinopsis: "",
      story: "",
      image: null,
    });
  };

  return (
    <form onSubmit={submitForm}>
      <div className="mb-3">
        <label className="form-label">Book Title</label>
        <input
          type="text"
          className="form-control"
          name="title"
          value={form.title}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Author Name</label>
        <input
          type="text"
          className="form-control"
          name="author"
          value={form.author}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Type Book</label>
        <input
          type="text"
          className="form-control"
          name="type"
          value={form.type}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Sinopsis</label>
        <textarea
          className="form-control"
          name="sinopsis"
          rows="3"
          value={form.sinopsis}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Story</label>
        <textarea
          className="form-control"
          name="story"
          rows="5"
          value={form.story}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Upload Image</label>
        <input
          type="file"
          className="form-control"
          name="image"
          onChange={handleChange}
        />
      </div>

      <button className="btn btn-success">
        Save Book
      </button>
    </form>
  );
}