import clsx from 'clsx'
import styles from './CardMsgOut.module.scss'

interface CardMsgOutProps {
  onYesClick: () => void
  onNoClick: () => void
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
          onClick={() => onYesClick()}
        >
          Да
        </button>
        <button className={styles.answer} onClick={() => onNoClick()}>
          Нет
        </button>
      </div>
    </div>
  )
}
