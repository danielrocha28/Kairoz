import Recommendation from '../model/recommendations.model';
import Answer from '../model/answer.model.js';
import { loginUser as user } from '../controllers/user.controller.js';
import puppeteer from 'puppeteer';
import logger from '../config/logger.js';

async function searchAndExtract(query) {
    const browser = await puppeteer.launch({ headless: true }); // false se for preciso ver o processo no console
    const page = await browser.newPage();

    // Navegar para a página de resultados do Google
    await page.goto(`https://www.google.com/search?q=${encodeURIComponent(query)}`, {
        waitUntil: 'domcontentloaded',});
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36');

    await page.setRequestInterception(true);
    page.on('request', (request) => {
        if (['image', 'stylesheet', 'font', 'media'].includes(request.resourceType())) {
            request.abort();
        } else {
            request.continue();
        }
    });
    await page.mouse.move(Math.random() * 800, Math.random() * 600);
    await page.click('input[name=q]', { delay: Math.random() * 100 });

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
                    title: titleElement.innerText, // titulo da pagina
                    link: linkElement.href, // link 
                    summary: descriptionElement ? descriptionElement.innerText : 'N/A', // sumario
                    image: imageElement ? imageElement.src : 'N/A', // imagem principal
                });
            }
        });

        return items;
    });
    await page.waitForTimeout(3000);
    await browser.close();
    return results;
}

async function recommending(title, type, image, summary, link){
    const response = await Recommendation.create({ title: title, type: type, 
        image: image, summary: summary, link: link, id_user: user.id});
    if (response){
        return { response: response };
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