import { INITIAL_ISSUES, USER_ROLES, CITIES } from './mockData';

// Simple password hashing simulation (Base64 + salt) for client-side storage security
const hashPassword = (password) => {
  return btoa(`swagat_salt_2026_${password}`);
};

// Database Keys
const DB_KEYS = {
  USERS: 'swagat_db_users',
  SESSION: 'swagat_db_session',
  ISSUES: 'swagat_db_issues',
  NOTIFICATIONS: 'swagat_db_notifications'
};

class DatabaseService {
  constructor() {
    this.initDatabase();
  }

  initDatabase() {
    // Initialize default seed data if DB tables are empty
    if (!localStorage.getItem(DB_KEYS.USERS)) {
      const defaultUsers = [
        {
          id: 'user_1',
          name: 'Bhupathi',
          email: 'bhupathi@eluru.gov.in',
          passwordHash: hashPassword('password123'),
          city: CITIES[0],
          role: USER_ROLES[0],
          createdAt: new Date().toISOString()
        },
        {
          id: 'user_2',
          name: 'Inspector Vijay',
          email: 'vijay.police@eluru.gov.in',
          passwordHash: hashPassword('police123'),
          city: CITIES[0],
          role: USER_ROLES[1],
          createdAt: new Date().toISOString()
        }
      ];
      localStorage.setItem(DB_KEYS.USERS, JSON.stringify(defaultUsers));
    }

    if (!localStorage.getItem(DB_KEYS.ISSUES)) {
      localStorage.setItem(DB_KEYS.ISSUES, JSON.stringify(INITIAL_ISSUES));
    }

    if (!localStorage.getItem(DB_KEYS.NOTIFICATIONS)) {
      const initialNotifs = [
        { id: 1, userId: 'user_1', title: 'Roads Dept Auto-Notified', message: 'SMS dispatch alert sent to Chief Engineer Er. K. Ramesh for #ELR-2456.', time: '10 mins ago', read: false, icon: '🛣️' },
        { id: 2, userId: 'user_1', title: 'Street Light Inspection Scheduled', message: 'Electrical & Solar Dept assigned repair vehicle to Powerpet Main Street.', time: '1 hour ago', read: false, icon: '💡' }
      ];
      localStorage.setItem(DB_KEYS.NOTIFICATIONS, JSON.stringify(initialNotifs));
    }
  }

  // --- USER AUTHENTICATION METHODS ---

  // Register a new user
  registerUser({ name, email, password, city, role }) {
    const users = this.getUsers();
    const existing = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (existing) {
      throw new Error('An account with this email address already exists.');
    }

    const newUser = {
      id: `user_${Date.now()}`,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      passwordHash: hashPassword(password),
      city: city || CITIES[0],
      role: role || USER_ROLES[0],
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    localStorage.setItem(DB_KEYS.USERS, JSON.stringify(users));

    // Auto-login user
    this.createSession(newUser);
    return newUser;
  }

  // Login user with credentials
  loginUser(email, password) {
    const users = this.getUsers();
    const targetHash = hashPassword(password);
    
    const user = users.find(
      u => u.email.toLowerCase() === email.trim().toLowerCase() && u.passwordHash === targetHash
    );

    if (!user) {
      throw new Error('Invalid email or password. Please check your credentials.');
    }

    this.createSession(user);
    return user;
  }

  // Session Token methods
  createSession(user) {
    const sessionData = {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        city: user.city,
        role: user.role
      },
      token: `token_${Date.now()}_${user.id}`,
      loginAt: new Date().toISOString()
    };
    localStorage.setItem(DB_KEYS.SESSION, JSON.stringify(sessionData));
  }

  getCurrentSession() {
    const sessionStr = localStorage.getItem(DB_KEYS.SESSION);
    if (!sessionStr) return null;
    try {
      return JSON.parse(sessionStr);
    } catch (e) {
      return null;
    }
  }

  logout() {
    localStorage.removeItem(DB_KEYS.SESSION);
  }

  getUsers() {
    try {
      return JSON.parse(localStorage.getItem(DB_KEYS.USERS)) || [];
    } catch (e) {
      return [];
    }
  }

  // --- PERSISTENT ISSUES & NOTIFICATIONS CRUD ---

  getIssues() {
    try {
      return JSON.parse(localStorage.getItem(DB_KEYS.ISSUES)) || INITIAL_ISSUES;
    } catch (e) {
      return INITIAL_ISSUES;
    }
  }

  saveIssue(newIssue) {
    const issues = this.getIssues();
    const updated = [newIssue, ...issues];
    localStorage.setItem(DB_KEYS.ISSUES, JSON.stringify(updated));
    return updated;
  }

  upvoteIssue(issueId) {
    const issues = this.getIssues();
    const updated = issues.map(iss => {
      if (iss.id === issueId) {
        const hasUpvoted = !iss.hasUpvoted;
        return {
          ...iss,
          hasUpvoted,
          upvotes: hasUpvoted ? iss.upvotes + 1 : iss.upvotes - 1
        };
      }
      return iss;
    });
    localStorage.setItem(DB_KEYS.ISSUES, JSON.stringify(updated));
    return updated;
  }

  getNotifications(userId) {
    try {
      const allNotifs = JSON.parse(localStorage.getItem(DB_KEYS.NOTIFICATIONS)) || [];
      if (!userId) return allNotifs;
      return allNotifs.filter(n => n.userId === userId || !n.userId);
    } catch (e) {
      return [];
    }
  }

  saveNotification(newNotif) {
    try {
      const allNotifs = JSON.parse(localStorage.getItem(DB_KEYS.NOTIFICATIONS)) || [];
      const updated = [newNotif, ...allNotifs];
      localStorage.setItem(DB_KEYS.NOTIFICATIONS, JSON.stringify(updated));
      return updated;
    } catch (e) {
      return [];
    }
  }
}

export const db = new DatabaseService();
