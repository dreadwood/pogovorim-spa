import clsx from 'clsx'
import styles from './BlockForm.module.scss'
import FormFields from '@/components/form/FormFields/FormFields'
import FormRadio from '@/components/form/FormRadio/FormRadio'
import BtnGradient from '@/components/btn/BtnGradient/BtnGradient'
import { useState } from 'react'
import FormSelect, {
  SelectOption
} from '@/components/form/FormSelect/FormSelect'
import { useLazyGetUserIdQuery } from '@/store/questionnaire.api'
import { APP_ID, AppRoute } from '@/const'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/hooks/reducer'
import { setUserId } from '@/store/user.slice'
import { setUserLocal } from '@/services/user-local'

const selectList = [
  {
    text: 'Отдел рекламы и маркетинга',
    value: '1'
  },
  {
    text: 'Туризм и сфера обслуживания',
    value: '2'
  },
  {
    text: 'Производство и технический надзор',
    value: '3'
  },
  {
    text: 'Отдел рейкрутинга и управления персонала',
    value: '4'
  },
  {
    text: 'Аналитика',
    value: '5'
  },
  {
    text: 'Финансы',
    value: '6'
  },
  {
    text: 'Бухгалтерия',
    value: '7'
  }
]

interface BlockFormProps {
  className?: string
}

export default function BlockForm({ className }: BlockFormProps): JSX.Element {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const { clientId } = useAppSelector(state => state.user)

  const [fetchGetUserId] = useLazyGetUserIdQuery()

  const [formMessage, setFormMessage] = useState<string>('')

  const [firstName, setFirstName] = useState<string>('')
  const [secondName, setSecondName] = useState<string>('')
  const [thirdName, setThirdName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [age, setAge] = useState<string>('')
  const [sex, setSex] = useState<string | null>(null)
  const [department, setDepartment] = useState<SelectOption | null>(null)
  const [workExperience, setWorkExperience] = useState<string>('')

  async function handleFormSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault()

    const res = await fetchGetUserId({
      client_uniq_id: clientId || '',
      app_id: APP_ID,
      email: email,
      first_name: firstName,
      second_name: secondName,
      third_name: thirdName,
      sex: sex || '',
      age: +age,
      work_experience: +workExperience,
      department: department ? department.value : ''
    })

    if (!res.isSuccess) {
      setFormMessage('Произошла ошибка.')
      return
    }

    setUserLocal(res.data.user_uniq_id)
    dispatch(setUserId(res.data.user_uniq_id))

    setFirstName('')
    setSecondName('')
    setThirdName('')
    setEmail('')
    setAge('')
    setSex(null)
    setDepartment(null)
    setWorkExperience('')

    navigate(AppRoute.Start)
  }

  return (
    <form className={clsx(styles.form, className)} onSubmit={handleFormSubmit}>
      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>Персональные данные</legend>
        <div className={styles.grid}>
          <FormFields
            label="Фамилия"
            id="secondName"
            value={secondName}
            required
            onChange={evt => setSecondName(evt.target.value)}
          />
          <FormFields
            label="Имя"
            id="firstName"
            value={firstName}
            required
            onChange={evt => setFirstName(evt.target.value)}
          />
          <FormFields
            label="Отчество"
            id="thirdName"
            value={thirdName}
            required
            onChange={evt => setThirdName(evt.target.value)}
          />
          <div className={styles.select}>
            <div className={styles.radio}>
              <FormRadio
                label="Муж."
                name="gender"
                value="male"
                checked={sex === 'male'}
                required
                onChange={evt => setSex(evt.target.value)}
              />
              <FormRadio
                label="Жен."
                name="gender"
                value="female"
                checked={sex === 'female'}
                required
                onChange={evt => {
                  setSex(evt.target.value)
                }}
              />
            </div>
            <FormFields
              label="Возраст"
              type="number"
              id="age"
              value={age}
              required
              onChange={evt => setAge(evt.target.value)}
            />
          </div>
          <FormFields
            label="Email"
            type="email"
            id="email"
            value={email}
            required
            onChange={evt => setEmail(evt.target.value)}
          />
        </div>
      </fieldset>

      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>Отдел</legend>
        <div className={styles.grid}>
          <div className={styles.select}>
            <FormSelect
              currentOption={department}
              options={selectList}
              setOption={setDepartment}
            />
          </div>
          <FormFields
            label="Стаж работы в компании"
            id="workExperience"
            type="number"
            value={workExperience}
            required
            onChange={evt => setWorkExperience(evt.target.value)}
          />
        </div>
      </fieldset>

      <div className={styles.submit}>
        <div className={styles.message}>{formMessage}</div>
        <BtnGradient text="Пройти опрос" type="submit" />
      </div>
    </form>
  )
}
