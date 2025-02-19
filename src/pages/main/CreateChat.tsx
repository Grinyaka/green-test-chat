import styled from 'styled-components'
import useWhatsAppStore from '../../store/whatsAppStore'

const PhoneForm = styled.form`
  display: flex;
  flex-flow: row nowrap;
  gap: 5px;
  width: 100%;
  font-size: ${({theme}) => theme.fontSizes.medium};
  background-color: ${({theme}) => theme.backgroundColors.secondary};
  margin-bottom: 10px;
  padding: 10px;
`
const PhoneInput = styled.input`
  all: unset;
  box-sizing: border-box;

  flex-grow: 1;
  background-color: ${({theme}) => theme.backgroundColors.cardActive};
  border-radius: 5px;

  padding: 5px 10px;
`
const PhoneButton = styled.button`
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

const CreateChat = () => {
  const contactInfo = useWhatsAppStore((state) => state.contactInfo)
  const {fetchContactInfo} = useWhatsAppStore(state => state.actions)
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    let value: string = ((e.target[0].value || '') as string)
      .replaceAll('+', '')
      .replaceAll(' ', '')
      .replaceAll('-', '')  
    if (value.startsWith('8')) {
      value = `7${value.slice(1)}`
    }
    if (contactInfo && contactInfo.chatId.includes(value)) return
    fetchContactInfo(value)
  }

  return (
    <PhoneForm onSubmit={handleSubmit}>
      <PhoneInput type="text" placeholder="Enter phone number" />
      <PhoneButton>Create chat</PhoneButton>
    </PhoneForm>
  )
}

export default CreateChat
