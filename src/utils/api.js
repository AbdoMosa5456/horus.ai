import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const checkMaintenance = async () => {
  const response = await axios.get(`${API_URL}/maintenance`);
  return response.data;
};

export const checkEmail = async (email) => {
  const response = await axios.post(`${API_URL}/check-email`, { email });
  return response.data;
};

export const checkUsername = async (username) => {
  const response = await axios.post(`${API_URL}/check-username`, { username });
  return response.data;
};

export const createUser = async (userData) => {
  const response = await axios.post(`${API_URL}/create-user`, userData);
  return response.data;
};

export const getUsers = async () => {
  const response = await axios.get(`${API_URL}/users`);
  return response.data;
};

export const updateBalance = async (username, balance) => {
  const response = await axios.post(`${API_URL}/update-balance`, { username, balance });
  return response.data;
};

export const updatePlan = async (username, plan) => {
  const response = await axios.post(`${API_URL}/update-plan`, { username, plan });
  return response.data;
};

export const deleteUser = async (username) => {
  const response = await axios.post(`${API_URL}/delete-user`, { username });
  return response.data;
};

export const checkBalance = async (username) => {
  const response = await axios.post(`${API_URL}/check-balance`, { username });
  return response.data;
};

export const deductBalance = async (username, amount) => {
  const response = await axios.post(`${API_URL}/deduct-balance`, { username, amount });
  return response.data;
};

export const saveChats = async (username, chats) => {
  const response = await axios.post(`${API_URL}/save-chats`, { username, chats });
  return response.data;
};

export const loadChats = async (username) => {
  const response = await axios.post(`${API_URL}/load-chats`, { username });
  return response.data;
};
