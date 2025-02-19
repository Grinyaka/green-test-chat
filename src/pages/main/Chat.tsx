import React from 'react'
import styled from 'styled-components'
import CreateChat from './CreateChat'
import useWhatsAppStore from '../../store/whatsAppStore'

const Wrapper = styled.div`
  display: flex;

  margin: auto;

  max-width: 1200px;
  width: 100%;
  flex-direction: column;
  padding: 10px;
  
  max-height: 800px;
  height: 100%;

  background-color: ${({theme}) => theme.backgroundColors.card};
`
const ChatContent = styled.div`
  flex-grow: 1;
  display: flex;
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
  background-color: ${({theme}) => theme.backgroundColors.secondary};

`

const Chat = () => {
    const contactInfo = useWhatsAppStore((state) => state.contactInfo)
  return (
    <Wrapper>
      <CreateChat />
      <ChatContent>
        {contactInfo ? (
          <>
            <Contact>
              {contactInfo.contactName}
              {contactInfo.chatId}
            </Contact>
          </>
        ) : (
          <InfoMsg>Create chat by phone number</InfoMsg>
        )}
      </ChatContent>
    </Wrapper>
  )
}

export default Chat