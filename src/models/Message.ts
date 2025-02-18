import {JsonObject} from '../utils/JsonObject'

export class Message {
  public static valueOfJson(data: JsonObject<Message>): Message {
    return new Message(data.receiptId, data.body)
  }

  readonly receiptId: number
  readonly body: {
    typeWebhook: string
    instanceData: {
      idInstance: number
      wid: string
      typeInstance: string
    }
    timestamp: number
    idMessage: string
    senderData: {
      chatId: string
      sender: string
      senderName: string
      senderContactName: string
    }
    messageData: {
      typeMessage: string
      textMessageData: {
        textMessage: string
      }
    }
  }

  public constructor(
    receiptId: number,
    body: {
      typeWebhook: string
      instanceData: {
        idInstance: number
        wid: string
        typeInstance: string
      }
      timestamp: number
      idMessage: string
      senderData: {
        chatId: string
        sender: string
        senderName: string
        senderContactName: string
      }
      messageData: {
        typeMessage: string
        textMessageData: {
          textMessage: string
        }
      }
    },
  ) {
    this.receiptId = receiptId
    this.body = body
  }
}
