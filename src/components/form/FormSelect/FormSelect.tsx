import clsx from 'clsx'
import styles from './FormSelect.module.scss'
import Sprite from '@/components/Sprite/Sprite'
import { useState } from 'react'
import { Department } from '@/types/common'

interface FormSelectProps {
  currentOption: Department | null
  options: Department[]
  setOption: (opt: Department) => void
  className?: string
}

export default function FormSelect({
  currentOption,
  options,
  setOption,
  className
}: FormSelectProps): JSX.Element {
  const [open, seOpen] = useState<boolean>(false)

  function handleClickOption(opt: Department) {
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
          {currentOption ? currentOption.title : 'Выберите подразделение'}
        </span>
        <Sprite name="arrow-back-small" width="20" height="20" />
      </button>
      <div className={styles.drop}>
        {options.map(opt => (
          <button
            className={clsx(
              styles.item,
              opt.id === currentOption?.id && styles.actv
            )}
            type="button"
            key={opt.id}
            onClick={() => handleClickOption(opt)}
          >
            {opt.title}
          </button>
        ))}
      </div>
    </div>
  )
}
