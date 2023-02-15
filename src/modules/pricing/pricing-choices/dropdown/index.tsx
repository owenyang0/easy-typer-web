import React from "react"
import style from "./styles.module.css"

type Props<T = string> = {
  value: T
  onChange: (value: T) => void
  values: Array<{ label: string; value: T; disabled?: boolean }>
}

export const Dropdown = <T,>({ value, onChange, values }: Props<T>) => (
  <div className={style.root}>
    <select
      defaultValue={(value as unknown) as string}
      onChange={({ target: { value } }) => onChange((value as unknown) as T)}
    >
      {values.map(({ label, value, disabled }) => (
        <option
          key={(value as unknown) as string}
          value={(value as unknown) as string}
          disabled={disabled}
        >
          {label}
        </option>
      ))}
    </select>
    <div className={style.view}>
      {values.find(({ value: needle }) => needle === value)?.label ?? value}
    </div>
  </div>
)
