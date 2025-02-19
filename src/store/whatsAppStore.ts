import {create} from 'zustand'
import {
  getContactInfo,
  sendMessage,
  receiveNotification,
  deleteNotification,
} from '../green-api/whatsAppApi'
import {WebhookResponse, InstanceResponse} from '@green-api/whatsapp-api-client'

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

const useWhatsAppStore = create<WhatsAppStoreI>((set, get) => ({
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
        await sendMessage(instanceId, apiToken, chatId, message)
      } catch (error) {
        set({error: error.message})
      } finally {
        set({isLoading: false})
      }
    },

    // Получение уведомлений
    fetchNotifications: async () => {
      const {instanceId, apiToken} = get().credentials
      if (!instanceId || !apiToken) {
        set({error: 'Данные авторизации не указаны'})
        return
      }

      set({isLoading: true, error: null})

      try {
        const notification = await receiveNotification(instanceId, apiToken)
        if (notification) {
          get().actions.addMessage(notification.body) // Добавляем уведомление в список сообщений
          await deleteNotification(instanceId, apiToken, notification.receiptId) // Удаляем уведомление
        }
      } catch (error) {
        set({error: error.message})
      } finally {
        set({isLoading: false})
      }
    },
  },
}))

export default useWhatsAppStore
