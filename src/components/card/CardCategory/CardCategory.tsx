import clsx from 'clsx'
import styles from './CardCategory.module.scss'
import Sprite from '@/components/Sprite/Sprite'
import { Category } from '@/types/common'

interface CardCategoryProps {
  category: Category
  number: number
  count?: string
  isDone?: boolean
  isActv?: boolean
}

export default function CardCategory({
  category,
  number,
  isDone,
  isActv
}: CardCategoryProps): JSX.Element {
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
      <div className={styles.count}>{category.questions_count} вопросов</div>
    </article>
  )
}
