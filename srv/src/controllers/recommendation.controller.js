import Recommendation from '../model/recommendations.model';
import Answer from '../model/answer.model.js';
import { loginUser as user } from '../controllers/user.controller.js';
import puppeteer from 'puppeteer';
import logger from '../config/logger.js';

async function searchAndExtract(query) {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    // Navegar para a página de resultados do Google
    await page.goto(`https://www.google.com/search?q=${encodeURIComponent(query)}`, {
        waitUntil: 'domcontentloaded',
    });

    // Aguardar os resultados carregarem
    await page.waitForSelector('h3');

    // Extrair título, sumário, link e imagem principal
    const results = await page.evaluate(() => {
        const items = [];
        const resultNodes = document.querySelectorAll('.tF2Cxc'); // Classe de contêiner dos resultados de pesquisa
        
        resultNodes.forEach((result) => {
            const titleElement = result.querySelector('h3');
            const linkElement = result.querySelector('a');
            const descriptionElement = result.querySelector('.VwiC3b');
            const imageElement = result.querySelector('img'); // Seleção de uma imagem, se existir

            if (titleElement && linkElement) {
                items.push({
                    title: titleElement.innerText,
                    link: linkElement.href,
                    summary: descriptionElement ? descriptionElement.innerText : 'N/A',
                    image: imageElement ? imageElement.src : 'N/A',
                });
            }
        });

        return items;
    });

    await browser.close();
    searchAndExtract(query).then(results => {
    console.log('Resultados encontrados:');
    results.forEach((result, index) => {
        console.log(`\nResultado ${index + 1}:`);
        console.log(`Título: ${result.title}`);
        console.log(`Link: ${result.link}`);
        console.log(`Sumário: ${result.summary}`);
        console.log(`Imagem: ${result.image}`);
    });
}).catch(error => {
    console.error('Erro ao buscar e extrair:', error);
});
    return results;
}

async function recommending(title, type, image, summary, link){
    const response = await Recommendation.create({ title: title, type: type, 
        image: image, summary: summary, link: link, id_user: user.id});
    if (response){
        return response;
    }
}

export async function newRecommendation(request, reply) {
    try {
        const [selectedAnswer] = await Answer.findAll({ where: { id_user: user.id }});
        if (!selectedAnswer){
            throw new Error('Answer not found');
        }

        let site;

        switch (selectedAnswer) {
            case 'Saúde e bem estar':
            site = await searchAndExtract('Saúde e bem estar');
            if (site) await recommending(site.title,'Saúde',site.image,site.summary,site.link);
            break;

            case 'Restaurantes em alta':
            site = await searchAndExtract('Restaurantes em alta');
            if (site) await recommending(site.title,'Lugares a visitar',site.image,site.summary,site.link);
            break;

            case 'Frases motivadoras':
            site = await searchAndExtract('Frases motivadoras');
            if (site) await recommending(site.title,'Motivação',site.image,site.summary,site.link);
            break;

            case 'Boas práticas pela manhã':
            site = await searchAndExtract('Boas práticas pela manhã');
            if (site) await recommending(site.title,'Saúde',site.image,site.summary,site.link);
            break;

            case 'Esportes com amigos':
            site = await searchAndExtract('Esportes com amigos');
            if (site) await recommending(site.title,'Lazer',site.image,site.summary,site.link);
            break;

            case 'Lazer com amigos':
            site = await searchAndExtract('Lazer com amigos');
            if (site) await recommending(site.title,'lazer',site.image,site.summary,site.link);
            break;
        }
    } catch (error) {
        logger.error(error);
        reply.status(500).send({ error: 'internal server error', message: error.message });
    }
}