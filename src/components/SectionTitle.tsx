type SectionTitleProps = {
  title: string;
  subtitle?: string;
  light?: boolean;
};

export function SectionTitle({ title, subtitle, light = false }: SectionTitleProps) {
  return (
    <div className="text-center">
      <h2
        className={`text-2xl font-extrabold tracking-tight sm:text-3xl md:text-4xl ${
          light ? "text-white" : "text-slate-900"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mx-auto mt-3 max-w-2xl text-base sm:text-lg ${
            light ? "text-sky-100" : "text-slate-500"
          }`}
        >
          {subtitle}
        </p>
      )}
      <div
        className={`mx-auto mt-4 h-1 w-16 rounded-full ${
          light ? "bg-sky-400" : "bg-sky-500"
        }`}
      />
    </div>
  );
}
