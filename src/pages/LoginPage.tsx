import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import agroconnectCircle from "@/assets/agroconnect-circle.png";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login();
    navigate("/home");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-8 bg-background">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center w-full max-w-sm"
      >
        {/* Logo */}
        <img src={agroconnectCircle} alt="AgroConnect" className="h-20 w-20 object-contain mb-1" />
        <p className="font-cursive text-lg text-muted-foreground mt-0.5">by RasaRakyat</p>
        <p className="text-sm text-muted-foreground mt-3 text-center">
          Share your harvest, grow your community
        </p>

        {/* Form */}
        <form onSubmit={handleLogin} className="w-full mt-10 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-xl h-12"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-xl h-12"
            />
          </div>
          <Button type="submit" className="w-full h-12 text-base font-semibold rounded-xl mt-2">
            Log In
          </Button>
        </form>

        <p className="text-xs text-muted-foreground mt-6">
          Don't have an account?{" "}
          <span className="text-primary font-medium cursor-pointer">Sign Up</span>
        </p>
      </motion.div>
    </div>
  );
};

export default LoginPage;