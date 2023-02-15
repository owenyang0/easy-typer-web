import React from "react"
import clsx from "clsx"

import teCss from "../css/about-us/team.module.css"
import ubCss from "../css/about-us/used-by.module.css"
import inCss from "../css/about-us/investors.module.css"
import prCss from "../css/about-us/press.module.css"

import Layout from "../theme/Layout"
import Button from "@theme/Button"

import SvgImage from "../components/SvgImage"
import { Section } from "../components/Section"

import { logos } from "../assets/logos"
import { CustomerLogo } from "src/assets/types"
import ProductMetrics from "../components/ProductMetrics"

import Logo468Capital from "../assets/img/pages/about-us/468capital.svg"
import SeedcampLogo from "../assets/img/pages/about-us/seedcamp.svg"
import UncorrelatedLogo from "../assets/img/pages/about-us/uncorrelated.svg"
import YCombinatorLogo from "../assets/img/pages/about-us/ycombinator.svg"
import ExternalLink from "../assets/img/external-link.svg"

import pressReleases, { PressRelease } from "../assets/press"
import { investors } from "../assets/investors"

const usedByLogos: CustomerLogo[] = [
  {
    ...logos.airbus,
    width: 140,
    height: 56,
  },
  {
    ...logos.kepler,
    width: 140,
    height: 56,
  },
  {
    ...logos["copenhagen-atomics"],
    width: 140,
    height: 56,
  },
  {
    ...logos.yahoo,
    width: 140,
    height: 56,
  },

  {
    ...logos["central-group"],
    width: 140,
    height: 50,
  },
]

const UsedBy = () => (
  <Section fullWidth odd noGap>
    <Section>
      <Section.Subtitle center>
        Used by industry leaders in production environments
      </Section.Subtitle>
      <div className={ubCss.logos}>
        {usedByLogos.map((logo) => (
          <div key={logo.src} className={ubCss.logo}>
            <img
              alt={logo.alt}
              width={logo.width}
              height={logo.height}
              src={logo.src}
            />
          </div>
        ))}
      </div>
    </Section>
  </Section>
)

const Investors = () => (
  <Section>
    <Section.Title>Investors</Section.Title>
    <Section.Subtitle>
      We&apos;ve raised over $15M in funding, backed by leading enterprise VCs
      and open source founders/executives.
    </Section.Subtitle>

    <div className={inCss.investors}>
      <div className={inCss.investor__logos}>
        <SvgImage
          image={
            <Logo468Capital
              width="200"
              height="80"
              className={inCss.investor__logo}
            />
          }
          title="468 Capital"
        />
        <SvgImage
          image={
            <UncorrelatedLogo
              width="200"
              height="80"
              className={inCss.investor__logo}
            />
          }
          title="Uncorrelated Ventures"
        />
        <SvgImage
          image={
            <YCombinatorLogo
              width="200"
              height="80"
              className={inCss.investor__logo}
            />
          }
          title="Y Combinator"
        />
        <SvgImage
          image={
            <SeedcampLogo
              width="200"
              height="80"
              className={inCss.investor__logo}
            />
          }
          title="Seedcamp"
        />
      </div>

      <div className={inCss.investors__text}>
        {investors.map((investor) => (
          <div key={investor.name}>
            <h3 className={inCss.investor__name}>{investor.name}</h3>
            <p className={inCss.investor__position}>{investor.position}</p>
          </div>
        ))}
      </div>
    </div>
  </Section>
)

const Team = () => (
  <Section fullWidth odd noGap>
    <Section>
      <Section.Title>The QuestDB team</Section.Title>

      <div className={teCss.team}>
        <div>
          <p>
            QuestDB is a remote-first company, with a regional office in London.
          </p>
          <p>
            Our team is building the fastest open-source time series database
            from scratch and produces all of the components in-house. We are
            performance-obsessed and strive to create a product that developers
            want.
          </p>
          <p>Here&apos;s what our team say about working at QuestDB:</p>

          <div className={teCss.team__article}>
            <h4 className={teCss.team__article__title}>
              <a href="/blog/2021/11/09/miguel-arregui-working-at-questdb">
                Why I joined QuestDB as a core database engineer
              </a>
            </h4>

            <div className={teCss.team__article__details}>
              <div className={teCss.team__article__image}>
                <img
                  src="/img/pages/about-us/miguel.png"
                  alt="Miguel Arregui photo"
                  width="50"
                  height="50"
                />
              </div>
              <div className={teCss.team__article__text}>
                <p className={teCss.team__article__author}>Miguel Arregui</p>
                <p className={teCss.team__article__position}>
                  Core database engineer
                </p>
              </div>
            </div>
          </div>
        </div>

        <video
          className={teCss.team_video}
          width="100%"
          height="auto"
          src="/img/pages/about-us/team.mp4"
          autoPlay
          loop
          muted
        />
      </div>

      <div className={teCss.team_work}>
        We&apos;re hiring passionate talents to join us in building the fastest
        open source time series database!
        <Button variant="primary" to="/careers">
          See openings
        </Button>
      </div>
    </Section>
  </Section>
)

const PressItem = ({ release }: { release: PressRelease }) => (
  <a
    className={prCss.press_release}
    key={release.url}
    href={release.url}
    target="_blank"
    rel="noopener noreferrer"
  >
    <h3 className={prCss.press_release__title}>{release.title}</h3>
    <div className={prCss.press_release__details}>
      <p className={prCss.press_release__details__author}>{release.author}</p>
      <SvgImage
        image={<ExternalLink />}
        title={`URL for ${String(release.title)}`}
      />
    </div>
  </a>
)

const Press = () => (
  <Section>
    <Section.Title>Press</Section.Title>
    <div className={clsx(prCss.press, prCss["press--col3"])}>
      {pressReleases.map((item) => (
        <PressItem key={item.url} release={item} />
      ))}
    </div>
  </Section>
)

const AboutUs = () => (
  <Layout
    canonical="/about-us/"
    description="Meet the team building the fastest open source time-series database"
    title="About us"
  >
    <Section>
      <Section.Title level={1} center>
        We are building the{" "}
        <em style={{ color: "var(--palette-pink)", fontStyle: "normal" }}>
          fastest
        </em>{" "}
        open source timeseries database
      </Section.Title>
    </Section>
    <Section>
      <ProductMetrics />
    </Section>
    <UsedBy />
    <Investors />
    <Team />
    <Press />
  </Layout>
)

export default AboutUs
