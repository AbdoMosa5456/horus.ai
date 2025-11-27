const USERS_KEY = 'horus_users';
const CHATS_KEY = 'horus_chats';
const PLANS_KEY = 'horus_plans';

const defaultPlans = {
  default_free_balance: 1000,
  default_plus_balance: 0,
  default_pro_balance: 0
};

export const getUsers = () => {
  const data = localStorage.getItem(USERS_KEY);
  return data ? JSON.parse(data) : { users: [] };
};

export const saveUsers = (users) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const getPlans = () => {
  const data = localStorage.getItem(PLANS_KEY);
  return data ? JSON.parse(data) : defaultPlans;
};

export const getChats = (username) => {
  const data = localStorage.getItem(`${CHATS_KEY}_${username}`);
  return data ? JSON.parse(data) : {};
};

export const saveChats = (username, chats) => {
  localStorage.setItem(`${CHATS_KEY}_${username}`, JSON.stringify(chats));
};

export const initStorage = () => {
  if (!localStorage.getItem(USERS_KEY)) {
    saveUsers({ users: [] });
  }
  if (!localStorage.getItem(PLANS_KEY)) {
    localStorage.setItem(PLANS_KEY, JSON.stringify(defaultPlans));
  }
};
