import React, { FormEvent, useState } from "react"
import { CSSTransition, TransitionGroup } from "react-transition-group"
import Input from "@theme/Input"
import Button from "@theme/Button"
import emailPattern from "../../../utils/emailPattern"
import subscribeStyle from "../../../components/Subscribe/style.module.css"
import style from "./styles.module.css"
import clsx from "clsx"
import type { PricingPlan } from "../../pricing/plan"
import Link from "@docusaurus/Link"
import CameraIcon from "../../../assets/img/camera.svg"
import SvgImage from "../../../components/SvgImage"

type Props = {
  interestedIn?: PricingPlan["type"] | "custom" | "cloud" | "sla"
  defaultEmail?: string
  defaultName?: string
  defaultCompany?: string
  modal?: boolean
}

export const ContactForm = ({
  defaultEmail = "",
  defaultName = "",
  defaultCompany = "",
  interestedIn,
  modal,
}: Props) => {
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setLoading(true)

    const formData = new FormData(event.target as HTMLFormElement)
    const payload = {
      name: formData.get("name"),
      company: formData.get("company"),
      email: formData.get("email"),
      interestedIn: formData.get("interestedIn"),
    }

    try {
      await fetch("https://crast.questdb.io/contact/form", {
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" },
        method: "POST",
      })
    } catch (e) {}

    setSent(true)
  }

  return (
    <div className={clsx(style.root, { [style.modal]: modal })}>
      <form onSubmit={onSubmit}>
        <TransitionGroup>
          <CSSTransition
            key={sent.toString()}
            timeout={200}
            classNames="transition-node"
          >
            {sent ? (
              <p className={subscribeStyle.success}>
                Thank you, we will be in touch soon!
              </p>
            ) : (
              <div className={style.content}>
                <h2 className={style.formTitle}>Join private preview</h2>
                {typeof interestedIn === "string" && (
                  <input
                    type="hidden"
                    name="interestedIn"
                    value={interestedIn}
                  />
                )}

                <Input
                  className={subscribeStyle.input}
                  name="email"
                  defaultValue={defaultEmail}
                  type="email"
                  title="Email address should be valid"
                  placeholder="E-mail*"
                  required
                  pattern={emailPattern}
                />

                <Input
                  className={subscribeStyle.input}
                  name="name"
                  defaultValue={defaultName}
                  type="text"
                  placeholder="Name"
                />

                <Input
                  className={subscribeStyle.input}
                  name="company"
                  defaultValue={defaultCompany}
                  type="text"
                  placeholder="Company"
                />

                <div className={style.submitBlock}>
                  <Button
                    className={clsx(style.submit, { [style.loader]: loading })}
                    disabled={loading}
                    variant="primary"
                    type="submit"
                    dataHook="contact-form-submit"
                  >
                    {loading ? "Sending..." : "Sign up for early access"}
                  </Button>
                </div>
              </div>
            )}
          </CSSTransition>
        </TransitionGroup>
      </form>
      <div className={style.bookADemo}>
        <SvgImage image={<CameraIcon />} title="An icon showing a camera" />
        <span>
          If you want to know more,{" "}
          <Link to="/cloud/book-a-demo/">book a demo</Link>.
        </span>
      </div>
    </div>
  )
}
