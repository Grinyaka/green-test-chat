const API_URL = 'https://api.green-api.com'

export const setSettings = async (
  idInstance: string,
  apiTokenInstance: string
) => {

  const newSettings = {
    webhookUrl: '',
    outgoingWebhook: 'yes',
    stateWebhook: 'yes',
    incomingWebhook: 'yes',
  }
  await fetch(`${API_URL}/waInstance${idInstance}/setSettings/${apiTokenInstance}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({newSettings}),
  })
}

export const getContactInfo = async (
  idInstance: string,
  apiTokenInstance: string,
  chatId: string,
) => {
  const response = await fetch(
    `${API_URL}/waInstance${idInstance}/getContactInfo/${apiTokenInstance}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({chatId}),
    },
  )

  if (!response.ok) {
    throw new Error('Ошибка при получении информации о контакте')
  }

  return response.json()
}

export const sendMessage = async (
  idInstance: string,
  apiTokenInstance: string,
  chatId: string,
  message: string,
) => {
  const response = await fetch(
    `${API_URL}/waInstance${idInstance}/sendMessage/${apiTokenInstance}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({chatId, message}),
    },
  )

  if (!response.ok) {
    throw new Error('Ошибка при отправке сообщения')
  }

  return response.json()
}

export const receiveNotification = async (
  idInstance: string,
  apiTokenInstance: string,
  receiveTimeout: number = 10,
) => {
  const response = await fetch(
    `${API_URL}/waInstance${idInstance}/receiveNotification/${apiTokenInstance}?receiveTimeout=${receiveTimeout}`,
    {
      method: 'GET',
    },
  )

  if (!response.ok) {
    throw new Error('Ошибка при получении уведомлений')
  }

  return response.json()
}

export const deleteNotification = async (
  idInstance: string,
  apiTokenInstance: string,
  receiptId: number,
) => {
  const response = await fetch(
    `${API_URL}/waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${receiptId}`,
    {
      method: 'DELETE',
    },
  )

  if (!response.ok) {
    throw new Error('Ошибка при удалении уведомления')
  }

  return response.json()
}
