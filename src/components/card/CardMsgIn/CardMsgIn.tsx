import clsx from 'clsx'
import styles from './CardMsgIn.module.scss'

interface CardMsgInProps {
  text: string
  group?: string
  isSingle?: boolean
  className?: string
}

export default function CardMsgIn({
  text,
  group,
  isSingle = false,
  className
}: CardMsgInProps): JSX.Element {
  return (
    <div className={clsx(styles.msg, isSingle && styles.single, className)}>
      <div className={styles.pic}>
        <img src="/img/userpic-frank.png" width={60} height={60} alt="" />
      </div>
      <div className={styles.top}>
        <div className={styles.name}>Фрэнк Ансвер</div>
        <div className={styles.spec}>HR-специалист</div>
      </div>
      <div className={styles.list}>
        <div className={styles.bubble}>
          {group && <div className={styles.group}>{group}</div>}
          <div>{text}</div>
        </div>
      </div>
    </div>
  )
}
