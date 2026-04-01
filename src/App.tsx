import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { LikesProvider } from "@/context/LikesContext";
import MobileShell from "./components/MobileShell";
import LoginPage from "./pages/LoginPage";
import Index from "./pages/Index";
import MapPage from "./pages/MapPage";
import ScannerPage from "./pages/ScannerPage";
import PostDetail from "./pages/PostDetail";
import CreatePost from "./pages/CreatePost";
import ProfilePage from "./pages/ProfilePage";
import ChatListPage from "./pages/ChatListPage";
import ChatPage from "./pages/ChatPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppRoutes = () => {
  const { isLoggedIn } = useAuth();

  return (
    <MobileShell>
      <Routes>
        <Route path="/" element={isLoggedIn ? <Navigate to="/home" /> : <LoginPage />} />
        <Route path="/home" element={isLoggedIn ? <Index /> : <Navigate to="/" />} />
        <Route path="/map" element={isLoggedIn ? <MapPage /> : <Navigate to="/" />} />
        <Route path="/scanner" element={isLoggedIn ? <ScannerPage /> : <Navigate to="/" />} />
        <Route path="/post/:id" element={isLoggedIn ? <PostDetail /> : <Navigate to="/" />} />
        <Route path="/create" element={isLoggedIn ? <CreatePost /> : <Navigate to="/" />} />
        <Route path="/chats" element={isLoggedIn ? <ChatListPage /> : <Navigate to="/" />} />
        <Route path="/chat/:id" element={isLoggedIn ? <ChatPage /> : <Navigate to="/" />} />
        <Route path="/profile" element={isLoggedIn ? <ProfilePage /> : <Navigate to="/" />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </MobileShell>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <LikesProvider>
            <AppRoutes />
          </LikesProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;