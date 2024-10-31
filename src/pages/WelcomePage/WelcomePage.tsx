import styles from './WelcomePage.module.scss'
import Logo from '@/components/Logo/Logo'
import PageLayout from '@/layout/PageLayout/PageLayout'
import BlockWelcome from '@/components/block/BlockWelcome/BlockWelcome'

function WelcomePage(): JSX.Element {
  return (
    <PageLayout>
      <div className={styles.wrp}>
        <div className={styles.head}>
          <Logo />
        </div>
        <BlockWelcome />
      </div>
    </PageLayout>
  )
}

export default WelcomePage
