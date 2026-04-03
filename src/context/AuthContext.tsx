import { createContext, useContext, useState, ReactNode } from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  showOnboarding: boolean;
  login: () => void;
  logout: () => void;
  completeOnboarding: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        showOnboarding,
        login: () => {
          setIsLoggedIn(true);
          setShowOnboarding(true);
        },
        logout: () => {
          setIsLoggedIn(false);
          setShowOnboarding(false);
        },
        completeOnboarding: () => setShowOnboarding(false),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};