const fs = require('fs');
const path = require('path');
const https = require('https'); 
const http = require('http');  

module.exports = {
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    "reportDir": "cypress/results",
    "overwrite": true,
    "html": true,
    "reportFilename": "cypress-report"
  },
  e2e: {
    specPattern: 'cypress/e2e/**/*.cy.js',  
    // supportFile: 'cypress/support/index.js',  
    FixturesFolder: 'cypress/fixtures',  
    screenshotsFolder: 'cypress/screenshots', 
    // videosFolder: 'cypress/videos', 
    // video: true, 
    screenshotOnRunFailure: true,  
    trashAssetsBeforeRuns: true,  
    viewportWidth: 1280, 
    viewportHeight: 720,  
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      // Регистрируем задачу для скачивания файла
      on('task', {
        downloadFile({ url, downloadFolder, fileName }) {
          const filePath = path.join(downloadFolder, fileName);
          
          // Возвращаем новый промис
          return new Promise((resolve, reject) => {
            // Выбираем https или http в зависимости от URL
            const client = url.startsWith('https') ? https : http;
            
            // Создаем поток для записи файла
            const file = fs.createWriteStream(filePath);

            // Скачиваем файл
            client.get(url, (response) => {
              if (response.statusCode !== 200) {
                // Если статус не 200, отклоняем промис
                return reject(`Failed to download file. Status code: ${response.statusCode}`);
              }

              // Пайпим данные в файл
              response.pipe(file);

              // Когда файл завершит скачивание
              file.on('finish', () => {
                file.close(() => resolve(filePath)); // Завершаем скачивание, возвращаем путь к файлу
              });
            }).on('error', (err) => {
              // В случае ошибки, удаляем файл, если он был частично скачан
              fs.unlink(filePath, () => {});
              reject(`Error downloading the file: ${err.message}`);
            });
          });
        }
      });
    }
  }
};