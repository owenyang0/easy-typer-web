import type { PricingPlan } from "../plan"

export const plans: PricingPlan[] = [
  {
    type: "entry",
    title: "Entry Level",
    description: "Perfect to get started quickly",
    price: 0.3458,
    specs: [
      { label: "CPU", value: "2 Cores" },
      { label: "RAM", value: "8 GB" },
    ],
    subtext: "Indicative pricing with 25 GB storage",
  },
  {
    type: "performant",
    title: "Performant",
    description: "Offers better performance for demanding applications",
    price: 0.6915,
    specs: [
      { label: "CPU", value: "4 Cores" },
      { label: "RAM", value: "16 GB" },
    ],
    subtext: "Indicative pricing with 50 GB storage",
    highlighted: true,
  },
  {
    type: "high-performance",
    title: "High Performance",
    description: "Handle heavy duty writes and reads",
    price: 2.0269,
    specs: [
      { label: "CPU", value: "16 Cores" },
      { label: "RAM", value: "64 GB" },
    ],
    subtext: "Indicative pricing with 100 GB storage",
  },
]
