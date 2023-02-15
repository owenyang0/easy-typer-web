import React, { ReactNode, useState } from "react"
import type { FormEvent } from "react"
import { CSSTransition, TransitionGroup } from "react-transition-group"

import Input from "../../theme/Input"
import Button from "../../theme/Button"
import type { Props as ButtonProps } from "../../theme/Button"
import style from "./style.module.css"
import clsx from "clsx"
import emailPattern from "../../utils/emailPattern"

type Provider = "enterprise" | "cloud" | "newsletter"

type Props = {
  provider?: Provider
  placeholder?: string
  submitButtonText?: string
  submitButtonVariant?: ButtonProps["variant"]
  className?: string
  classNameInputs?: string
  renderSubmitButton?: (props: {
    loading: boolean
    defaultLoader: ReactNode
  }) => ReactNode
}

const providers: { [key in Provider]: string } = {
  cloud: "https://crast.questdb.io/contact/cloud",
  enterprise: "https://crast.questdb.io/contact/new",
  newsletter:
    "https://questdb.us7.list-manage.com/subscribe/post?u=f692ae4038a31e8ae997a0f29&id=bdd4ec2744",
}

const Spinner = () => <span className={style.loader} />

const Subscribe = ({
  placeholder = "Email address",
  provider = "enterprise",
  submitButtonText = "SUBMIT",
  submitButtonVariant,
  className,
  classNameInputs,
  renderSubmitButton,
}: Props) => {
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setLoading(true)

    const target = event.target as HTMLFormElement
    const email = new FormData(target).get("email") as string

    try {
      if (provider === "newsletter") {
        await fetch(
          `${providers.newsletter}&EMAIL=${encodeURIComponent(email)}`,
          { method: "GET" },
        )
      } else {
        await fetch(providers[provider], {
          body: JSON.stringify({ email }),
          headers: { "Content-Type": "application/json" },
          method: "POST",
        })
      }
    } catch (e) {}

    setSent(true)
  }

  return (
    <form className={clsx(style.root, className)} onSubmit={onSubmit}>
      <TransitionGroup>
        <CSSTransition
          key={sent.toString()}
          timeout={200}
          classNames="transition-node"
        >
          {sent ? (
            <p className={style.success}>
              Thank you, we will be in touch soon!
            </p>
          ) : (
            <div className={clsx(style.inputs, classNameInputs)}>
              <Input
                className={style.input}
                name="email"
                type="email"
                title="Email address should be valid"
                placeholder={placeholder}
                required
                pattern={emailPattern}
              />

              {typeof renderSubmitButton === "function" ? (
                renderSubmitButton({ loading, defaultLoader: Spinner })
              ) : (
                <Button
                  className={style.submit}
                  variant={submitButtonVariant}
                  type="submit"
                >
                  {loading ? <Spinner /> : submitButtonText}
                </Button>
              )}
            </div>
          )}
        </CSSTransition>
      </TransitionGroup>
    </form>
  )
}

export default Subscribe
