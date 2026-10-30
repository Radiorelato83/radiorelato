
"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function DefinirPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmacao, setConfirmacao] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);
  const [validando, setValidando] = useState(true);
  const [sessaoValida, setSessaoValida] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    let activo = true;

    async function verificarSessao() {
      const { data, error } = await supabase.auth.getSession();

      if (!activo) return;

      if (error || !data.session) {
        setErro(
          "A ligação de recuperação é inválida ou expirou. Solicite um novo link."
        );
        setSessaoValida(false);
      } else {
        setSessaoValida(true);
      }

      setValidando(false);
    }

    void verificarSessao();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (!activo) return;

      if (
        event === "PASSWORD_RECOVERY" ||
        (event === "SIGNED_IN" && session)
      ) {
        setSessaoValida(true);
        setErro("");
      }
    });

    return () => {
      activo = false;
      subscription.unsubscribe();
    };
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErro("");
    setMensagem("");

    if (password.length < 8) {
      setErro("A palavra-passe deve ter pelo menos 8 caracteres.");
      return;
    }

    if (password !== confirmacao) {
      setErro("As palavras-passe não coincidem.");
      return;
    }

    setLoading(true);

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.updateUser({
        password,
      });

      if (error) {
        setErro(error.message);
        return;
      }

      setMensagem("Palavra-passe alterada com sucesso. Pode entrar no painel.");
      setPassword("");
      setConfirmacao("");

      await supabase.auth.signOut();

      window.setTimeout(() => {
        router.replace("/admin/login");
      }, 1800);
    } catch {
      setErro("Não foi possível alterar a palavra-passe. Solicite novo link.");
    } finally {
      setLoading(false);
    }
  }

  if (validando) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
        <p className="text-slate-700">A validar o link de recuperação...</p>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-10">
      <section className="w-full max-w-md rounded-2xl bg-white p-8 shadow">
        <h1 className="text-2xl font-bold text-blue-950">
          Definir nova palavra-passe
        </h1>

        {sessaoValida ? (
          <>
            <p className="mt-2 text-sm text-slate-600">
              Escolha uma palavra-passe nova com pelo menos 8 caracteres.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label htmlFor="password" className="block text-sm font-medium">
                  Nova palavra-passe
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  minLength={8}
                  autoComplete="new-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-3"
                />
              </div>

              <div>
                <label htmlFor="confirmacao" className="block text-sm font-medium">
                  Confirmar palavra-passe
                </label>
                <input
                  id="confirmacao"
                  type="password"
                  required
                  minLength={8}
                  autoComplete="new-password"
                  value={confirmacao}
                  onChange={(event) => setConfirmacao(event.target.value)}
                  className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-3"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-blue-950 px-4 py-3 font-semibold text-white disabled:opacity-60"
              >
                {loading ? "A guardar..." : "Guardar nova palavra-passe"}
              </button>
            </form>
          </>
        ) : (
          <p className="mt-3 text-sm text-slate-600">
            Volte à recuperação para solicitar um novo link.
          </p>
        )}

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
          href="/admin/recuperar-password"
          className="mt-6 inline-block text-sm font-medium text-blue-800 underline"
        >
          Solicitar novo link
        </Link>
      </section>
    </main>
  );
}
