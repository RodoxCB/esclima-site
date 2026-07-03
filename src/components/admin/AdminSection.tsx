type AdminSectionProps = {
  title: string;
  description?: string;
  children: React.ReactNode;
};

export function AdminSection({ title, description, children }: AdminSectionProps) {
  return (
    <section className="rounded-2xl border border-slate-700 bg-slate-800/50 p-5">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-sky-400">{title}</h2>
      {description && <p className="mt-1 text-sm text-slate-400">{description}</p>}
      <div className="mt-4">{children}</div>
    </section>
  );
}
