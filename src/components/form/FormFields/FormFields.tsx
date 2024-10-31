import clsx from 'clsx'
import styles from './FormFields.module.scss'

interface FormFieldsProps {
  id: string
  name?: string
  type?: React.HTMLInputTypeAttribute
  label?: string
  value?: string
  required?: boolean
  disabled?: boolean
  className?: string
  onChange?: (evt: React.ChangeEvent<HTMLInputElement>) => void
}

function FormFields({
  id,
  name,
  type = 'text',
  label,
  value,
  required,
  disabled,
  className,
  onChange
}: FormFieldsProps): JSX.Element {
  return (
    <div className={styles.field}>
      <input
        className={clsx(styles.input, className)}
        type={type}
        id={id}
        name={name}
        value={value}
        placeholder=""
        required={required}
        disabled={disabled}
        onChange={onChange}
      />
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
    </div>
  )
}

export default FormFields
