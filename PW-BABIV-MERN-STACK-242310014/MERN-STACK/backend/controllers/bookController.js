const db = require("../models");
const Book = db.Book;
const { Op } = db.Sequelize;

const path = require("path");
const fs = require("fs");

const deleteFile = (filePath) => {
  if (filePath && fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
};

const renameBookImage = (oldPath, bookId, bookTitle) => {
  try {
    const ext = path.extname(oldPath);

    const sanitizedTitle = bookTitle
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "")
      .substring(0, 50);

    const newFilename = `${sanitizedTitle}-${bookId}${ext}`;
    const newPath = path.join(path.dirname(oldPath), newFilename);

    fs.renameSync(oldPath, newPath);

    return `/uploads/books/${newFilename}`;
  } catch (error) {
    console.error("Error renaming file:", error);
    return oldPath;
  }
};

// ======================================
// GET ALL BOOKS
// ======================================

exports.getAllBooks = async (req, res) => {
  try {
    const { search, is_free, language, sort_by, order } = req.query;

    let whereClause = {};

    if (search) {
      whereClause = {
        ...whereClause,
        [Op.or]: [
          {
            title: {
              [Op.like]: `%${search}%`,
            },
          },
          {
            author: {
              [Op.like]: `%${search}%`,
            },
          },
          {
            sinopsis: {
              [Op.like]: `%${search}%`,
            },
          },
        ],
      };
    }

    if (is_free !== undefined) {
      whereClause.is_free = is_free === "true";
    }

    if (language) {
      whereClause.language = language;
    }

    let orderClause = [["created_at", "DESC"]];

    if (sort_by) {
      const sortOrder =
        order && order.toUpperCase() === "ASC" ? "ASC" : "DESC";

      orderClause = [[sort_by, sortOrder]];
    }

    const books = await Book.findAll({
      where: whereClause,
      order: orderClause,
    });

    res.json({
      success: true,
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.error("Error fetching books:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch books",
      error: error.message,
    });
  }
};




// ======================================
// GET BOOK BY ID
// ======================================

exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    // Increment views
    await book.increment("views");
    await book.reload();

    res.json({
      success: true,
      data: book,
    });
  } catch (error) {
    console.error("Error fetching book:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch book",
      error: error.message,
    });
  }
};

// ======================================
// CREATE BOOK
// ======================================

exports.createBook = async (req, res) => {
  try {
    console.log("Request body:", req.body);
    console.log("Request file:", req.file);
    console.log("User from token:", req.user);

    const {
      title,
      author,
      rating,
      views,
      is_free,
      language,
      sinopsis,
      story,
    } = req.body;

    // Validation
    if (!title || !author || !sinopsis || !story) {
      if (req.file) {
        deleteFile(req.file.path);
      }

      return res.status(400).json({
        success: false,
        message:
          "Title, author, sinopsis, and story are required",
      });
    }

    const bookData = {
      title,
      author,
      rating: rating ? parseFloat(rating) : 0,
      views: views ? parseInt(views) : 0,
      is_free:
        is_free === "true" || is_free === true,
      language: language || "English",
      sinopsis,
      story,
      created_by: req.user?.email || "system",
    };

    const book = await Book.create(bookData);

    if (req.file) {
      const imagePath = renameBookImage(
        req.file.path,
        book.id,
        book.title
      );

      await book.update({
        image: imagePath,
      });
    }

    await book.reload();

    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: book,
    });
  } catch (error) {
    console.error("Error creating book:", error);

    if (req.file) {
      deleteFile(req.file.path);
    }

    if (error.name === "SequelizeValidationError") {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: error.errors.map((e) => ({
          field: e.path,
          message: e.message,
        })),
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to create book",
      error: error.message,
    });
  }
};



// ======================================
// UPDATE BOOK (FULL UPDATE)
// ======================================

exports.updateBook = async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);

    if (!book) {
      if (req.file) {
        deleteFile(req.file.path);
      }

      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    const {
      title,
      author,
      rating,
      views,
      is_free,
      language,
      sinopsis,
      story,
    } = req.body;

    const updateData = {
      title: title || book.title,
      author: author || book.author,
      rating: rating ? parseFloat(rating) : book.rating,
      views: views ? parseInt(views) : book.views,
      is_free:
        is_free !== undefined
          ? is_free === "true" || is_free === true
          : book.is_free,
      language: language || book.language,
      sinopsis: sinopsis || book.sinopsis,
      story: story || book.story,
      updated_by: req.user?.email || "system",
    };

    // Handle image update
    if (req.file) {
      if (book.image) {
        const oldImagePath = path.join(__dirname, ".", book.image);
        deleteFile(oldImagePath);
      }

      const newImagePath = renameBookImage(
        req.file.path,
        book.id,
        updateData.title
      );

      updateData.image = newImagePath;
    }

    await book.update(updateData);

    res.json({
      success: true,
      message: "Book updated successfully",
      data: book,
    });
  } catch (error) {
    console.error("Error updating book:", error);

    if (req.file) {
      deleteFile(req.file.path);
    }

    if (error.name === "SequelizeValidationError") {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: error.errors.map((e) => ({
          field: e.path,
          message: e.message,
        })),
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to update book",
      error: error.message,
    });
  }
};

// ======================================
// PATCH BOOK (PARTIAL UPDATE)
// ======================================

exports.patchBook = async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);

    if (!book) {
      if (req.file) {
        deleteFile(req.file.path);
      }

      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    const updateData = {};

    Object.keys(req.body).forEach((key) => {
      if (req.body[key] !== undefined && req.body[key] !== "") {
        switch (key) {
          case "rating":
            updateData[key] = parseFloat(req.body[key]);
            break;

          case "views":
            updateData[key] = parseInt(req.body[key]);
            break;

          case "is_free":
            updateData[key] =
              req.body[key] === "true" || req.body[key] === true;
            break;

          default:
            updateData[key] = req.body[key];
        }
      }
    });

    updateData.updated_by = req.user?.email || "system";

    if (req.file) {
      if (book.image) {
        const oldImagePath = path.join(__dirname, ".", book.image);
        deleteFile(oldImagePath);
      }

      const newImagePath = renameBookImage(
        req.file.path,
        book.id,
        updateData.title || book.title
      );

      updateData.image = newImagePath;
    }

    await book.update(updateData);

    res.json({
      success: true,
      message: "Book patched successfully",
      data: book,
    });
  } catch (error) {
    console.error("Error patching book:", error);

    if (req.file) {
      deleteFile(req.file.path);
    }

    if (error.name === "SequelizeValidationError") {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: error.errors.map((e) => ({
          field: e.path,
          message: e.message,
        })),
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to patch book",
      error: error.message,
    });
  }
};




// ======================================
// DELETE BOOK
// ======================================

exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    if (book.image) {
      const imagePath = path.join(__dirname, ".", book.image);
      deleteFile(imagePath);
    }

    await book.destroy();

    res.json({
      success: true,
      message: "Book deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting book:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete book",
      error: error.message,
    });
  }
};

// ======================================
// GET BOOK STATISTICS
// ======================================

exports.getStatistics = async (req, res) => {
  try {
    const totalBooks = await Book.count();

    const freeBooks = await Book.count({
      where: { is_free: true },
    });

    const paidBooks = await Book.count({
      where: { is_free: false },
    });

    const languages = await Book.findAll({
      attributes: [
        "language",
        [
          db.Sequelize.fn(
            "COUNT",
            db.Sequelize.col("language")
          ),
          "count",
        ],
      ],
      group: ["language"],
    });

    const topRated = await Book.findAll({
      order: [["rating", "DESC"]],
      limit: 5,
    });

    const mostViewed = await Book.findAll({
      order: [["views", "DESC"]],
      limit: 5,
    });

    res.json({
      success: true,
      data: {
        total_books: totalBooks,
        free_books: freeBooks,
        paid_books: paidBooks,
        languages,
        top_rated: topRated,
        most_viewed: mostViewed,
      },
    });
  } catch (error) {
    console.error("Error fetching statistics:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch statistics",
      error: error.message,
    });
  }
};