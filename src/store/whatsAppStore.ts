import { InstanceResponse, WebhookResponse } from '@green-api/whatsapp-api-client'
import { create } from 'zustand'
import {
  deleteNotification,
  getContactInfo,
  receiveNotification,
  sendMessage,
  setSettings,
} from '../green-api/whatsAppApi'

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

    fetchContactInfo: (phoneNumber: string) => Promise<void>
    sendMessage: (chatId: string, message: string) => Promise<void>
    fetchNotifications: () => Promise<void>
  }
}

const useWhatsAppStore = create<WhatsAppStoreI>()((set, get) => ({
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
      setSettings(credentials.instanceId, credentials.apiToken)
      set({credentials})
      set({isLoggedIn: true})
    },

    setContactInfo: (contact) => {
      set({contactInfo: contact})
    },

    fetchContactInfo: async (phoneNumber) => {
      const {instanceId, apiToken} = get().credentials
      if (!instanceId || !apiToken) {
        set({error: 'Данные авторизации не указаны'})
        return
      }

      set({isLoading: true, error: null})

      try {
        const chatId = phoneNumber + '@c.us'
        const contactInfo = await getContactInfo(instanceId, apiToken, chatId)
        set({contactInfo})
      } catch (error) {
        set({error: error.message})
      } finally {
        set({isLoading: false})
      }
    },

    sendMessage: async (chatId, message) => {
      const {instanceId, apiToken} = get().credentials
      if (!instanceId || !apiToken) {
        set({error: 'Данные авторизации не указаны'})
        return
      }

      set({isLoading: true, error: null})

      try {
        const response = sendMessage(instanceId, apiToken, chatId, message)
        if (response) {
          get().actions.fetchNotifications()
        }
      } catch (error) {
        set({error: error.message})
      } finally {
        set({isLoading: false})
      }
    },

    fetchNotifications: async () => {
      const {instanceId, apiToken} = get().credentials
      if (!instanceId || !apiToken) {
        set({error: 'Данные авторизации не указаны'})
        return
      }
      const currentContact = get().contactInfo
      if (!currentContact) return
      try {
        const notification: {receiptId: number, body: WebhookResponse.MessageWebhook} = await receiveNotification(instanceId, apiToken)
        if (notification && notification.body.senderData.chatId === currentContact.chatId) {
          get().actions.addMessage(notification.body)
          await deleteNotification(instanceId, apiToken, notification.receiptId)
        }
      } catch (error) {
        set({error: error.message})
      }
    },
  },
}))

export default useWhatsAppStore
