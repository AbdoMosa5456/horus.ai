const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const usersFile = path.join(__dirname, '../users.json');
const plansFile = path.join(__dirname, '../plans.json');

const readJSON = (file) => {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch {
    return file.includes('users') ? { users: [] } : {};
  }
};

const writeJSON = (file, data) => {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
};

app.get('/api/users', (req, res) => {
  res.json({ success: true, data: readJSON(usersFile) });
});

app.post('/api/check-email', (req, res) => {
  const users = readJSON(usersFile);
  const exists = users.users.some(u => u.email === req.body.email);
  res.json({ success: true, exists });
});

app.post('/api/check-username', (req, res) => {
  const users = readJSON(usersFile);
  const exists = users.users.some(u => u.username === req.body.username);
  res.json({ success: true, exists });
});

app.post('/api/create-user', (req, res) => {
  const users = readJSON(usersFile);
  const plans = readJSON(plansFile);
  const { username, email, phone, password, plan = 'free' } = req.body;
  const balance = plans[`default_${plan}_balance`] || 5;

  users.users.push({
    username, email, phone, password, plan, balance,
    initial_balance: balance,
    created_at: new Date().toISOString()
  });

  writeJSON(usersFile, users);
  res.json({ success: true, message: 'تم إنشاء الحساب بنجاح' });
});

app.post('/api/check-balance', (req, res) => {
  const users = readJSON(usersFile);
  const user = users.users.find(u => u.username === req.body.username);
  
  if (user) {
    res.json({ success: true, balance: user.balance, initial_balance: user.initial_balance, plan: user.plan, can_send: user.balance >= 0.03 });
  } else {
    res.json({ success: false, message: 'user_deleted' });
  }
});

app.post('/api/deduct-balance', (req, res) => {
  const users = readJSON(usersFile);
  const user = users.users.find(u => u.username === req.body.username);
  
  if (user) {
    user.balance = Math.max(0, user.balance - req.body.amount);
    writeJSON(usersFile, users);
    res.json({ success: true, balance: user.balance });
  } else {
    res.json({ success: false, message: 'المستخدم غير موجود' });
  }
});

app.post('/api/save-chats', (req, res) => {
  const chatFile = path.join(__dirname, `../chats/${req.body.username}.json`);
  fs.mkdirSync(path.dirname(chatFile), { recursive: true });
  writeJSON(chatFile, req.body.chats);
  res.json({ success: true });
});

app.post('/api/load-chats', (req, res) => {
  const chatFile = path.join(__dirname, `../chats/${req.body.username}.json`);
  const chats = fs.existsSync(chatFile) ? readJSON(chatFile) : {};
  res.json({ success: true, chats });
});

app.post('/api/delete-user', (req, res) => {
  const users = readJSON(usersFile);
  users.users = users.users.filter(u => u.username !== req.body.username);
  writeJSON(usersFile, users);
  res.json({ success: true });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
