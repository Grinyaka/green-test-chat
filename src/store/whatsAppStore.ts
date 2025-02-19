import { WebhookResponse, InstanceResponse } from '@green-api/whatsapp-api-client'
import { create } from 'zustand'

interface WhatsAppStoreI {
  messages: WebhookResponse.MessageWebhook[]
  isLoading: boolean
  error: string | null
  credentials: {
    instanceId?: string
    apiToken?: string
  }
  contactInfo?: InstanceResponse.GetContactInfo

  isLoggedIn: boolean
  actions: {
    addMessage: (message: WebhookResponse.MessageWebhook) => void

    setLoading: (isLoading: boolean) => void
    setError: (error: string | null) => void

    setCredentials: (credentials: {instanceId: string; apiToken: string}) => void
    setContactInfo: (contact?: InstanceResponse.GetContactInfo) => void
  }
}

const useWhatsAppStore = create<WhatsAppStoreI>((set) => ({
  messages: [],
  isLoading: false,
  credentials: {
    instanceId: undefined,
    apiToken: undefined,
  },
  contactInfo: undefined,
  isLoggedIn: false,
  error: null,
  actions: {
    addMessage: (message) => {
      set((state) => ({messages: [...state.messages, message]}))
    },

    setLoading: (isLoading) => {
      set({isLoading})
    },

    setError: (error) => {
      set({error})
    },

    setCredentials: (credentials) => {
      set({credentials})
      set({isLoggedIn: true})
    },

    setContactInfo: (contact) => {
      set({contactInfo: contact})
    },
  },
}))

export default useWhatsAppStore
