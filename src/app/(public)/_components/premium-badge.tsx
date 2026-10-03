import { Star } from "lucide-react";

export function PremiumCardBadge() {
  return (
    <div
      className="absolute top-0 right-4 flex h-12 w-9 items-start justify-center bg-yellow-500 pt-2 shadow-md"
      style={{
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 50% 80%, 0 100%)",
      }}
    >
      <Star className="h-4 w-4 fill-white text-white" />
    </div>
  );
}