import { selectCity } from '../helpers/selectCity';

Cypress.Commands.add('CityData', () => {
    const city = selectCity();
    // Write new city object
    cy.writeFile('./cypress/fixtures/cityData.json', city);
    return cy.wrap(city);
});