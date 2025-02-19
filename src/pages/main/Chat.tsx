import {useEffect} from 'react'
import styled from 'styled-components'
import CreateChat from './CreateChat'
import useWhatsAppStore from '../../store/whatsAppStore'
import {useShallow} from 'zustand/shallow'
import MessageForm from './MessageForm'
import MessagesList from './MessagesList'

const Wrapper = styled.div`
  display: flex;

  margin: auto;

  max-width: 1200px;
  width: 100%;
  flex-direction: column;

  max-height: 800px;
  height: 100%;

  background-color: ${({theme}) => theme.backgroundColors.card};
`
const ChatContent = styled.div`
  flex-grow: 1;
  display: flex;
  overflow: auto;
  flex-direction: column;
  background-color: ${({theme}) => theme.backgroundColors.card};
`
const InfoMsg = styled.span`
  margin: auto;
  margin-top: 40px;
  font-size: ${({theme}) => theme.fontSizes.medium};
  color: ${({theme}) => theme.textColors.secondary};
`
const Contact = styled.div`
  display: flex;
  flex-flow: row nowrap;
  width: 100%;
  background-color: ${({theme}) => theme.backgroundColors.cardActive};
  padding: 10px 15px;

  align-items: center;
  font-weight: bold;
`
const ContactAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 100%;
  margin-right: 10px;
  background-color: ${({theme}) => theme.backgroundColors.accent};
`

const Chat = () => {
  const {contactInfo, isLoading} = useWhatsAppStore(useShallow((state) => ({
    contactInfo: state.contactInfo,
    isLoading: state.isLoading,
  })))
  const {fetchNotifications} = useWhatsAppStore((state) => state.actions)

  useEffect(() => {
    const interval = setInterval(() => {
      fetchNotifications()
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Wrapper>
      <CreateChat />
      <ChatContent>
        {contactInfo ? (
          <>
            <Contact>
              {contactInfo.avatar && <ContactAvatar src={contactInfo.avatar} />}
              {contactInfo.contactName || contactInfo.name}
            </Contact>
            <MessagesList />
            <MessageForm />
          </>
        ) : isLoading ? (
          <InfoMsg>Loading...</InfoMsg>
        ) : (
          <InfoMsg>Create chat by phone number</InfoMsg>
        )}
      </ChatContent>
    </Wrapper>
  )
}

export default Chat
