import { useEffect } from 'react'
import { PageContainer } from '../../components/PageContainer'
import { initClient } from '../../green-api'
import useWhatsAppStore from '../../store/whatsAppStore'
import Chat from './Chat'
import LoginForm from './LoginForm'

const MainPage = () => {
  const isLogged = useWhatsAppStore((state) => state.isLoggedIn)
  const credentials = useWhatsAppStore((state) => state.credentials)

  useEffect(() => {
    if (isLogged) {
      initClient(credentials.instanceId, credentials.apiToken)
    }
  }, [isLogged])

  return <PageContainer>{isLogged ? <Chat /> : <LoginForm />}</PageContainer>
}

export default MainPage
