import React, { useState } from 'react'
import styled from 'styled-components'
import useWhatsAppStore from '../../store/whatsAppStore'

const Wrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 100px auto;

  align-items: center;
  justify-content: center;

  border-radius: 5px;
  background-color: ${({theme}) => theme.backgroundColors.card};
  padding: 15px;

  font-size: ${({theme}) => theme.fontSizes.small};
  color: ${({theme}) => theme.textColors.secondary};

  width: 100%;
  max-width: 400px;

  > * {
    font-weight: bold;
  }
`
const Title = styled.span`
  text-align: start;
  width: 100%;
  font-weight: bold;
  font-size: ${({theme}) => theme.fontSizes.xlarge};
`
const Input = styled.input`
  all: unset;
  box-sizing: border-box;

  width: 100%;
  background-color: ${({theme}) => theme.backgroundColors.secondary};
  border-radius: 5px;
  font-size: ${({theme}) => theme.fontSizes.medium};

  padding: 5px 15px;
`
const LoginButton = styled.button`
  all: unset;

  width: fit-content;
  padding: 10px 15px;
  border-radius: 8px;
  cursor: pointer;
  background-color: ${({theme}) => theme.backgroundColors.accent};

  border: 2px solid transparent;

  transition: all 0.2s ease-in-out;
  font-weight: bolder;
  color: ${({theme}) => theme.textColors.accent};
  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    cursor: default;
    border-color: ${({theme}) => theme.backgroundColors.accent};
    background-color: transparent;
    color: ${({theme}) => theme.textColors.secondary};
  }
`

const LoginForm = () => {
  const credentials = useWhatsAppStore((state) => state.credentials)
  const {setCredentials} = useWhatsAppStore((state) => state.actions)
  const [instanceId, setInstanceId] = useState(credentials.instanceId)
  const [apiToken, setApiToken] = useState(credentials.apiToken)

  const isFormFilled = !!instanceId && !!apiToken
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setCredentials({instanceId, apiToken})
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target
    if (name === 'instanceId') {
      setInstanceId(value)
    }
    if (name === 'token') {
      setApiToken(value)
    }
  }

  return (
    <Wrapper onSubmit={handleSubmit}>
      <Title>Welcome to Green API</Title>
      <Input onChange={handleChange} name="instanceId" placeholder="Instance ID" />
      <Input
        type="password"
        onChange={handleChange}
        name="token"
        placeholder="API token"
      />
      <LoginButton disabled={!isFormFilled} type="submit">
        Log in
      </LoginButton>
    </Wrapper>
  )
}

export default LoginForm
