import { cn } from "@/lib/utils";
interface StepCardProps {
  number: number;
  title: string;
  description: string;
  isLast?: boolean;
}

export function StepCard({ number, title, description, isLast = false }: StepCardProps) {
  return (
    <div className="flex gap-5">
      {/* Number + connector */}
      <div className="flex flex-col items-center">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-red-700 text-sm font-bold text-white shadow-md shadow-red-700/30">
          {number}
        </div>
        {!isLast && (
          <div className="mt-2 w-0.5 flex-1 bg-linear-to-b from-red-300 to-transparent" />
        )}
      </div>

      {/* Content */}
      <div className={cn("pb-8", isLast && "pb-0")}>
        <h3 className="mb-1.5 text-base font-bold text-[#1A1A2E]">{title}</h3>
        <p className="text-sm leading-relaxed text-gray-500">{description}</p>
      </div>
    </div>
  );
}
