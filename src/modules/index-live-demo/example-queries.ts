export default [
  {
    comment: [
      "Find the latest value available for each symbol. This dataset uses live crypto market data from Coinbase",
    ],
    query: `SELECT *
FROM trades
WHERE symbol IN ('BTC-USD', 'ETH-USD')
LATEST ON timestamp PARTITION BY symbol;`,
  },

  {
    comment: [
      "Track different aggregations for the BTC-USD stock price evolution for the past day in 15 minutes intervals. This",
      "could be used to display a candle chart visualization. Note how we are using SAMPLE BY to aggregate data at regular",
      "intervals. This dataset uses live crypto market data from Coinbase",
    ],
    query: `SELECT
  timestamp,
  first(price) AS open,
  last(price) AS close,
  min(price),
  max(price),
  sum(amount) AS volume
FROM trades
WHERE symbol = 'BTC-USD' AND timestamp > dateadd('d', -1, now())
SAMPLE BY 15m ALIGN TO CALENDAR;`,
  },

  {
    comment: [
      "Show the weighted average of the BTC-USD stock price evolution for the past day in 15 minutes intervals.",
      "Note how we are using SAMPLE BY to aggregate data at regular intervals.",
      "This dataset uses live crypto market data from Coinbase",
    ],
    query: `SELECT
  timestamp,
  sum(price * amount) / sum(amount) AS vwap_price,
  sum(amount) AS volume
FROM trades
WHERE
  symbol = 'BTC-USD'
  AND timestamp > dateadd('d', -1, now())
SAMPLE BY 15m ALIGN TO CALENDAR;`,
  },

  {
    comment: [
      "Find the latest received position for each ship in the ocean, for ships within a specific geo boundary and",
      "within a time frame. The geo boundary is represented using a geohash of precission 3, which represents an area",
      "of 156x156 Km. QuestDB supports geohashes from 5000x5000 km to 37.2mmx18.6mm. This dataset has been synthetically",
      "generated for the purpose of this demo and contains over 122 million records",
    ],
    query: `SELECT *
FROM pos
WHERE geo6 within(#wtq)
  AND time < '2021-09-19T00:00:00.000000Z'
LATEST ON time PARTITION BY id;`,
  },

  {
    comment: [
      "Get all the taxi rides during 2014 and 2015. Note how we are just using the year when filtering the time range.",
      "QuestDB has SQL extensions for making working with timestamps easier, and we could filter by an arbitrary range",
      "This dataset is open data from the City of New York and has over 1.6 billion records",
    ],
    query: `SELECT *
FROM trips
WHERE
  pickup_datetime >= '2014-01-01'
  AND pickup_datetime < '2016-01-01'`,
  },
  {
    comment: [
      "Count how many taxi rides per hour we saw in the 7 days from June 1st 2018. Note how we are using a SQL extension",
      "to make working with time ranges more convenient. We are also using SAMPLE BY to aggregate records at regular intervals.",
      "This dataset is open data from the City of New York and has over 1.6 billion records",
    ],
    query: `SELECT pickup_datetime, count()
FROM trips
WHERE pickup_datetime IN '2018-06-01;7d'
SAMPLE BY 1h;`,
  },

  {
    comment: [
      "Show some statistics of weather information aggregated per month",
      "This dataset is extracted from public weather information and contains over 137000 records",
    ],
    query: `SELECT
  timestamp,
  min(tempF),
  max(tempF),
  avg(tempF)
FROM weather
SAMPLE BY 1M;`,
  },

  {
    comment: [
      "For each taxi ride in June 1st 2018, show the closest weather information we have on record",
      "This query is joining two unrelated tables using an ASOF JOIN, which automatically finds the",
      "closest event across multiple tables. Note we are not specifying which columns to use for the",
      "join, as QuestDB has the concept of a designated timestamp for each table.",
      "This query uses a public weather dataset (130K records) and a New York City taxi rides public",
      "dataset containing over 1.6 billion rows",
    ],
    query: `SELECT
  pickup_datetime,
  fare_amount,
  tempF,
  windDir
FROM
  (
    SELECT * FROM trips
    WHERE pickup_datetime IN '2018-06-01'
  ) ASOF JOIN weather;`,
  },

  {
    comment: [
      "Find the average gas price per galon in one month intervals",
      "Note how we are using the SAMPLE BY extension to aggregate records at regular intervals",
      "This query uses a small demo dataset (1028 records) with historical gas prices",
    ],
    query: `SELECT timestamp, avg(galon_price)
FROM gas_prices
SAMPLE BY 1M;`,
  },
].map(({ comment, query }) => ({
  comment: comment.map((c) => `-- ${c}`).join("\n"),
  query: query.trim(),
}))
