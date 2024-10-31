import clsx from 'clsx'
import styles from './FormSelect.module.scss'
import Sprite from '@/components/Sprite/Sprite'
import { useState } from 'react'

export interface SelectOption {
  text: string
  value: string
}

interface FormSelectProps {
  currentOption: SelectOption | null
  options: SelectOption[]
  setOption: (opt: SelectOption) => void
  className?: string
}

export default function FormSelect({
  currentOption,
  options,
  setOption,
  className
}: FormSelectProps): JSX.Element {
  const [open, seOpen] = useState<boolean>(false)

  function handleClickOption(opt: SelectOption) {
    setOption(opt)
    seOpen(false)
  }

  return (
    <div className={clsx(styles.select, open && styles.show, className)}>
      <button
        className={styles.btn}
        type="button"
        onClick={() => seOpen(currentOpen => !currentOpen)}
      >
        <span>
          {currentOption ? currentOption.text : 'Выберите подразделение'}
        </span>
        <Sprite name="arrow-back-small" width="20" height="20" />
      </button>
      <div className={styles.drop}>
        {options.map(opt => (
          <button
            className={clsx(
              styles.item,
              opt.value === currentOption?.value && styles.actv
            )}
            type="button"
            key={opt.value}
            onClick={() => handleClickOption(opt)}
          >
            {opt.text}
          </button>
        ))}
      </div>
    </div>
  )
}
