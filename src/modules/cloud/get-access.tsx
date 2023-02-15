import React from "react"

import Button from "@theme/Button"
import { Dialog } from "../../components/Dialog"
import { ContactForm } from "./ContactForm"

export const GetAccess = ({ trigger }: { trigger?: React.ReactNode }) => (
  <Dialog>
    <Dialog.Trigger>
      {trigger ?? (
        <Button variant="primary" dataHook="join-private-preview-button">
          Join private preview
        </Button>
      )}
    </Dialog.Trigger>
    <Dialog.Content>
      <ContactForm interestedIn="cloud" modal />
    </Dialog.Content>
  </Dialog>
)
