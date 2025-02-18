import { WebhookResponse } from '@green-api/whatsapp-api-client'
import { create } from 'zustand'

interface WhatsAppStoreI {
  messages: WebhookResponse.MessageWebhook[]
  isLoading: boolean
  error: string | null
  // create UI message model and make messages array of this model ??
  addMessage: (message: WebhookResponse.MessageWebhook) => void
  setLoading: (isLoading: boolean) => void
  setError: (error: string | null) => void
}

const useWhatsAppStore = create<WhatsAppStoreI>((set) => ({
  messages: [],
  isLoading: false,
  error: null,
  addMessage: (message) => {
    set((state) => ({messages: [...state.messages, message]}))
  },

  setLoading: (isLoading) => {
    set({isLoading})
  },

  setError: (error) => {
    set({error})
  },
}))

export default useWhatsAppStore
