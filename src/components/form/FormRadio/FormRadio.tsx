import clsx from 'clsx'
import styles from './FormRadio.module.scss'

interface FormRadioProps {
  name: string
  label: string
  value?: string
  checked?: boolean
  disabled?: boolean
  required?: boolean
  className?: string
  onChange?: (evt: React.ChangeEvent<HTMLInputElement>) => void
}

export default function FormRadio({
  name,
  label,
  value,
  checked,
  disabled,
  required,
  className,
  onChange
}: FormRadioProps): JSX.Element {
  return (
    <label className={clsx(styles.label, className)}>
      <input
        className="visually-hidden"
        type="radio"
        name={name}
        checked={checked}
        disabled={disabled}
        required={required}
        value={value}
        onChange={onChange}
      />
      <div className={styles.icon} />
      {label && <span>{label}</span>}
    </label>
  )
}
