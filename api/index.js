const fs = require('fs');
const path = require('path');

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

module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { action, username, email, phone, password, plan, balance, amount, chats } = req.body || {};

  if (req.method === 'GET') {
    return res.json({ success: true, data: readJSON(usersFile) });
  }

  switch (action) {
    case 'check_email':
      const emailExists = readJSON(usersFile).users.some(u => u.email === email);
      return res.json({ success: true, exists: emailExists });

    case 'check_username':
      const usernameExists = readJSON(usersFile).users.some(u => u.username === username);
      return res.json({ success: true, exists: usernameExists });

    case 'create_user':
      const users = readJSON(usersFile);
      const plans = readJSON(plansFile);
      const defaultBalance = plans[\`default_\${plan || 'free'}_balance\`] || 5;
      
      users.users.push({
        username, email, phone, password, plan: plan || 'free',
        balance: defaultBalance,
        initial_balance: defaultBalance,
        created_at: new Date().toISOString()
      });
      
      writeJSON(usersFile, users);
      return res.json({ success: true, message: 'تم إنشاء الحساب بنجاح' });

    case 'check_balance':
      const user = readJSON(usersFile).users.find(u => u.username === username);
      if (user) {
        return res.json({
          success: true,
          balance: user.balance,
          initial_balance: user.initial_balance,
          plan: user.plan,
          can_send: user.balance >= 0.03
        });
      }
      return res.json({ success: false, message: 'user_deleted' });

    case 'deduct_balance':
      const usersData = readJSON(usersFile);
      const targetUser = usersData.users.find(u => u.username === username);
      if (targetUser) {
        targetUser.balance = Math.max(0, targetUser.balance - amount);
        writeJSON(usersFile, usersData);
        return res.json({ success: true, balance: targetUser.balance });
      }
      return res.json({ success: false, message: 'المستخدم غير موجود' });

    case 'save_chats':
      const chatFile = path.join(__dirname, \`../chats/\${username}.json\`);
      fs.mkdirSync(path.dirname(chatFile), { recursive: true });
      writeJSON(chatFile, chats);
      return res.json({ success: true });

    case 'load_chats':
      const chatPath = path.join(__dirname, \`../chats/\${username}.json\`);
      const chatData = fs.existsSync(chatPath) ? readJSON(chatPath) : {};
      return res.json({ success: true, chats: chatData });

    case 'delete_user':
      const allUsers = readJSON(usersFile);
      allUsers.users = allUsers.users.filter(u => u.username !== username);
      writeJSON(usersFile, allUsers);
      return res.json({ success: true });

    default:
      return res.json({ success: false, message: 'Invalid action' });
  }
};
