import clsx from 'clsx'
import styles from './CardMsgOut.module.scss'
import { Answer } from '@/types/common'

interface CardMsgOutProps {
  onYesClick: (answer: Answer) => void
  onNoClick: (answer: Answer) => void
  className?: string
}

export default function CardMsgOut({
  onYesClick,
  onNoClick,
  className
}: CardMsgOutProps): JSX.Element {
  return (
    <div className={clsx(styles.msg, className)}>
      <div className={styles.pic}>
        <img src="/img/userpic-jully.png" width={60} height={60} alt="" />
      </div>
      <div className={styles.top}>
        <div className={styles.name}>Ваш ответ</div>
      </div>
      <div className={styles.list}>
        <button
          className={clsx(styles.answer, styles.accent)}
          onClick={() => onYesClick('yes')}
        >
          Да
        </button>
        <button className={styles.answer} onClick={() => onNoClick('no')}>
          Нет
        </button>
      </div>
    </div>
  )
}
