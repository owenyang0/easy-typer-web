import React from "react"
import style from "./styles.module.css"
import { Feature, FeatureTable } from "../FeatureTable"
import { Section } from "../../../components/Section"

const CoreFeaturesItems: Feature[] = [
  {
    title: "High-throughput ingestion",
    inOpenSource: "available",
    inCloud: "available",
  },
  {
    title: "Out-of-order ingestion",
    inOpenSource: "available",
    inCloud: "available",
  },
  {
    title: "High-performance SQL",
    inOpenSource: "available",
    inCloud: "available",
  },
  {
    title: "Time-series-native SQL extensions",
    inOpenSource: "available",
    inCloud: "available",
  },
  {
    title: "High-performance data migration",
    inOpenSource: "available",
    inCloud: "available",
  },
  {
    title: "Geospatial data type",
    inOpenSource: "available",
    inCloud: "available",
  },
  {
    title: "Cloud-native backups",
    inOpenSource: "available",
    inCloud: "available",
  },
  {
    title: "Built-in web console",
    inOpenSource: "available",
    inCloud: "available",
  },
  {
    title: "Cold storage support",
    inOpenSource: "unavailable",
    inCloud: "coming-soon",
  },
  {
    title: "Data compression",
    inOpenSource: "unavailable",
    inCloud: "coming-soon",
  },
]

const SecurityFeaturesItems: Feature[] = [
  {
    title: "Authentication",
    inOpenSource: "available",
    inCloud: "available",
  },
  {
    title: "SSO Authentication",
    inOpenSource: "not-applicable",
    inCloud: "available-new",
  },
  {
    title: "TLS encryption",
    inOpenSource: "not-applicable",
    inCloud: "available",
  },
  {
    title: "EBS volume encryption",
    inOpenSource: "not-applicable",
    inCloud: "available",
  },
  {
    title: "VPC peering",
    inOpenSource: "not-applicable",
    inCloud: "coming-soon",
  },
  {
    title: "Role-based authorization",
    inOpenSource: "unavailable",
    inCloud: "coming-soon",
  },
  {
    title: "Bring your own key encryption",
    inOpenSource: "not-applicable",
    inCloud: "coming-soon",
  },
  {
    title: "IP whitelisting",
    inOpenSource: "not-applicable",
    inCloud: "available-new",
  },
]

const HighAvailabilityFeaturesItems: Feature[] = [
  {
    title: "Cloud-native replication",
    inOpenSource: "coming-soon",
    inCloud: "coming-soon",
  },
  {
    title: "High-availability reads",
    inOpenSource: "coming-soon",
    inCloud: "coming-soon",
  },
  {
    title: "High-availability writes",
    inOpenSource: "unavailable",
    inCloud: "coming-soon",
  },
]

const ManagedInfractionFeaturesItems: Feature[] = [
  {
    title: "Scheduled backups",
    inOpenSource: "not-applicable",
    inCloud: "available",
  },
  {
    title: "Monitoring and alerting",
    inOpenSource: "not-applicable",
    inCloud: "available",
  },
  {
    title: "Start / Stop instance",
    inOpenSource: "not-applicable",
    inCloud: "available-new",
  },
  {
    title: "Auto scaling",
    inOpenSource: "not-applicable",
    inCloud: "coming-soon",
  },
  {
    title: "Zero-downtime upgrades",
    inOpenSource: "unavailable",
    inCloud: "coming-soon",
  },
]

const SupportFeaturesItems: Feature[] = [
  {
    title: "Community support",
    inOpenSource: "available",
    inCloud: "available",
  },
  {
    title: "Standard customer support",
    inOpenSource: "unavailable",
    inCloud: "available",
  },
  {
    title: "Customized SLA",
    inOpenSource: "unavailable",
    inCloud: "contact-us",
  },
]

export const CompareFeatures = () => {
  return (
    <Section odd fullWidth>
      <Section.Title center size="small">
        Features
      </Section.Title>

      <Section>
        <div className={style.tables}>
          <FeatureTable title="Core features" items={CoreFeaturesItems} />

          <FeatureTable
            title="Managed infrastructure"
            items={ManagedInfractionFeaturesItems}
          />

          <FeatureTable title="Security" items={SecurityFeaturesItems} />

          <FeatureTable
            title="High availability"
            items={HighAvailabilityFeaturesItems}
          />

          <FeatureTable title="Support" items={SupportFeaturesItems} />
        </div>
      </Section>
    </Section>
  )
}
