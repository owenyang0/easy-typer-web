import React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import style from "./styles.module.css"

type Props = {
  title?: React.ReactNode
  children: React.ReactNode
  maxWidth?: string | number
}

const Content = ({ title, children, maxWidth = "35rem" }: Props) => (
  <DialogPrimitive.Portal>
    <DialogPrimitive.Overlay className={style.overlay} />
    <DialogPrimitive.Content className={style.position}>
      <div className={style.content} style={{ maxWidth }}>
        {typeof title !== "undefined" && (
          <h2 className={style.heading}>{title}</h2>
        )}
        {children}
        <DialogPrimitive.Close aria-label="Close" className={style.close} />
      </div>
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
)

const Trigger = ({ children }) => (
  <DialogPrimitive.Trigger asChild>{children}</DialogPrimitive.Trigger>
)

type DialogType = React.FC & {
  Content: typeof Content
  Trigger: typeof Trigger
}

export const Dialog = DialogPrimitive.Root as DialogType
Dialog.Content = Content
Dialog.Trigger = Trigger
