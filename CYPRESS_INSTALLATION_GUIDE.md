# Решение проблемы с установкой Cypress

## Проблема

При установке Cypress возникла ошибка SSL сертификата:

```
Error: unable to get local issuer certificate
```

## Что было сделано

✅ Cypress установлен как npm пакет (без бинарного файла) для обеспечения работы TypeScript типов

## Решения для полной установки Cypress

### Вариант 1: Отключить проверку SSL (временное решение)

```powershell
# PowerShell
$env:NODE_TLS_REJECT_UNAUTHORIZED="0"
npm install --save-dev cypress --force

# Или через cmd
set NODE_TLS_REJECT_UNAUTHORIZED=0
npm install --save-dev cypress --force
```

### Вариант 2: Настроить прокси (если используется корпоративная сеть)

```powershell
# Установить переменные окружения для прокси
$env:HTTP_PROXY="http://proxy.company.com:8080"
$env:HTTPS_PROXY="http://proxy.company.com:8080"
npm install --save-dev cypress
```

### Вариант 3: Установить корпоративный сертификат

```powershell
# Установить сертификат в npm
npm config set cafile "C:\path\to\certificate.crt"
npm install --save-dev cypress
```

### Вариант 4: Скачать Cypress вручную

1. Скачайте Cypress с официального сайта:
   https://download.cypress.io/desktop/13.17.0?platform=win32&arch=x64

2. Распакуйте архив в:

   ```
   C:\Users\ib046\AppData\Local\Cypress\Cache\13.17.0\
   ```

3. Установите переменную окружения:

   ```powershell
   $env:CYPRESS_RUN_BINARY="C:\Users\ib046\AppData\Local\Cypress\Cache\13.17.0\Cypress\Cypress.exe"
   ```

4. Запустите:
   ```bash
   npm run cypress:open
   ```

### Вариант 5: Использовать npm config для SSL (рекомендуется для корпоративных сетей)

```bash
npm config set strict-ssl false
npm install --save-dev cypress
npm config set strict-ssl true  # Вернуть настройку обратно после установки
```

## Текущий статус

✅ **Cypress npm пакет установлен** - TypeScript типы работают, ошибок в коде нет
❌ **Cypress бинарный файл не установлен** - GUI Test Runner недоступен

## Альтернатива: Использовать другие инструменты тестирования

Если проблема с Cypress не решается, можно использовать альтернативные инструменты:

### 1. Playwright (от Microsoft)

```bash
npm install --save-dev @playwright/test
npx playwright install
```

Playwright не требует отдельной загрузки бинарных файлов через SSL и обычно работает без проблем в корпоративных сетях.

### 2. Selenium WebDriver

```bash
npm install --save-dev selenium-webdriver
```

### 3. Puppeteer

```bash
npm install --save-dev puppeteer
```

## Проверка текущей установки

```bash
# Проверить, установлен ли Cypress
npx cypress --version

# Если ошибка, попробуйте переустановить
npm uninstall cypress
# Затем один из вариантов выше
```

## Для продолжения работы с тестами

Все тестовые файлы готовы и не имеют ошибок TypeScript. Когда Cypress будет полностью установлен, тесты можно будет запускать:

```bash
# Интерактивный режим
npm run cypress:open

# Headless режим
npm run cypress:run
```

## Рекомендация

**Вариант 5** (npm config set strict-ssl false) - самый простой и безопасный для временного решения проблемы в dev окружении.

После установки Cypress все 70 тестов будут готовы к запуску! 🚀
