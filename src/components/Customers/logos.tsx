import React from "react"
import SvgImage from "../SvgImage"
import clsx from "clsx"
import styles from "./styles.module.css"
import { logos as logosManifest } from "../../assets/logos"

// importing SVGs individually to inject them into the DOM and avoid HTTP request
import yahoo from "../../../static/pimgs/pages/customers/logos/yahoo.svg"
import kepler from "../../../static/pimgs/pages/customers/logos/kepler.svg"
import airbus from "../../../static/pimgs/pages/customers/logos/airbus.svg"
import aquis from "../../../static/pimgs/pages/customers/cards/aquis.svg"
import central_group from "../../../static/pimgs/pages/customers/logos/central_group.svg"
import tqs_integration from "../../../static/pimgs/pages/customers/logos/tqs-integration.svg"
import syndica from "../../../static/pimgs/pages/customers/cards/syndica.svg"
import ca from "../../../static/pimgs/pages/customers/logos/ca.svg"
import turk_telekom from "../../../static/pimgs/pages/customers/logos/turk_telekom.svg"
import liveaction from "../../../static/pimgs/pages/customers/logos/liveaction.svg"
import apache_nifi from "../../../static/pimgs/pages/customers/logos/apache-nifi.svg"
import synology from "../../../static/pimgs/pages/customers/logos/synology.svg"
import prediko from "../../../static/pimgs/pages/customers/logos/prediko.svg"
import electric_era from "../../../static/pimgs/pages/customers/logos/electric-era.svg"
import datron from "../../../static/pimgs/pages/customers/cards/datron.svg"
import netapp from "../../../static/pimgs/logos/netapp.svg"
import okx from "../../../static/pimgs/pages/customers/logos/okx.svg"

const svgs = [
  {
    ...logosManifest["aquis-exchange"],
    svg: aquis,
    width: 110,
    height: 34,
    offset: 8,
  },

  {
    ...logosManifest.yahoo,
    svg: yahoo,
    width: 120,
  },

  {
    ...logosManifest.okx,
    svg: okx,
  },

  {
    ...logosManifest["copenhagen-atomics"],
    svg: ca,
  },

  {
    ...logosManifest.kepler,
    svg: kepler,
  },

  {
    ...logosManifest.airbus,
    svg: airbus,
  },

  {
    ...logosManifest.netapp,
    svg: netapp,
    width: 115,
  },

  {
    ...logosManifest["central-group"],
    svg: central_group,
  },

  {
    ...logosManifest.prediko,
    svg: prediko,
  },

  {
    ...logosManifest.liveaction,
    svg: liveaction,
  },

  {
    ...logosManifest.syndica,
    svg: syndica,
  },

  {
    ...logosManifest.synology,
    svg: synology,
    width: 120,
    height: 30,
  },

  {
    ...logosManifest.electric_era,
    svg: electric_era,
    width: 120,
  },

  {
    ...logosManifest.apacheNifi,
    svg: apache_nifi,
    height: 40,
  },

  {
    ...logosManifest["turk-telekom"],
    svg: turk_telekom,
  },

  {
    ...logosManifest["tqs-integration"],
    svg: tqs_integration,
  },

  {
    ...logosManifest.datron,
    svg: datron,
    width: 120,
  },
]

export const Logos = ({ isDarkTheme }) => (
  <>
    {svgs.map(({ svg, width, height, alt, offset }, i) => (
      <div
        key={i}
        className={clsx(styles.logo, { [styles.logoDark]: isDarkTheme })}
        style={{ ...(offset !== undefined ? { marginTop: offset } : {}) }}
      >
        <SvgImage
          title={alt}
          key={i}
          image={React.createElement(svg, {
            alt,
            width,
            height,
          })}
        />
      </div>
    ))}
  </>
)
