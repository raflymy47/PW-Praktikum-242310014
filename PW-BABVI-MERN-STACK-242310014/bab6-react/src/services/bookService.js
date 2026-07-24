import axios from "axios";

const API_URL = "http://localhost:3001";

export const GET_ALL_BOOK = async () => {
  const token = localStorage.getItem("accessToken");

  const response = await axios.get(`${API_URL}/api/books`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.data;
};

export const CREATE_BOOK = async (bookData) => {
  const token = localStorage.getItem("accessToken");

  const response = await axios.post(
    `${API_URL}/api/books`,
    bookData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data.data;
};

export const UPDATE_BOOK = async (id, bookData) => {
  const token = localStorage.getItem("accessToken");

  const response = await axios.put(
    `${API_URL}/api/books/${id}`,
    bookData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data.data;
};

export const DELETE_BOOK = async (id) => {
  const token = localStorage.getItem("accessToken");

  const response = await axios.delete(
    `${API_URL}/api/books/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};