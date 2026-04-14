import { createContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("currentUser")) || null);

  const signUp = (email, password) => {
    const getUser = JSON.parse(localStorage.getItem("users") || "[]");

    if (getUser.find((user) => user.email === email)) {
      return { success: false, message: "User already exists!" };
    }

    const users = [...getUser, { email, password }];
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify({ email }));

    setUser({ email });

    return { success: true };
  };

  const logout = () => {
    localStorage.removeItem("currentUser");
    setUser(null);
  };

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find((user) => user.email === email && user.password === password);

    if (!user) {
      return { success: false, message: "Invalid email or password!" };
    }

    localStorage.setItem("currentUser", JSON.stringify({ email }));
    setUser({ email });

    return { success: true };
  };

  return <AuthContext.Provider value={{ signUp, user, logout, login }}>{children}</AuthContext.Provider>;
};

export default AuthContext;
