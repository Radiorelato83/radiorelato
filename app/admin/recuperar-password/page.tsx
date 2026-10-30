

"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function RecuperarPasswordPage() {
  const [email, setEmail] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMensagem("");
    setErro("");
    setLoading(true);

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: `${window.location.origin}/admin/definir-password`,
      });

      if (error) {
        setErro(error.message);
      } else {
        setMensagem(
          "Se o email estiver registado, receberá instruções de recuperação. Verifique também a pasta de spam."
        );
      }
    } catch {
      setErro("Não foi possível contactar o Supabase. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-10">
      <section className="w-full max-w-md rounded-2xl bg-white p-8 shadow">
        <h1 className="text-2xl font-bold text-blue-950">
          Recuperar palavra-passe
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Introduza o email da sua conta administrativa.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-3"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-950 px-4 py-3 font-semibold text-white disabled:opacity-60"
          >
            {loading ? "A enviar..." : "Enviar link de recuperação"}
          </button>
        </form>

        {mensagem && (
          <p role="status" className="mt-4 text-sm text-green-700">
            {mensagem}
          </p>
        )}

        {erro && (
          <p role="alert" className="mt-4 text-sm text-red-700">
            {erro}
          </p>
        )}

        <Link
          href="/admin/login"
          className="mt-6 inline-block text-sm font-medium text-blue-800 underline"
        >
          Voltar ao login
        </Link>
      </section>
    </main>
  );
}
