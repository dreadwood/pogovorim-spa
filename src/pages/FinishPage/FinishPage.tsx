import PageLayout from '@/layout/PageLayout/PageLayout'
import styles from './FinishPage.module.scss'
import Logo from '@/components/Logo/Logo'

export default function FinishPage(): JSX.Element {
  return (
    <PageLayout>
      <div className={styles.wrp}>
        <div className={styles.head}>
          <Logo />
        </div>
        <div className={styles.content}>
          <div className={styles.illustration}>
            <img
              className={styles.cloudDone}
              src="/img/cloud-replica-1.svg"
              width={230}
              height={145}
              alt=""
            />
            <img
              className={styles.lady}
              src="/img/lady-front.svg"
              width={475}
              height={790}
              alt=""
            />
            <div className={styles.cloudText}>
              <img
                src="/img/cloud-replica-2.svg"
                width={241}
                height={214}
                alt=""
              />
              <div className={styles.msg}>Спасибо! Опрос пройден!</div>
            </div>
            <img
              className={styles.flowersLeft}
              src="/img/flowers-1.svg"
              width={342}
              height={275}
              alt=""
            />
            <img
              className={styles.flowersRight}
              src="/img/flowers-2.svg"
              width={266}
              height={176}
              alt=""
            />
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
