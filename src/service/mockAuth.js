import { toast } from "sonner";
import { mockUsers, demoCredentials } from "@/data/mockData";

// Simulate authentication delay
const simulateDelay = (ms = 1000) => new Promise(resolve => setTimeout(resolve, ms));

// Check if user exists in mock data
const findUser = (email) => {
  return mockUsers.find(user => user.email === email);
};

// Validate demo credentials
const validateCredentials = (email, password) => {
  if (email === demoCredentials.admin.email && password === demoCredentials.admin.password) {
    return findUser(email);
  }
  if (email === demoCredentials.user.email && password === demoCredentials.user.password) {
    return findUser(email);
  }
  return null;
};

export const createUser = async (values) => {
  try {
    await simulateDelay();
    
    // Check if user already exists
    if (findUser(values.email)) {
      toast.error("The email address is already in use.");
      return null;
    }
    
    // Create new user (in real app, this would be stored in database)
    const newUser = {
      uid: `user_${Date.now()}`,
      email: values.email,
      role: "user",
      name: values.name || "New User"
    };
    
    // Store in localStorage for demo purposes
    const existingUsers = JSON.parse(localStorage.getItem('mockUsers') || '[]');
    existingUsers.push(newUser);
    localStorage.setItem('mockUsers', JSON.stringify(existingUsers));
    
    toast.success("User created successfully");
    return { user: newUser };
  } catch (error) {
    console.log(error);
    toast.error("Failed to create user. Please try again later.");
    return null;
  }
};

export const loginUser = async (values) => {
  try {
    await simulateDelay();
    
    // Check demo credentials first
    const demoUser = validateCredentials(values.email, values.password);
    if (demoUser) {
      toast.success("Login Successful");
      return { user: demoUser };
    }
    
    // Check localStorage for other users
    const storedUsers = JSON.parse(localStorage.getItem('mockUsers') || '[]');
    const user = storedUsers.find(u => u.email === values.email);
    
    if (user) {
      // For demo purposes, accept any password for stored users
      toast.success("Login Successful");
      return { user };
    }
    
    toast.error("Invalid User Credential");
    return null;
  } catch (error) {
    console.error("Login error:", error);
    toast.error("Failed to login. Please try again later.");
    return null;
  }
};

export const logoutUser = async () => {
  try {
    await simulateDelay();
    toast.success("Logout Successful");
    return true;
  } catch (error) {
    console.error(error);
    toast.error("Failed to logout. Please try again later.");
    return false;
  }
};

// Get current user from localStorage
export const getCurrentUser = () => {
  const userStr = localStorage.getItem('currentUser');
  if (userStr) {
    return JSON.parse(userStr);
  }
  return null;
};

// Set current user in localStorage
export const setCurrentUser = (user) => {
  if (user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
  } else {
    localStorage.removeItem('currentUser');
  }
};
