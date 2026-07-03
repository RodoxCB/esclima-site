"use client";

import { useState } from "react";

type ImageFieldProps = {
  label: string;
  value: string;
  onChange: (url: string) => void;
  folder?: "gallery" | "site";
};

export function ImageField({ label, value, onChange, folder = "site" }: ImageFieldProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleFile(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", folder);

    const response = await fetch("/api/admin/upload", {
      method: "POST",
      body: formData
    });

    const data = (await response.json().catch(() => ({}))) as { url?: string; error?: string };

    if (response.ok && data.url) {
      onChange(data.url);
    } else {
      setError(data.error ?? "Erro ao enviar imagem");
    }

    setUploading(false);
    event.target.value = "";
  }

  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-wide text-slate-300">{label}</span>
      <div className="mt-2 space-y-2">
        {value ? (
          <img src={value} alt="Pré-visualização" className="h-40 w-full rounded-xl object-cover" />
        ) : (
          <div className="flex h-40 items-center justify-center rounded-xl border border-dashed border-slate-600 text-sm text-slate-500">
            Nenhuma imagem
          </div>
        )}

        <div className="flex flex-wrap items-center gap-2">
          <label className="cursor-pointer rounded-lg bg-sky-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-sky-400">
            {uploading ? "Enviando..." : "Enviar imagem"}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFile}
              disabled={uploading}
            />
          </label>

          {value && (
            <button
              type="button"
              onClick={() => onChange("")}
              className="text-xs text-red-400 hover:text-red-300"
            >
              Remover
            </button>
          )}
        </div>

        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Ou cole a URL da imagem"
          className="w-full rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-sm text-white outline-none focus:border-sky-500"
        />

        {error && <p className="text-xs text-red-400">{error}</p>}
      </div>
    </label>
  );
}
