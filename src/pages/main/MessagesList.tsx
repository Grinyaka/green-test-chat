import React from 'react'
import useWhatsAppStore from '../../store/whatsAppStore'
import styled from 'styled-components'
import {Message, WebhookResponse} from '@green-api/whatsapp-api-client'
import { useShallow } from 'zustand/shallow'


const Wrapper = styled.div`
  flex-grow: 1;

  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
  overflow: auto;
  justify-content: end;

  padding: 15px;
`
const MessageCloud = styled.div<{$self: boolean}>`
  padding: 5px 10px;
  border-radius: 5px;
  background-color: ${({theme, $self}) => $self ? theme.backgroundColors.accent : theme.backgroundColors.secondary};
  color: ${({theme}) => theme.textColors.primary};
  width: fit-content;

  align-self: ${({$self}) => $self ? 'flex-end' : 'flex-start'};
`

const MessagesList = () => {
  const {messages} = useWhatsAppStore(useShallow(state => ({messages: state.messages, isLoading: state.isLoading})))

  const getMessageText = (messageData: WebhookResponse.MessageData) => {
    if (messageData.typeMessage === 'textMessage') {
      return messageData.textMessageData.textMessage
    }
    if (messageData.typeMessage === 'extendedTextMessage') {
      return messageData.extendedTextMessageData.text
    } 
    return 'Not text message'
  }

  return (
    <Wrapper>
      {messages.map((message, index) => (
        <MessageCloud
          key={index}
          $self={
            message.typeWebhook === 'outgoingMessageReceived' ||
            message.typeWebhook === 'outgoingAPIMessageReceived'
          }
        >
          {/* надо было сделать ui модели... */}
          {getMessageText(message.messageData)}
        </MessageCloud>
      ))}
    </Wrapper>
  )
}

export default MessagesList