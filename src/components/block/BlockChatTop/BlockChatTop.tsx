import clsx from 'clsx'
import styles from './BlockChatTop.module.scss'
import Sprite from '@/components/Sprite/Sprite'
import { useNavigate } from 'react-router-dom'
import { AppRoute } from '@/const'
import { useAppSelector } from '@/hooks/reducer'

interface BlockChatTopProps {
  className?: string
}

function BlockChatTop({ className }: BlockChatTopProps): JSX.Element {
  const navigate = useNavigate()
  const { currentBlock, blockNum } = useAppSelector(
    state => state.questionnaire
  )

  return (
    <div className={clsx(styles.wrp, className)}>
      <button
        className={styles.btnBack}
        onClick={() => navigate(AppRoute.Start)}
      >
        <div className={styles.btnBackIcon}>
          <Sprite name="arrow-back" width="16" height="16" />
        </div>
        <span>Вернуться назад</span>
      </button>
      <div className={styles.name}>{currentBlock?.title}</div>
      <div className={styles.bottom}>
        <div className={styles.label}>Блок {blockNum}</div>
        <div className={styles.category}>
          <Sprite name="graph" width="16" height="16" />
          <span>{currentBlock?.categories_count} категорий</span>
        </div>
      </div>
    </div>
  )
}

export default BlockChatTop
