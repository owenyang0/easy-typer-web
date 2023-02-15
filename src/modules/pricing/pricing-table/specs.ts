type Spec = {
  cpu: number
  ram: number
  storage: number
  prices: {
    [key in RegionKey]?: number
  }
}

export type RegionKey =
  | "eu-west-1"
  | "us-east-2"
  | "us-west-2"
  | "ap-south-1"
  | "eu-central-1"

export type Region = {
  label: string
  specs: Array<Omit<Spec, "prices"> & { price: number }>
}

const labels: { [key in RegionKey]: string } = {
  "us-east-2": "Ohio",
  "us-west-2": "Oregon",
  "eu-west-1": "Ireland",
  "ap-south-1": "Mumbai",
  "eu-central-1": "Frankfurt",
}

const specs: Spec[] = [
  {
    cpu: 2,
    ram: 8,
    storage: 25,
    prices: {
      "us-east-2": 0.346,
      "us-west-2": 0.346,
      "eu-west-1": 0.385,
    },
  },
  {
    cpu: 2,
    ram: 8,
    storage: 100,
    prices: {
      "us-east-2": 0.413,
      "us-west-2": 0.413,
      "eu-west-1": 0.455,
    },
  },
  {
    cpu: 4,
    ram: 16,
    storage: 50,
    prices: {
      "us-east-2": 0.692,
      "us-west-2": 0.692,
      "eu-west-1": 0.768,
    },
  },
  {
    cpu: 4,
    ram: 16,
    storage: 100,
    prices: {
      "us-east-2": 0.737,
      "us-west-2": 0.737,
      "eu-west-1": 0.815,
    },
  },
  {
    cpu: 8,
    ram: 32,
    storage: 100,
    prices: {
      "us-east-2": 1.059,
      "us-west-2": 1.059,
      "eu-west-1": 1.176,
    },
  },
  {
    cpu: 8,
    ram: 32,
    storage: 250,
    prices: {
      "us-east-2": 1.195,
      "us-west-2": 1.195,
      "eu-west-1": 1.316,
    },
  },
  {
    cpu: 16,
    ram: 64,
    storage: 100,
    prices: {
      "us-east-2": 2.027,
      "us-west-2": 2.027,
      "eu-west-1": 2.255,
    },
  },
  {
    cpu: 16,
    ram: 64,
    storage: 250,
    prices: {
      "us-east-2": 2.163,
      "us-west-2": 2.163,
      "eu-west-1": 2.396,
    },
  },
  {
    cpu: 32,
    ram: 128,
    storage: 250,
    prices: {
      "us-east-2": 4.099,
      "us-west-2": 4.099,
      "eu-west-1": 4.556,
    },
  },
  {
    cpu: 32,
    ram: 128,
    storage: 500,
    prices: {
      "us-east-2": 4.325,
      "us-west-2": 4.325,
      "eu-west-1": 4.790,
    },
  },
]

export const regions = Object.fromEntries(
  Object.entries(labels).map(([region, label]) => [
    region,
    {
      label: `${label} (${region})`,
      disabled: ["ap-south-1", "eu-central-1"].includes(region),
      specs: specs.map(({ cpu, ram, storage, prices }) => ({
        cpu,
        ram,
        storage,
        price: prices[region],
      })),
    },
  ]),
)
