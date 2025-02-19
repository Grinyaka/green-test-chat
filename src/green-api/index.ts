import * as whatsAppClient from '@green-api/whatsapp-api-client'
import useWhatsAppStore from '../store/whatsAppStore'
import {JsonObject} from '../utils/JsonObject'

let restAPI: whatsAppClient.API
export const initClient = (idInstance: string, apiTokenInstance: string) => {
  restAPI = (window as any).whatsAppClient.restAPI({
    idInstance,
    apiTokenInstance,
    host: 'https://1103.api.green-api.com',
  })
}

export const getChatUserData = async (phone: string) => {
  if (!restAPI) {
    console.error('Клиент не инициализирован')
    return
  }

  try {
    const chatId = phone + '@c.us'
    const response = await fetch(
      `https://1103.api.green-api.com/waInstance1103195089/getContactInfo/00ae9bd0808349ab98c326c50bd370a1086f16e4d2514a869a`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chatId,
        }),
      },
    )
    if (!response.ok) throw new Error('Network response was not ok')
    const json: JsonObject<whatsAppClient.InstanceResponse.GetContactInfo> =
      await response.json()
    useWhatsAppStore.getState().actions.setContactInfo(json)
    return response
  } catch (error) {
    console.error('Ошибка при получении данных чата:', error)
  }
}

export const startReceivingMessages = () => {
  if (!restAPI) {
    console.error('Клиент не инициализирован')
    return
  }

  console.log('Запуск получения уведомлений...')
  restAPI.webhookService.startReceivingNotifications()

  restAPI.webhookService.onReceivingMessageText((body) => {
    console.log('Получено сообщение:', body)

    if (body.typeWebhook === 'incomingMessageReceived') {
      useWhatsAppStore.getState().actions.addMessage(body)
    }
  })

  restAPI.webhookService.onReceivingDeviceStatus((body) => {
    console.log('Статус устройства:', body)
  })

  restAPI.webhookService.onReceivingAccountStatus((body) => {
    console.log('Статус аккаунта:', body)
  })
}
export const stopReceivingMessages = () => {
  if (!restAPI) {
    console.error('Клиент не инициализирован')
    return
  }

  console.log('Остановка получения уведомлений...')
  restAPI.webhookService.stopReceivingNotifications()
}
