import React, { useState } from 'react'
import useWhatsAppStore from '../store/whatsAppStore'

const useGetContactInfo = () => {
  const [phoneNumber, setPhoneNumber] = useState('')
  const contactInfo = useWhatsAppStore(state => state.contactInfo)
  const isLoading = useWhatsAppStore((state) => state.isLoading)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(phoneNumber)
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value)
  }

  return {
    phoneNumber,
    contactInfo
  }
}

export default useGetContactInfo