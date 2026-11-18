
"use client";

import { useState } from "react";
import {
  saveTransmissionSectionDraft,
  publishTransmissionSection,
} from "./actions";

type Config = {
  eyebrow: string;
  title: string;
  subtitle: string;
  description: string;
  fontFamily: string;
  titleSize: number;
  subtitleSize: number;
  bodySize: number;
  titleColor: string;
  textColor: string;
  accentColor: string;
  backgroundColor: string;
  alignment: "left" | "center" | "right";
  gradient: boolean;
  overlayOpacity: number;
};

const defaults: Config = {
  eyebrow: "R├ídio Relato",
  title: "Trumunu Online",
  subtitle: "Especial Jornada",
  description: "Acompanhe os grandes jogos na emiss├úo da R├ídio Relato.",
  fontFamily: "Arial",
  titleSize: 32,
  subtitleSize: 14,
  bodySize: 16,
  titleColor: "#172554",
  textColor: "#475569",
  accentColor: "#dc2626",
  backgroundColor: "#ffffff",
  alignment: "left",
  gradient: true,
  overlayOpacity: 35,
};

const fonts = [
  "Arial",
  "Georgia",
  "Verdana",
  "Trebuchet MS",
  "Tahoma",
  "Times New Roman",
];

type Props = {
  initialConfig?: Partial<Config> | null;
};

export default function TransmissionSectionEditor({
  initialConfig,
}: Props) {
  const [config, setConfig] = useState<Config>({
    ...defaults,
    ...(initialConfig || {}),
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error">(
    "success"
  );

  function update<K extends keyof Config>(key: K, value: Config[K]) {
    setConfig((current) => ({ ...current, [key]: value }));
  }

  async function submit(action: "draft" | "publish") {
    setLoading(true);
    setMessage("");

    const formData = new FormData();
    formData.set("config", JSON.stringify(config));

    try {
      if (action === "draft") {
        await saveTransmissionSectionDraft(formData);
        setMessage("Rascunho guardado com sucesso.");
      } else {
        await publishTransmissionSection(formData);
        setMessage("Configura├º├úo publicada com sucesso.");
      }

      setMessageType("success");
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Ocorreu um erro ao guardar a configura├º├úo."
      );
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  }

  const previewBackground = config.gradient
    ? `linear-gradient(120deg, ${config.accentColor}${Math.round(
        (config.overlayOpacity / 100) * 255
      )
        .toString(16)
        .padStart(2, "0")}, transparent), ${config.backgroundColor}`
    : config.backgroundColor;

  return (
    <section className="mt-8 rounded-xl border border-blue-100 bg-white p-5 shadow-sm md:p-6">
      <div className="mb-6">
        <p className="text-sm font-bold uppercase tracking-wider text-red-600">
          Personaliza├º├úo da p├ígina inicial
        </p>
        <h2 className="mt-1 text-2xl font-bold text-blue-950">
          Editor visual ÔÇö Trumunu Online
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          Altera os textos e a apresenta├º├úo da sec├º├úo. As altera├º├Áes s├│ ficam
          vis├¡veis ao p├║blico depois de publicadas.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Texto superior
            </label>
            <input
              value={config.eyebrow}
              onChange={(event) => update("eyebrow", event.target.value)}
              maxLength={80}
              className="w-full rounded-lg border border-slate-300 px-4 py-3"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              T├¡tulo principal
            </label>
            <input
              value={config.title}
              onChange={(event) => update("title", event.target.value)}
              maxLength={120}
              className="w-full rounded-lg border border-slate-300 px-4 py-3"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Subt├¡tulo
            </label>
            <input
              value={config.subtitle}
              onChange={(event) => update("subtitle", event.target.value)}
              maxLength={150}
              className="w-full rounded-lg border border-slate-300 px-4 py-3"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Texto descritivo
            </label>
            <textarea
              value={config.description}
              onChange={(event) => update("description", event.target.value)}
              rows={4}
              maxLength={1000}
              className="w-full rounded-lg border border-slate-300 px-4 py-3"
              placeholder="Escreve o texto da sec├º├úo. Podes utilizar v├írias linhas."
            />
            <p className="mt-1 text-xs text-slate-500">
              As mudan├ºas de linha ser├úo preservadas na apresenta├º├úo.
            </p>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Tipo de letra
            </label>
            <select
              value={config.fontFamily}
              onChange={(event) => update("fontFamily", event.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3"
            >
              {fonts.map((font) => (
                <option key={font} value={font}>
                  {font}
                </option>
              ))}
            </select>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                T├¡tulo: {config.titleSize}px
              </label>
              <input
                type="range"
                min="20"
                max="60"
                value={config.titleSize}
                onChange={(event) =>
                  update("titleSize", Number(event.target.value))
                }
                className="w-full"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Subt├¡tulo: {config.subtitleSize}px
              </label>
              <input
                type="range"
                min="10"
                max="30"
                value={config.subtitleSize}
                onChange={(event) =>
                  update("subtitleSize", Number(event.target.value))
                }
                className="w-full"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Texto: {config.bodySize}px
              </label>
              <input
                type="range"
                min="10"
                max="26"
                value={config.bodySize}
                onChange={(event) =>
                  update("bodySize", Number(event.target.value))
                }
                className="w-full"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Alinhamento
            </label>
            <select
              value={config.alignment}
              onChange={(event) =>
                update(
                  "alignment",
                  event.target.value as Config["alignment"]
                )
              }
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3"
            >
              <option value="left">├Ç esquerda</option>
              <option value="center">Ao centro</option>
              <option value="right">├Ç direita</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <label className="flex items-center gap-3 text-sm font-semibold text-slate-700">
              <input
                type="checkbox"
                checked={config.gradient}
                onChange={(event) => update("gradient", event.target.checked)}
                className="h-4 w-4"
              />
              Activar gradiente
            </label>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Transpar├¬ncia: {config.overlayOpacity}%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={config.overlayOpacity}
                onChange={(event) =>
                  update("overlayOpacity", Number(event.target.value))
                }
                className="w-full"
                disabled={!config.gradient}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {(
              [
                ["titleColor", "Cor do t├¡tulo"],
                ["textColor", "Cor do texto"],
                ["accentColor", "Cor de destaque"],
                ["backgroundColor", "Cor de fundo"],
              ] as const
            ).map(([key, label]) => (
              <label
                key={key}
                className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 p-3 text-sm font-semibold text-slate-700"
              >
                {label}
                <input
                  type="color"
                  value={config[key]}
                  onChange={(event) => update(key, event.target.value)}
                  className="h-9 w-12 cursor-pointer rounded border-0 bg-transparent"
                />
              </label>
            ))}
          </div>
        </div>

        <div>
          <div className="sticky top-5">
            <h3 className="mb-3 text-lg font-bold text-slate-900">
              Pr├®-visualiza├º├úo
            </h3>

            <div
              className="overflow-hidden rounded-xl border border-slate-200 p-6 shadow-sm md:p-8"
              style={{
                background: previewBackground,
                fontFamily: config.fontFamily,
                textAlign: config.alignment,
              }}
            >
              <p
                className="font-bold uppercase tracking-wider"
                style={{
                  color: config.accentColor,
                  fontSize: "13px",
                }}
              >
                {config.eyebrow || " "}
              </p>

              <h3
                className="mt-2 font-black"
                style={{
                  color: config.titleColor,
                  fontSize: `${config.titleSize}px`,
                  lineHeight: 1.15,
                }}
              >
                {config.title || "T├¡tulo da sec├º├úo"}
              </h3>

              <p
                className="mt-2 font-bold uppercase tracking-wide"
                style={{
                  color: config.accentColor,
                  fontSize: `${config.subtitleSize}px`,
                }}
              >
                {config.subtitle || " "}
              </p>

              <p
                className="mt-4 whitespace-pre-line"
                style={{
                  color: config.textColor,
                  fontSize: `${config.bodySize}px`,
                  lineHeight: 1.6,
                }}
              >
                {config.description || "Texto descritivo da sec├º├úo."}
              </p>
            </div>

            <p className="mt-3 text-xs text-slate-500">
              A pr├®-visualiza├º├úo representa o cabe├ºalho da sec├º├úo. Os cart├Áes
              dos jogos mant├¬m o desenho actual.
            </p>
          </div>
        </div>
      </div>

      {message && (
        <p
          role="status"
          className={`mt-6 rounded-lg p-4 text-sm ${
            messageType === "success"
              ? "bg-green-50 text-green-800"
              : "bg-red-50 text-red-800"
          }`}
        >
          {message}
        </p>
      )}

      <div className="mt-7 flex flex-wrap gap-3 border-t border-slate-200 pt-5">
        <button
          type="button"
          disabled={loading}
          onClick={() => submit("draft")}
          className="rounded-lg border border-blue-950 px-5 py-3 font-semibold text-blue-950 hover:bg-blue-50 disabled:opacity-60"
        >
          {loading ? "A guardar..." : "Guardar rascunho"}
        </button>

        <button
          type="button"
          disabled={loading}
          onClick={() => submit("publish")}
          className="rounded-lg bg-red-600 px-5 py-3 font-semibold text-white hover:bg-red-700 disabled:opacity-60"
        >
          {loading ? "A processar..." : "Publicar altera├º├Áes"}
        </button>
      </div>
    </section>
  );
}
