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
  const { currentBlock, indexCategory } = useAppSelector(
    state => state.questionnaire
  )

  const { data: categories } = useGetCategoriesQuery(
    {
      block_uniq_id: currentBlock?.uniq_id as string,
      app_id: APP_ID
    },
    {
      selectFromResult: ({ data }) => ({ data }),
      skip: !currentBlock
    }
  )

  const swiperRef = useRef<Swiper | null>(null)
  const swiperContainerRef = useRef<HTMLDivElement | null>(null)
  const btnPrevRef = useRef<HTMLButtonElement | null>(null)
  const btnNextRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    if (!swiperContainerRef.current) return

    if (swiperRef.current) {
      swiperRef.current.slideTo(indexCategory)
      return
    }

    swiperRef.current = new Swiper(swiperContainerRef.current, {
      modules: [Navigation, Mousewheel],
      mousewheel: {
        forceToAxis: true
      },
      initialSlide: indexCategory,
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
  }, [indexCategory])

  return (
    <div className={clsx(styles.list, className)} ref={swiperContainerRef}>
      <div className={clsx(styles.wrp, 'swiper-wrapper')}>
        {categories &&
          categories.map((category, i) => (
            <div
              className={clsx(styles.item, 'swiper-slide')}
              key={category.uniq_id}
            >
              <CardCategory
                isActv={indexCategory === i}
                isDone={indexCategory > i}
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
