import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { Apple } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import agroconnectCircle from "@/assets/agroConnect_LogoWithName-removebg-preview.png";

function GoogleGlyph({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const goHomeAfterLogin = () => {
    login();
    navigate("/home");
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    goHomeAfterLogin();
  };

  return (
    <div className="flex min-h-full flex-1 flex-col bg-background px-6 pb-8 pt-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center w-full max-w-sm mx-auto flex-1"
      >
        <button
          type="button"
          onClick={() => navigate("/")}
          className="self-start mb-4 flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground transition hover:bg-muted hover:text-foreground"
          aria-label="Back"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        {/* Logo */}
        <img src={agroconnectCircle} alt="AgroConnect" className="h-20 w-auto max-w-[280px] object-contain mb-1" />
        <h1 className="mt-1 text-center text-xl font-semibold text-foreground">Welcome Back!</h1>
        <p className="text-sm text-muted-foreground mt-1 text-center">
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

        <div className="w-full mt-6 flex items-center gap-3">
          <span className="h-px flex-1 bg-border" />
          <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">or</span>
          <span className="h-px flex-1 bg-border" />
        </div>

        <div className="w-full mt-5 flex flex-col gap-3">
          <button
            type="button"
            onClick={goHomeAfterLogin}
            className={cn(
              "flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-border bg-card text-sm font-semibold text-foreground shadow-sm",
              "transition hover:bg-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            )}
          >
            <GoogleGlyph className="h-5 w-5 shrink-0" />
            Continue with Google
          </button>
          <button
            type="button"
            onClick={goHomeAfterLogin}
            className={cn(
              "flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-black/10 bg-[#000000] text-sm font-semibold text-white shadow-sm",
              "transition hover:bg-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            )}
          >
            <Apple className="h-5 w-5 shrink-0" strokeWidth={1.75} />
            Continue with Apple
          </button>
        </div>

        <p className="text-xs text-muted-foreground mt-6">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="text-primary font-medium hover:underline underline-offset-2">
            Create account
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default LoginPage;