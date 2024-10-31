import ChatPage from '@/pages/ChatPage/ChatPage'
import HistoryRouter from '@/router/HistoryRouter'
import browserHistory from '@/router/browserHistory'
import { Route, Routes } from 'react-router-dom'
import { AppRoute, DOMAIN } from '@/const'
import WelcomePage from '@/pages/WelcomePage/WelcomePage'
import StartPage from '@/pages/StartPage/StartPage'
import QuestionnairePage from '@/pages/QuestionnairePage/QuestionnairePage'
import { useGetConfigQuery } from '@/store/questionnaire.api'
import Loading from '@/components/common/Loading/Loading'
import { getClientLocal, setClientLocal } from '@/services/client-local'
import ErrorDialog from '@/components/common/ErrorDialog/ErrorDialog'
import { useAppDispatch } from '@/hooks/reducer'
import { getUserLocal } from '@/services/user-local'
import { setClientId, setUserId } from '@/store/user.slice'
import RedirectRoute from '@/router/RedirectRoute'

function App() {
  const clientId = getClientLocal()
  const userId = getUserLocal()
  const dispatch = useAppDispatch()

  const { data, isLoading } = useGetConfigQuery(
    { domain: DOMAIN },
    { skip: !!clientId || !!userId }
  )

  if (clientId && userId) {
    dispatch(setClientId(clientId))

    dispatch(setUserId(userId))
  }

  if (clientId) {
    dispatch(setClientId(clientId))
  }

  if (data) {
    dispatch(setClientId(data.uniq_id))
    setClientLocal(data.uniq_id)
  }

  if (isLoading) {
    return <Loading />
  }

  if (!data && !clientId) {
    return (
      <ErrorDialog msg={'Не удается получить client_id или сохранить его'} />
    )
  }

  return (
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route path={AppRoute.Root} element={<WelcomePage />} />

        <Route element={<RedirectRoute />}>
          <Route path={AppRoute.Start} element={<StartPage />} />
          <Route
            path={AppRoute.Questionnaire}
            element={<QuestionnairePage />}
          />
          <Route
            path={`${AppRoute.Questions}/:uniqId`}
            element={<ChatPage />}
          />
        </Route>
      </Routes>
    </HistoryRouter>
  )
}

export default App
