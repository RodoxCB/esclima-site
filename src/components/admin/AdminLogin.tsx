"use client";

import { useState } from "react";

type AdminLoginProps = {
  siteName: string;
  onLogin: () => void;
};

export function AdminLogin({ siteName, onLogin }: AdminLoginProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password })
    });

    if (response.ok) {
      onLogin();
    } else {
      setError("Senha incorreta. Tente novamente.");
    }

    setLoading(false);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-900 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl border border-slate-700 bg-slate-800 p-8 shadow-2xl"
      >
        <h1 className="text-2xl font-bold text-white">Painel {siteName}</h1>
        <p className="mt-2 text-sm text-slate-400">Acesso restrito para administração do site.</p>

        <label className="mt-6 block">
          <span className="text-xs font-semibold uppercase tracking-wide text-slate-300">Senha</span>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="mt-2 w-full rounded-xl border border-slate-600 bg-slate-900 px-3 py-2.5 text-sm text-white outline-none focus:border-sky-500"
            required
          />
        </label>

        {error && (
          <p className="mt-3 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-400">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-xl bg-sky-500 py-3 text-sm font-semibold text-white transition hover:bg-sky-400 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
}
