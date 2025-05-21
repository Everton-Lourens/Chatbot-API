import { storage } from '../storage';
//import { getResponseDatabase } from '../../database/local_database';
import { getOneCachedItem } from '../cache/index';
import { ResponseStage } from './0';
import { ChatbotClient } from '../../entities/chatbot';
import { ChatbotMessages } from '../messages';

export const stageTwo = {
  async exec({ client }: ChatbotClient): Promise<ResponseStage> {
    const chatbotMessages = new ChatbotMessages({ client });

    const productList = storage[client.clientId].order.productList;
    const index = parseInt(client.message, 10) - 1;
    if (isNaN(index) || index < 0 || index >= productList?.length) {
      chatbotMessages.setResponse('Digite uma opção válida, por favor. 🙋‍♀️');
    } else {
      storage[client.clientId].stage = 3;
      storage[client.clientId].humanAttendant = true;
      const newItem = productList[index];
      storage[client.clientId].order.items.push(newItem);
      chatbotMessages.setResponse(`Ótima escolha!\nVocê escolheu o item ${newItem.name}.`);
    }

    const response = await chatbotMessages.getResponse();
    const respondedClient = {
      ...client,
      stage: storage[client.clientId].stage,
      order: storage[client.clientId].order,
      response,
    }
    return { respondedClient };
    /*
    return 'Ótima escolha!' + '\n' +
      '——————————\n' +
      `Item: ${itemName}\n` +
      `Descrição: ${itemDescription}\n` +
      `Preço: R$${itemPrice}\n` +
      '——————————\n\n'
      */
  },
}