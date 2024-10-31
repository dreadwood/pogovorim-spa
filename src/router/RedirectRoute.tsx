import { AppRoute } from '@/const'
import { Navigate, Outlet } from 'react-router-dom'
import { useAppSelector } from '@/hooks/reducer'

function RedirectRoute(): JSX.Element {
  const { clientId } = useAppSelector(state => state.user)

  if (!clientId) {
    return <Navigate to={AppRoute.Root} replace />
  }

  return <Outlet />
}

export default RedirectRoute
