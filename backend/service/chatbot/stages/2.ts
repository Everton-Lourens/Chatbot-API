import { storage } from '../storage.js';
import { getMessageDatabase, getAllItemsDatabase } from '../../../db_exemple/local_database.js';

export const stageTwo = {
  async exec({ id, message }: { id: string, message: string }): Promise<{ nextStage: number; order: {}; response: string }> {

    const response: string = await (async () => {

      if (getMessageDatabase('all_items')[message]) {
        const newItem = getMessageDatabase('all_items')[message];
        storage[id].items.push(newItem); // adiciona o item ao carrinho;

        return 'Ótima escolha!\n' +
          getMessageDatabase('attendant_stage')?.message_1;
      }
      else {
        return 'Digite uma opção válida, por favor. 🙋‍♀️';
      }
    })();

    // armazena o que o cliente falou e o que o bot respondeu para ter controle do que está acontecendo e como melhorar caso necessário
    storage[id].trackRecordResponse.push({
      id,
      currentStage: 2,
      nextStage: storage[id].stage,
      message,
      response
    });

    return {
      nextStage: storage[id].stage,
      order: storage[id],
      response
    };

  },
}