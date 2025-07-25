import { Leaf, Truck, Users } from 'lucide-react';

export function BrandBenefits() {
  return (
    <section className="w-full py-12 bg-muted/50">
      <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8 md:gap-6">
        <Benefit
          icon={<Leaf size={40} className="text-green-600" />}
          title="Sustainable Materials"
          description="Ethically sourced and eco-friendly."
        />
        <Benefit
          icon={<Truck size={40} className="text-green-600" />}
          title="Carbon-Neutral Shipping"
          description="Delivered to your door, guilt-free."
        />
        <Benefit
          icon={<Users size={40} className="text-green-600" />}
          title="Community Focused"
          description="Join a movement of conscious consumers."
        />
      </div>
    </section>
  );
}

function Benefit({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center text-center w-full max-w-xs min-h-[180px] rounded-xl border border-muted shadow-sm flex-1 p-5 transition-all duration-200 hover:shadow-xl hover:-translate-y-1 mx-2
      bg-gradient-to-br from-green-50 via-white to-emerald-100">
      <div className="mb-3">{icon}</div>
      <h3 className="text-lg font-semibold mb-1">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}