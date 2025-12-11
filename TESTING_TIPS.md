# Cypress Testing Tips

## Run a specific test in visual mode (Headed)

To run a specific test file, see the browser window, and keep it open after the test finishes:

```powershell
npx cypress run --spec "cypress/e2e/favorites.cy.ts" --headed --no-exit
```

## Other useful commands

### Open Cypress Interface (Interactive Mode)

Opens the Cypress application where you can select and run tests manually.

```powershell
npm run cypress:open
```

### Run all tests in the console (Headless)

Runs all tests in the background and reports results in the terminal.

```powershell
npm run cypress:run
```

### Run a specific test in the console (Headless)

```powershell
npx cypress run --spec "cypress/e2e/favorites.cy.ts"
```
