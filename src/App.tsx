import ChatPage from '@/pages/ChatPage/ChatPage'
import HistoryRouter from '@/router/HistoryRouter'
import browserHistory from '@/router/browserHistory'
import { Route, Routes } from 'react-router-dom'
import { AppRoute, TEST_DOMAIN } from '@/const'
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
import FinishPage from '@/pages/FinishPage/FinishPage'
import ScrollToTop from '@/router/ScrollToTop'
import { transformConfigView, transformErrResponse } from '@/utils/api'
import { getDomain } from '@/utils/common'
import { setAppId, updateView } from './store/view.slice'

function App() {
  const domain = getDomain()

  const clientId = getClientLocal()
  const userId = getUserLocal()
  const dispatch = useAppDispatch()

  console.log(clientId, userId)

  const { data, isLoading, error } = useGetConfigQuery({
    domain: domain || TEST_DOMAIN
  })

  if (clientId) dispatch(setClientId(clientId))
  if (userId) dispatch(setUserId(userId))

  if (data) {
    const configView = transformConfigView(data.config)
    console.log(configView)

    dispatch(updateView(configView))
    dispatch(setAppId(data.apps[0]?.id || 0))

    dispatch(setClientId(data.uniq_id))
    setClientLocal(data.uniq_id)
  }

  if (isLoading) {
    return <Loading />
  }

  if (error) {
    const msg = transformErrResponse(error)
    return <ErrorDialog msg={msg} />
  }

  return (
    <HistoryRouter history={browserHistory}>
      <ScrollToTop />
      <Routes>
        {/* prettier-ignore */}
        <Route path={AppRoute.Root} element={<WelcomePage />} />
        <Route path={AppRoute.Questionnaire} element={<QuestionnairePage />} />
        <Route path={AppRoute.Start} element={<StartPage />} />
        <Route path={`${AppRoute.Questions}/:uniqId`} element={<ChatPage />} />
        <Route path={AppRoute.Finish} element={<FinishPage />} />
      </Routes>
    </HistoryRouter>
  )
}

export default App
