import * as whatsAppClient from '@green-api/whatsapp-api-client'
import useWhatsAppStore from '../store/whatsAppStore'

let restAPI: whatsAppClient.API
export const initClient = (idInstance, apiTokenInstance) => {
  restAPI = whatsAppClient.restAPI({
    idInstance,
    apiTokenInstance,
  })
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
      useWhatsAppStore.getState().addMessage(body)
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
