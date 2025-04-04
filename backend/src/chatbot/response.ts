import { logger } from '../helpers/logger.js';
import { formatApiResponse } from '../helpers/bodyResponse.js';
import { stages, getStage } from './stages.js';

interface Client {
   id: string;
   stage: number;
   message: string;
   [key: string]: any; // Optional: To allow additional properties
}

export const chatbot = async (data: {
   client: Client;
}): Promise<{
   status: number;
   message: string;
   timestamp: string;
   client: {
      id: string;
      message: string;
      response: string;
      order: object | undefined;
   };
}> => {
   try {
      const client = data?.client || data;

      const { id, stage, message } = client;

      const currentStage = await getStage({ id, stage });

      const { nextStage, response, order  } = await stages[currentStage].stage.exec({
         id,
         message
      });

      const successResponse = formatApiResponse({
         status: 200,
         message: 'Operação realizada com sucesso',
         client: {
            id,
            stage: nextStage,
            message,
            response,
            order,
         }
      });

      return successResponse;

   } catch (error) {
      logger.error('Erro desconhecido ao executar o chatbot');
      logger.error(error);
      const errorResponse = formatApiResponse({
         status: 500,
         message: 'Erro desconhecido ao executar o chatbot',
         errorCode: 'CHATBOT_UNKNOWN_ERROR'
      });
      return errorResponse;
   }
}



