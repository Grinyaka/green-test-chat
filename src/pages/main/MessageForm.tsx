import { useRef, useState } from 'react'
import styled from 'styled-components'
import useWhatsAppStore from '../../store/whatsAppStore'

const Form = styled.form`
  display: flex;
  flex-flow: row nowrap;
  gap: 5px;
  width: 100%;
  font-size: ${({theme}) => theme.fontSizes.medium};
  background-color: ${({theme}) => theme.backgroundColors.secondary};
  align-items: start;
  padding: 10px;
`
const MessageInput = styled.textarea`
  all: unset;
  box-sizing: border-box;

  flex-grow: 1;
  background-color: ${({theme}) => theme.backgroundColors.cardActive};
  border-radius: 5px;

  padding: 5px 10px;

  max-height: 200px;
  overflow-y: auto;

  word-wrap: break-word;
  white-space: pre-wrap;

  resize: none;

  &::placeholder {
    padding-left: 10px;
  }
`
const SendButton = styled.button`
  all: unset;

  width: fit-content;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  background-color: ${({theme}) => theme.backgroundColors.button};

  transition: all 0.2s ease-in-out;
  color: ${({theme}) => theme.textColors.accent};
  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    cursor: default;
    background-color: ${({theme}) => theme.backgroundColors.card};
    color: ${({theme}) => theme.textColors.secondary};
  }
`

const MessageForm = () => {
  const contactInfo = useWhatsAppStore((state) => state.contactInfo)
  const {sendMessage} = useWhatsAppStore((state) => state.actions)
  const [currentMessage, setCurrentMessage] = useState('')
  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const value: string = (e.target[0].value || '') as string
    if (value.length < 1) return

    if (!contactInfo) return
    setCurrentMessage('')
    sendMessage(contactInfo.chatId, value)
  }

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentMessage(e.target.value)
    e.target.style.height = ''
    e.target.style.height = e.target.scrollHeight + 'px'
  }

  const onEnterPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && e.shiftKey == false) {
      e.preventDefault()
      const value: string = e.currentTarget.value || ''
      if (value.length < 1) return

      if (!contactInfo) return
      setCurrentMessage('')
      sendMessage(contactInfo.chatId, value)
    }
  }
  return (
    <Form ref={formRef} onSubmit={handleSubmit}>
      <MessageInput
        onKeyDown={onEnterPress}
        onInput={handleInput}
        value={currentMessage}
        placeholder="Enter your message"
      />
      <SendButton disabled={!contactInfo || !currentMessage.trim()}>Send</SendButton>
    </Form>
  )
}

export default MessageForm
