import Recommendation from '../model/recommendations.model.js';
import Answer from '../model/answer.model.js';
import { loginUser as user } from '../controllers/user.controller.js';
import logger from '../config/logger.js';

async function recommending(type, link){
    const response = await Recommendation.create({ type: type, link: link, id_user: user.id });
    if (response){
        return { response: response };
    }
}

export async function newRecommendation(request, reply) {
    try {
        const [selectedAnswer] = await Answer.findAll({ where: { id_user: user.id }});
        if (!selectedAnswer){
            reply.status(404).send('Answer not found');
        }

        let site;
        switch (selectedAnswer.text) {
            case 'Saúde e bem estar':
            site = { type: 'Saude', link: 'https://www.ufmg.br/espacodoconhecimento/saude-e-bem-estar/' };
            break;

            case 'Restaurantes em alta':
            site = { type: 'Lugares a visitar', link: 'https://bit.ly/4fX04e8' };
            break;

            case 'Frases motivadoras':
            site = { type: 'Motivação', link: 'https://www.pensador.com/frases_de_motivacao/'};
            break;

            case 'Boas práticas pela manhã':
            site = { type: 'Saúde', link: 'https://bit.ly/4i23NJq' };
            break;

            case 'Esportes com amigos':
            site = { type: 'Lazer', link: 'https://bit.ly/497w8K5' };
            break;

            case 'Lazer com amigos':
            site = { type: 'Lazer', link: 'https://bit.ly/3B028Dt' };
            break;
        }

        const response = await recommending(site.type, site.link);
        if (response) {
            return reply.status(201).send(response);
        } else {
            return reply.status(500).send({ error: 'Failed to create recommendation' });
        }

    } catch (error) {
        logger.error(error);
        reply.status(500).send({ error: 'internal server error', message: error.message });
    }
}