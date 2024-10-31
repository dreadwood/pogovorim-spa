import clsx from 'clsx'
import styles from './BlockWelcome.module.scss'
import BtnGradient from '@/components/btn/BtnGradient/BtnGradient'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppRoute } from '@/const'

const messages = [
  [
    {
      id: '1a',
      width: 36.4,
      text: 'Добро пожаловать на платформу Поговорим.Бизнес!'
    },
    {
      id: '1b',
      width: 68.0,
      text: 'Мы благодарны вам за участие в этом опросе. Он создан для того, чтобы лучше понять, как вы ощущаете себя на работе и какие ее аспекты можно улучшить.'
    },
    {
      id: '1c',
      width: 57,
      text: 'Меня зовут Фрэнк Ансвер и я помогу Вам пройти опрос и сделать Вашу работу еще комфортнее!'
    }
  ],
  [
    {
      id: '2a',
      width: 64.6,
      text: 'На каждый вопрос можно ответить только <span class="green">"да"</span> или <span class="red">"нет"</span>. Пожалуйста, выбирайте ответ, который лучше всего описывает вашу текущую ситуацию.'
    },
    {
      id: '2b',
      width: 56,
      text: 'Пожалуйста, отвечайте честно, чтобы мы смогли точно понять, что вас беспокоит. Опрос анонимный, и все ответы будут обрабатываться конфиденциально.'
    }
  ],
  [
    {
      id: '3a',
      width: 60,
      text: 'На основе ваших ответов мы сможем выявить возможные проблемы или сложности, с которыми вы сталкиваетесь на работе, и предложить вашему работодателю идеи для улучшения условий и корпоративной культуры.'
    }
  ],
  [
    {
      id: '4a',
      width: 62,
      text: 'Опросник охватывает разные аспекты вашей работы: условия труда и рабочие задачи: рабочая нагрузка, график, физические условия на рабочем месте.'
    },
    {
      id: '4b',
      width: 49,
      text: 'Поддержка и ресурсы: доступ к обучению, помощь руководства и коллег'
    },
    {
      id: '4c',
      width: 68,
      text: 'Эмоциональные и физические аспекты: ваше самочувствие, стресс, баланс между работой и личной жизнью.'
    },
    {
      id: '4d',
      width: 51,
      text: '<span class="green">Спасибо, что делитесь своими мыслями!</span> Мы постараемся их учесть в своем анализе!'
    },
    {
      id: '4e',
      width: 70,
      text: '<img class="emojiOk" src="/img/emoji-ok.png" width="23" height="38">'
    }
  ]
]

interface BlockWelcomeProps {
  className?: string
}

function BlockWelcome({ className }: BlockWelcomeProps): JSX.Element {
  const navigate = useNavigate()
  const [step, setStep] = useState<number>(0)
  return (
    <section className={clsx(styles.section, className)}>
      <div className={styles.wrp}>
        <div>
          <div className={clsx(styles.illustration, styles.desktop)}>
            <img
              className={styles.frankNameArrow}
              src="/img/frank-name-arrow.svg"
              width={183}
              height={167}
              alt=""
            />
            <div className={styles.frank}>
              <img
                className={styles.frankFront}
                src="/img/frank-front.svg"
                width={269}
                height={600}
                alt=""
              />
              <img
                className={styles.frankFrontBg}
                src="/img/frank-front-bg.svg"
                width={183}
                height={167}
                alt=""
              />
            </div>
            <div className={styles.frankMobile}>
              <img
                className={styles.frankMobile}
                src="/img/frank-mobile.svg"
                width={160}
                height={160}
                alt=""
              />
            </div>
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.list}>
            {messages[step].map(msg => (
              <div
                className={styles.bubble}
                style={{
                  maxWidth: `${msg.width}rem`
                }}
                dangerouslySetInnerHTML={{ __html: msg.text }}
                key={msg.id}
              />
            ))}
          </div>
          <div className={styles.btn}>
            {messages.length - 1 === step ? (
              <BtnGradient
                text="Здорово! Как пройти опрос?"
                onClick={() => navigate(AppRoute.Questionnaire)}
              />
            ) : (
              <BtnGradient
                text="Здорово! Как пройти опрос?"
                onClick={() => setStep(currentStep => currentStep + 1)}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default BlockWelcome
