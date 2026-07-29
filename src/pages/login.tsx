import { useState } from "react";
import { loginUser } from "../api";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const data = await loginUser({ username, password });
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("refresh_token", data.refresh_token);
      navigate("/");
    } catch {
      setError("Login failed. Check your credentials and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#05060d] px-4 text-slate-100">
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 20% 10%, rgba(88,101,242,0.25), transparent 55%), radial-gradient(ellipse at 80% 90%, rgba(14,165,233,0.12), transparent 55%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              "radial-gradient(1px 1px at 25% 30%, rgba(255,255,255,0.7), transparent), radial-gradient(1px 1px at 75% 60%, rgba(255,255,255,0.45), transparent)",
            backgroundSize: "600px 600px",
          }}
        />
      </div>

      <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-white/[0.03] p-8 shadow-2xl backdrop-blur-xl">
        <Link
          to="/"
          className="text-xs font-semibold tracking-[0.2em] text-white/60 transition hover:text-white"
        >
          ORBIT
        </Link>
        <p className="mt-6 text-xs uppercase tracking-[0.25em] text-accent-soft">
          Mission access
        </p>
        <h1 className="mt-3 bg-gradient-to-b from-white via-white to-slate-400 bg-clip-text text-3xl font-semibold tracking-tight text-transparent">
          Welcome back
        </h1>
        <p className="mt-2 text-sm text-slate-400">
          Sign in to continue exploring missions, destinations, and simulations.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label
              htmlFor="username"
              className="mb-1.5 block text-sm text-slate-300"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              placeholder="johndoe"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-slate-100 outline-none placeholder:text-slate-500 focus:border-white/25 focus:ring-2 focus:ring-sky-400/20"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1.5 block text-sm text-slate-300"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="At least 8 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-slate-100 outline-none placeholder:text-slate-500 focus:border-white/25 focus:ring-2 focus:ring-sky-400/20"
            />
          </div>

          {error && (
            <p
              className="rounded-xl border border-red-400/20 bg-red-500/10 px-3 py-2 text-sm text-red-200"
              role="alert"
            >
              {error}
            </p>
          )}

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Signing in…" : "Sign in"}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-400">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-medium text-sky-300 hover:text-sky-200"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
