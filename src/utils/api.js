import { getUsers, saveUsers, getPlans, getChats, saveChats, initStorage } from './storage';

initStorage();

export const checkMaintenance = async () => {
  return { success: true, enabled: false };
};

export const checkEmail = async (email) => {
  const users = getUsers();
  const exists = users.users.some(u => u.email === email);
  return { success: true, exists };
};

export const checkUsername = async (username) => {
  const users = getUsers();
  const exists = users.users.some(u => u.username === username);
  return { success: true, exists };
};

export const createUser = async (userData) => {
  const users = getUsers();
  const plans = getPlans();
  const balance = plans[`default_${userData.plan || 'free'}_balance`] || 1000;
  
  users.users.push({
    ...userData,
    balance,
    initial_balance: balance,
    created_at: new Date().toISOString()
  });
  
  saveUsers(users);
  return { success: true, message: 'تم إنشاء الحساب بنجاح' };
};

export const getAllUsers = async () => {
  return { success: true, data: getUsers() };
};

export const updateBalance = async (username, balance) => {
  const users = getUsers();
  const user = users.users.find(u => u.username === username);
  if (user) {
    user.balance = balance;
    saveUsers(users);
    return { success: true };
  }
  return { success: false };
};

export const updatePlan = async (username, plan) => {
  const users = getUsers();
  const user = users.users.find(u => u.username === username);
  if (user) {
    user.plan = plan;
    saveUsers(users);
    return { success: true };
  }
  return { success: false };
};

export const deleteUser = async (username) => {
  const users = getUsers();
  users.users = users.users.filter(u => u.username !== username);
  saveUsers(users);
  localStorage.removeItem(`horus_chats_${username}`);
  return { success: true };
};

export const checkBalance = async (username) => {
  const users = getUsers();
  const user = users.users.find(u => u.username === username);
  if (user) {
    return {
      success: true,
      balance: user.balance,
      initial_balance: user.initial_balance,
      plan: user.plan,
      can_send: user.balance >= 0.03
    };
  }
  return { success: false, message: 'user_deleted' };
};

export const deductBalance = async (username, amount) => {
  const users = getUsers();
  const user = users.users.find(u => u.username === username);
  if (user) {
    user.balance = Math.max(0, user.balance - amount);
    saveUsers(users);
    return { success: true, balance: user.balance };
  }
  return { success: false };
};

export const saveUserChats = async (username, chats) => {
  saveChats(username, chats);
  return { success: true };
};

export const loadChats = async (username) => {
  return { success: true, chats: getChats(username) };
};
