import puppeteer from "puppeteer";
import readline from "readline";
// função que pede a url pelo terminal, rodar usando node index.js
function perguntar(pergunta) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise(resolve => rl.question(pergunta, resposta => {
    rl.close();
    resolve(resposta);
  }));
}
(async () => {
  try {
    const url = await perguntar("Digite a URL: ");

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setViewport({ width: 1280, height: 720 });

    await page.goto(url, {
      waitUntil: "load",
      timeout: 15000
    });
    await page.screenshot({
      path: "screenshot.png",
      fullPage: false
    });

    console.log("Screenshot gerado: screenshot.png");

    await browser.close();

  } catch (erro) {
    console.log("Erro:", erro.message);
  }
})();
