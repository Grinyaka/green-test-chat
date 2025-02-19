import { PageContainer } from '../../components/PageContainer'
import useWhatsAppStore from '../../store/whatsAppStore'
import Chat from './Chat'
import LoginForm from './LoginForm'

const MainPage = () => {
  const isLogged = useWhatsAppStore((state) => state.isLoggedIn)

  return <PageContainer>{isLogged ? <Chat /> : <LoginForm />}</PageContainer>
}

export default MainPage
