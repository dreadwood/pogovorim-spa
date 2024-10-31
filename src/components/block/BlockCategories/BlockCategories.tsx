import { useEffect, useRef } from 'react'
import clsx from 'clsx'
import Swiper from 'swiper'
import { Navigation, Mousewheel } from 'swiper/modules'
import CardCategory from '@/components/card/CardCategory/CardCategory'
import Sprite from '@/components/Sprite/Sprite'
import styles from './BlockCategories.module.scss'
import '/node_modules/swiper/swiper.min.css'
import { useGetCategoriesQuery } from '@/store/questionnaire.api'
import { APP_ID } from '@/const'
import { useAppSelector } from '@/hooks/reducer'

interface BlockCategoriesProps {
  className?: string
}

function BlockCategories({ className }: BlockCategoriesProps): JSX.Element {
  const { currentBlock, currentCategory } = useAppSelector(
    state => state.questionnaire
  )

  const { data: categories } = useGetCategoriesQuery(
    {
      block_uniq_id: currentBlock?.uniq_id || '',
      app_id: APP_ID
    },
    {
      selectFromResult: ({ data }) => ({ data })
    }
  )

  const swiperRef = useRef<HTMLDivElement | null>(null)
  const btnPrevRef = useRef<HTMLButtonElement | null>(null)
  const btnNextRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    if (!swiperRef.current) return

    new Swiper(swiperRef.current, {
      modules: [Navigation, Mousewheel],
      mousewheel: {
        forceToAxis: true
      },
      initialSlide: currentCategory,
      spaceBetween: 12,
      grabCursor: true,
      slidesPerView: 'auto',
      freeMode: {
        enabled: true,
        sticky: true
      },
      navigation: {
        prevEl: btnPrevRef.current,
        nextEl: btnNextRef.current
      },
      breakpoints: {
        768: {
          spaceBetween: 30
        }
      }
    })
  }, [])

  return (
    <div className={clsx(styles.list, className)} ref={swiperRef}>
      <div className={clsx(styles.wrp, 'swiper-wrapper')}>
        {categories &&
          categories.map((category, i) => (
            <div
              className={clsx(styles.item, 'swiper-slide')}
              key={category.uniq_id}
            >
              <CardCategory
                isActv={currentCategory === i}
                category={category}
                number={i + 1}
              />
            </div>
          ))}
      </div>
      <div className={styles.controls}>
        <button className={clsx(styles.btn)} ref={btnPrevRef}>
          <Sprite name="arrow-prev-small" width="20" height="20" />
        </button>
        <button className={clsx(styles.btn)} ref={btnNextRef}>
          <Sprite name="arrow-next-small" width="20" height="20" />
        </button>
      </div>
    </div>
  )
}

export default BlockCategories
