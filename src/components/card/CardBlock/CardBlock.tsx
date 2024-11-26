import clsx from 'clsx'
import styles from './CardBlock.module.scss'
import BtnCurve from '@/components/btn/BtnCurve/BtnCurve'
import Sprite from '@/components/Sprite/Sprite'
import { StatBlock } from '@/types/common'
import { useNavigate } from 'react-router-dom'
import { AppRoute } from '@/const'
import { useDispatch } from 'react-redux'
import { resetQuestionnaireState } from '@/store/questionnaire.slice'

interface CardBlockProps {
  block: StatBlock
  number: number
  isDone?: boolean
  isDisabled?: boolean
  className?: string
}

export default function CardBlock({
  block,
  number,
  isDone,
  isDisabled,
  className
}: CardBlockProps): JSX.Element {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const percent = Math.round(+block.percent)
  const steps = `${block.answers} из ${block.option_count}`

  const chartStyle = { '--p': percent } as React.CSSProperties

  function handleButtonClick() {
    dispatch(resetQuestionnaireState())
    navigate(`${AppRoute.Questions}/${block.uniq_id}`)
  }

  return (
    <button
      className={clsx(styles.card, isDone && styles.done, className)}
      disabled={isDisabled}
      onClick={handleButtonClick}
    >
      <div className={styles.status} />
      <div className={styles.top}>
        <div className={styles.progress}>
          <div className={styles.chart} style={chartStyle} />
          <div className={styles.percent}>{percent}%</div>
          <div className={styles.steps}>{steps}</div>
        </div>
        <div className={styles.count}>
          <Sprite name="graph-fill" width="32" height="32" />
          <span>{block.categories_count} категорий</span>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.label}>Блок {number}</div>
        <div className={styles.title}>{block.title}</div>
        <div className={styles.text}>{block.description}</div>
      </div>
      <div className={styles.btnCurve}>
        <BtnCurve isDisabled={isDisabled} />
      </div>
    </button>
  )
}
