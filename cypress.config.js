const mochawesomeMerge = require('mochawesome-merge');  // Импортируем правильно
const mochawesomeReportGenerator = require('mochawesome-report-generator');
const { defineConfig } = require('cypress');

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        downloadFile({ url, downloadFolder, fileName }) {
          const filePath = path.join(downloadFolder, fileName);
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
      // Инициализация плагина cypress-mochawesome-reporter
      require('cypress-mochawesome-reporter/plugin')(on);

      // Слияние отчетов после завершения тестов
      on('after:run', async () => {  // Используем async/await для асинхронной функции
        try {
          // Мержим все отчеты в один
          const mergedJson = await mochawesomeMerge.merge({ files: ['cypress/results/.jsons/*.json'] });

          // Генерируем финальный HTML отчет
          mochawesomeReportGenerator.create(mergedJson, {
            reportDir: 'cypress/results',
            reportFilename: 'final-report.html',
          });
        } catch (error) {
          console.error('Ошибка при слиянии отчетов:', error);
        }
      });

      return config;
    },// Убедитесь, что это ваш правильный URL
  },
  reporter: 'cypress-mochawesome-reporter',  // Используем репортер mochawesome
  reporterOptions: {
    reportDir: 'cypress/results',          // Папка для сохранения отчетов
    overwrite: true,                       // Перезаписывать отчеты
    html: true,                            // Генерация HTML отчетов
    json: false,                          // Не генерировать JSON файлы
    timestamp: 'yyyy-mm-dd HH:MM:ss',      // Формат для timestamp в именах файлов
  },
});



