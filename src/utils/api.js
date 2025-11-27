import axios from 'axios';

const API_URL = '/api';

export const checkMaintenance = async () => {
  const response = await axios.post(API_URL, { action: 'check_maintenance' });
  return response.data;
};

export const checkEmail = async (email) => {
  const response = await axios.post(API_URL, { action: 'check_email', email });
  return response.data;
};

export const checkUsername = async (username) => {
  const response = await axios.post(API_URL, { action: 'check_username', username });
  return response.data;
};

export const createUser = async (userData) => {
  const response = await axios.post(API_URL, { action: 'create_user', ...userData });
  return response.data;
};

export const getUsers = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const updateBalance = async (username, balance) => {
  const response = await axios.post(API_URL, { action: 'update_balance', username, balance });
  return response.data;
};

export const updatePlan = async (username, plan) => {
  const response = await axios.post(API_URL, { action: 'update_plan', username, plan });
  return response.data;
};

export const deleteUser = async (username) => {
  const response = await axios.post(API_URL, { action: 'delete_user', username });
  return response.data;
};

export const checkBalance = async (username) => {
  const response = await axios.post(API_URL, { action: 'check_balance', username });
  return response.data;
};

export const deductBalance = async (username, amount) => {
  const response = await axios.post(API_URL, { action: 'deduct_balance', username, amount });
  return response.data;
};

export const saveChats = async (username, chats) => {
  const response = await axios.post(API_URL, { action: 'save_chats', username, chats });
  return response.data;
};

export const loadChats = async (username) => {
  const response = await axios.post(API_URL, { action: 'load_chats', username });
  return response.data;
};
