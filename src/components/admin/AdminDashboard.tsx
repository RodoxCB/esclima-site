"use client";

import { useState } from "react";
import type {
  DifferentialItem,
  GalleryCategory,
  GalleryItem,
  ReviewItem,
  ServiceItem,
  SiteContent
} from "@/lib/types";
import { AdminSection } from "@/components/admin/AdminSection";
import { ImageField } from "@/components/admin/ImageField";

const TABS = [
  { id: "geral", label: "Informações Gerais" },
  { id: "servicos", label: "Serviços" },
  { id: "galeria", label: "Projetos" },
  { id: "avaliacoes", label: "Avaliações" },
  { id: "conteudo", label: "Diferenciais & Sobre" }
] as const;

type TabId = (typeof TABS)[number]["id"];

const inputClass =
  "w-full rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-sm text-white outline-none focus:border-sky-500";

const CATEGORY_OPTIONS: { value: GalleryCategory; label: string }[] = [
  { value: "instalacao", label: "Instalação" },
  { value: "manutencao", label: "Manutenção" },
  { value: "higienizacao", label: "Higienização" },
  { value: "outros", label: "Outros" }
];

type FieldProps = {
  label: string;
  children: React.ReactNode;
};

function Field({ label, children }: FieldProps) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-wide text-slate-300">{label}</span>
      <div className="mt-2">{children}</div>
    </label>
  );
}

type AdminDashboardProps = {
  initialContent: SiteContent;
};

export function AdminDashboard({ initialContent }: AdminDashboardProps) {
  const [content, setContent] = useState<SiteContent>(initialContent);
  const [tab, setTab] = useState<TabId>("geral");
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error">("success");

  function update<K extends keyof SiteContent>(key: K, value: SiteContent[K]) {
    setContent((previous) => ({ ...previous, [key]: value }));
  }

  function updateArray<T>(key: keyof SiteContent, value: T[]) {
    setContent((previous) => ({ ...previous, [key]: value } as SiteContent));
  }

  function showMessage(text: string, type: "success" | "error" = "success") {
    setMessage(text);
    setMessageType(type);
  }

  async function saveContentChanges() {
    setSaving(true);
    setMessage("");

    const response = await fetch("/api/admin/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(content)
    });

    setSaving(false);

    if (response.ok) {
      showMessage("Alterações salvas com sucesso!");
      return;
    }

    const data = (await response.json().catch(() => ({}))) as { error?: string };
    showMessage(data.error ?? "Não foi possível salvar. Tente novamente.", "error");
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.reload();
  }

  async function uploadGallery(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", file.name.replace(/\.[^.]+$/, ""));
    formData.append("category", "outros");

    const response = await fetch("/api/admin/gallery", {
      method: "POST",
      body: formData
    });

    if (response.ok) {
      const data = (await response.json()) as { item: GalleryItem };
      updateArray("gallery", [data.item, ...content.gallery]);
      showMessage("Imagem adicionada à galeria.");
    } else {
      showMessage("Erro ao enviar imagem.", "error");
    }

    setUploading(false);
    event.target.value = "";
  }

  async function deleteGalleryItem(id: string) {
    await fetch("/api/admin/gallery", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id })
    });

    updateArray(
      "gallery",
      content.gallery.filter((item) => item.id !== id)
    );
    showMessage("Projeto removido da galeria.");
  }

  function addService() {
    const item: ServiceItem = {
      icon: "wind",
      title: "Novo serviço",
      description: "Descreva o serviço aqui.",
      benefit: "Benefício principal do serviço."
    };
    updateArray("services", [...content.services, item]);
  }

  function addReview() {
    const item: ReviewItem = { name: "Cliente", text: "Depoimento do cliente." };
    updateArray("reviews", [...content.reviews, item]);
  }

  function addDifferential() {
    const item: DifferentialItem = {
      icon: "zap",
      title: "Novo diferencial",
      description: "Descreva o diferencial."
    };
    updateArray("differentials", [...content.differentials, item]);
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <div className="sticky top-0 z-50 border-b border-slate-700 bg-slate-900/95 backdrop-blur-md">
        <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-xl font-bold text-white sm:text-2xl">
                Painel — {content.site.name}
              </h1>
              <p className="mt-1 text-sm text-slate-400">
                Gerencie serviços, projetos, avaliações e informações do site.
              </p>
            </div>
            <div className="flex shrink-0 gap-2">
              <button
                type="button"
                onClick={saveContentChanges}
                disabled={saving}
                className="rounded-lg bg-sky-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-400 disabled:opacity-60"
              >
                {saving ? "Salvando..." : "Salvar alterações"}
              </button>
              <button
                type="button"
                onClick={logout}
                className="rounded-lg border border-slate-600 px-4 py-2 text-sm text-slate-300 hover:border-slate-500"
              >
                Sair
              </button>
            </div>
          </div>

          {message && (
            <p
              className={`mt-3 rounded-lg px-3 py-2 text-sm ${
                messageType === "success"
                  ? "border border-sky-500/40 bg-sky-500/10 text-sky-300"
                  : "border border-red-500/40 bg-red-500/10 text-red-400"
              }`}
            >
              {message}
            </p>
          )}

          <div className="mt-4 flex flex-wrap gap-2">
            {TABS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setTab(item.id)}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                  tab === item.id
                    ? "bg-sky-500 text-white"
                    : "border border-slate-600 text-slate-300 hover:border-sky-500/50 hover:text-sky-300"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="space-y-6">
          {tab === "geral" && (
            <AdminSection title="Informações gerais">
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Nome da empresa">
                  <input
                    className={inputClass}
                    value={content.site.name}
                    onChange={(e) => update("site", { ...content.site, name: e.target.value })}
                  />
                </Field>
                <Field label="Tagline">
                  <input
                    className={inputClass}
                    value={content.site.tagline}
                    onChange={(e) => update("site", { ...content.site, tagline: e.target.value })}
                  />
                </Field>
                <Field label="Instagram">
                  <input
                    className={inputClass}
                    value={content.site.instagram}
                    onChange={(e) => update("site", { ...content.site, instagram: e.target.value })}
                  />
                </Field>
                <Field label="Horário de atendimento">
                  <input
                    className={inputClass}
                    value={content.site.schedule}
                    onChange={(e) => update("site", { ...content.site, schedule: e.target.value })}
                  />
                </Field>
                <Field label="Endereço / Localização">
                  <input
                    className={inputClass}
                    value={content.site.address}
                    onChange={(e) => update("site", { ...content.site, address: e.target.value })}
                  />
                </Field>
                <Field label="WhatsApp (com DDI, ex: 5527999999999)">
                  <input
                    className={inputClass}
                    value={content.contact.whatsappNumber}
                    onChange={(e) =>
                      update("contact", { ...content.contact, whatsappNumber: e.target.value })
                    }
                  />
                </Field>
                <Field label="Telefone para exibição">
                  <input
                    className={inputClass}
                    value={content.contact.phoneDisplay}
                    onChange={(e) =>
                      update("contact", { ...content.contact, phoneDisplay: e.target.value })
                    }
                  />
                </Field>
                <Field label="Mensagem padrão do WhatsApp">
                  <input
                    className={inputClass}
                    value={content.contact.whatsappMessage}
                    onChange={(e) =>
                      update("contact", { ...content.contact, whatsappMessage: e.target.value })
                    }
                  />
                </Field>
              </div>
            </AdminSection>
          )}

          {tab === "servicos" && (
            <AdminSection title="Serviços" description="Crie, edite ou remova os serviços exibidos no site.">
              <button
                type="button"
                onClick={addService}
                className="rounded-lg bg-sky-500 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-400"
              >
                Adicionar serviço
              </button>
              <div className="mt-4 space-y-4">
                {content.services.map((service, index) => (
                  <div key={`${service.title}-${index}`} className="rounded-xl border border-slate-700 p-4">
                    <div className="grid gap-2 md:grid-cols-3">
                      <input
                        className={inputClass}
                        value={service.icon}
                        placeholder="Ícone (wind, wrench, settings...)"
                        onChange={(e) => {
                          const next = [...content.services];
                          next[index] = { ...service, icon: e.target.value };
                          updateArray("services", next);
                        }}
                      />
                      <input
                        className={inputClass}
                        value={service.title}
                        placeholder="Nome do serviço"
                        onChange={(e) => {
                          const next = [...content.services];
                          next[index] = { ...service, title: e.target.value };
                          updateArray("services", next);
                        }}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          updateArray(
                            "services",
                            content.services.filter((_, i) => i !== index)
                          )
                        }
                        className="rounded-lg border border-red-500/40 px-3 py-2 text-sm text-red-400"
                      >
                        Remover
                      </button>
                    </div>
                    <textarea
                      rows={2}
                      className={`${inputClass} mt-2`}
                      value={service.description}
                      placeholder="Descrição"
                      onChange={(e) => {
                        const next = [...content.services];
                        next[index] = { ...service, description: e.target.value };
                        updateArray("services", next);
                      }}
                    />
                    <input
                      className={`${inputClass} mt-2`}
                      value={service.benefit}
                      placeholder="Benefício"
                      onChange={(e) => {
                        const next = [...content.services];
                        next[index] = { ...service, benefit: e.target.value };
                        updateArray("services", next);
                      }}
                    />
                  </div>
                ))}
              </div>
            </AdminSection>
          )}

          {tab === "galeria" && (
            <AdminSection title="Galeria de projetos" description="Upload de imagens com categoria e descrição.">
              <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-sky-500 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-400">
                {uploading ? "Enviando..." : "Adicionar foto"}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  disabled={uploading}
                  onChange={uploadGallery}
                />
              </label>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {content.gallery.map((item, index) => (
                  <div key={item.id} className="rounded-xl border border-slate-700 p-4">
                    <ImageField
                      label={`Projeto ${index + 1}`}
                      value={item.url}
                      folder="gallery"
                      onChange={(url) => {
                        const next = [...content.gallery];
                        next[index] = { ...item, url };
                        updateArray("gallery", next);
                      }}
                    />
                    <input
                      className={`${inputClass} mt-3`}
                      value={item.title}
                      placeholder="Título"
                      onChange={(e) => {
                        const next = [...content.gallery];
                        next[index] = { ...item, title: e.target.value };
                        updateArray("gallery", next);
                      }}
                    />
                    <select
                      className={`${inputClass} mt-2`}
                      value={item.category}
                      onChange={(e) => {
                        const next = [...content.gallery];
                        next[index] = {
                          ...item,
                          category: e.target.value as GalleryCategory
                        };
                        updateArray("gallery", next);
                      }}
                    >
                      {CATEGORY_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                    <textarea
                      rows={2}
                      className={`${inputClass} mt-2`}
                      value={item.description ?? ""}
                      placeholder="Descrição (opcional)"
                      onChange={(e) => {
                        const next = [...content.gallery];
                        next[index] = { ...item, description: e.target.value };
                        updateArray("gallery", next);
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => deleteGalleryItem(item.id)}
                      className="mt-2 text-sm text-red-400 hover:text-red-300"
                    >
                      Remover projeto
                    </button>
                  </div>
                ))}
              </div>
            </AdminSection>
          )}

          {tab === "avaliacoes" && (
            <AdminSection title="Avaliações de clientes">
              <button
                type="button"
                onClick={addReview}
                className="rounded-lg bg-sky-500 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-400"
              >
                Adicionar avaliação
              </button>
              <div className="mt-4 space-y-3">
                {content.reviews.map((review, index) => (
                  <div key={`${review.name}-${index}`} className="rounded-lg border border-slate-700 p-3">
                    <div className="grid gap-2 md:grid-cols-2">
                      <input
                        className={inputClass}
                        value={review.name}
                        placeholder="Nome do cliente"
                        onChange={(e) => {
                          const next = [...content.reviews];
                          next[index] = { ...review, name: e.target.value };
                          updateArray("reviews", next);
                        }}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          updateArray(
                            "reviews",
                            content.reviews.filter((_, i) => i !== index)
                          )
                        }
                        className="rounded-lg border border-red-500/40 px-3 py-2 text-sm text-red-400"
                      >
                        Remover
                      </button>
                    </div>
                    <textarea
                      rows={2}
                      className={`${inputClass} mt-2`}
                      value={review.text}
                      placeholder="Depoimento"
                      onChange={(e) => {
                        const next = [...content.reviews];
                        next[index] = { ...review, text: e.target.value };
                        updateArray("reviews", next);
                      }}
                    />
                  </div>
                ))}
              </div>
            </AdminSection>
          )}

          {tab === "conteudo" && (
            <>
              <AdminSection title="Diferenciais">
                <button
                  type="button"
                  onClick={addDifferential}
                  className="rounded-lg bg-sky-500 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-400"
                >
                  Adicionar diferencial
                </button>
                <div className="mt-4 space-y-3">
                  {content.differentials.map((item, index) => (
                    <div key={`${item.title}-${index}`} className="rounded-lg border border-slate-700 p-3">
                      <div className="grid gap-2 md:grid-cols-3">
                        <input
                          className={inputClass}
                          value={item.icon}
                          placeholder="Ícone"
                          onChange={(e) => {
                            const next = [...content.differentials];
                            next[index] = { ...item, icon: e.target.value };
                            updateArray("differentials", next);
                          }}
                        />
                        <input
                          className={inputClass}
                          value={item.title}
                          onChange={(e) => {
                            const next = [...content.differentials];
                            next[index] = { ...item, title: e.target.value };
                            updateArray("differentials", next);
                          }}
                        />
                        <button
                          type="button"
                          onClick={() =>
                            updateArray(
                              "differentials",
                              content.differentials.filter((_, i) => i !== index)
                            )
                          }
                          className="rounded-lg border border-red-500/40 px-3 py-2 text-sm text-red-400"
                        >
                          Remover
                        </button>
                      </div>
                      <textarea
                        rows={2}
                        className={`${inputClass} mt-2`}
                        value={item.description}
                        onChange={(e) => {
                          const next = [...content.differentials];
                          next[index] = { ...item, description: e.target.value };
                          updateArray("differentials", next);
                        }}
                      />
                    </div>
                  ))}
                </div>
              </AdminSection>

              <AdminSection title="Sobre a empresa">
                <Field label="Título">
                  <input
                    className={inputClass}
                    value={content.about.title}
                    onChange={(e) => update("about", { ...content.about, title: e.target.value })}
                  />
                </Field>
                <Field label="Parágrafos (um por linha)">
                  <textarea
                    rows={6}
                    className={`${inputClass} mt-2`}
                    value={content.about.paragraphs.join("\n\n")}
                    onChange={(e) =>
                      update("about", {
                        ...content.about,
                        paragraphs: e.target.value.split("\n\n").filter(Boolean)
                      })
                    }
                  />
                </Field>
              </AdminSection>
            </>
          )}
        </div>

        <div className="mt-10 flex justify-end border-t border-slate-700 pt-6">
          <button
            type="button"
            onClick={saveContentChanges}
            disabled={saving}
            className="rounded-lg bg-sky-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-400 disabled:opacity-60"
          >
            {saving ? "Salvando..." : "Salvar alterações"}
          </button>
        </div>
      </div>
    </div>
  );
}
