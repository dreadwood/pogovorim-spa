import clsx from 'clsx'
import styles from './CardProgress.module.scss'
import Sprite from '@/components/Sprite/Sprite'
import { Category } from '@/types/common'

interface CardProgressProps {
  category: Category
  number: number
  count?: string
  isDone?: boolean
  isActv?: boolean
}

function CardProgress({
  category,
  number,
  count = 'Кол-во вопросов',
  isDone,
  isActv
}: CardProgressProps): JSX.Element {
  return (
    <article
      className={clsx(
        styles.card,
        isDone && styles.done,
        isActv && styles.actv
      )}
    >
      <div className={styles.status}></div>
      <div className={styles.icon}>
        <Sprite name="check" width="16" height="16" />
      </div>
      <div className={styles.label}>Категория {number}</div>
      <div className={styles.name}>{category.title}</div>
      <div className={styles.count}>{count}</div>
    </article>
  )
}

export default CardProgress
