import { storage } from '../storage.js';
import { getMessageDatabase } from '../../database/local_database.js';
import { getOneCachedMessage } from '../messages/index.js';

export const initialStage = {
  async exec({ id, message, chatbot_id }: { id: string, message: string, chatbot_id: string }):
    Promise<{ nextStage: number; response: string; order: {}; }> {

    const firstMessage = await (async () => {
      try {
        return await getOneCachedMessage({
          chatbot_id,
          stage: 0,
          message_number: 1
        });
      } catch (error) {
        return getMessageDatabase('stage_0')?.message_number_1;
      }
    })();

    // Pega do banco de dados Postgres ou do cache
    const response = firstMessage;

    // envia para o stage 1
    storage[id].stage = 1;

    // armazena o que o cliente falou e o que o bot respondeu para ter controle do que está acontecendo e como melhorar caso necessário
    storage[id].trackRecordResponse.push({
      id,
      currentStage: 0,
      nextStage: storage[id].stage,
      message,
      response
    });

    return {
      nextStage: storage[id].stage,
      response,
      order: storage[id]
    };

  },
}