import { Snowflake } from "lucide-react";

export function BrandMark() {
  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-sky-400 to-sky-600 text-white shadow-md shadow-sky-500/30">
      <Snowflake size={22} />
    </div>
  );
}
