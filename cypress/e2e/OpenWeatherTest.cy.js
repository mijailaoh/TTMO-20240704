
const domain = Cypress.env('api_server');
const apiKey = Cypress.env('apiKey');
let cityData;

before(() => {
  cy.CityData().then((city) => {
    expect(city).to.have.property('name');
    expect(city).to.have.property('lon');
    expect(city).to.have.property('lat');
  });

  // data desde fixture
  cy.fixture('cityData.json').then((data) => {
    cityData = data;
  });
})

describe('Tests de API OpenWeatherMap', () => {
  // Test para obtener información del clima por nombre de ciudad
  describe('Consulta por nombre de ciudad', () => {
    it('Debe obtener información del clima por nombre de ciudad', () => {
      cy.fixture('cityData.json').then((city) => {
        cy.request({
          method: 'GET',
          url: `${domain}/weather?q=${city.name}&appid=${apiKey}&units=metric`,
          headers: {
            'accept': 'application/json'
          }
        }).then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body).to.have.property('id').and.eq(city.id);
          expect(response.body).to.have.property('name').and.eq(city.name);
          expect(response.body.coord).to.have.property('lat').and.eq(city.lat);
          expect(response.body.coord).to.have.property('lon').and.eq(city.lon);
          expect(response.body.sys).to.have.property('country').and.eq(city.country.code);
          expect(response.body).to.have.property('main').and.have.property('temp');
        });
      })
    });
  });

  // Test para obtener información del clima por latitud y longitud
  describe('Consulta por latitud y longitud', () => {
    it('Debe obtener información del clima por latitud y longitud', () => {
      cy.request({
        method: 'GET',
        url: `${domain}/weather?lat=${cityData.lat}&lon=${cityData.lon}&appid=${apiKey}&units=metric`,
        headers: {
          'accept': 'application/json'
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('id').and.eq(cityData.id);
        expect(response.body).to.have.property('name').and.eq(cityData.name);
      });
    });
  });

  // Test para obtener información del clima en formato JSON
  describe('Consulta en formato JSON', () => {
    it('Debe obtener información del clima en formato JSON', () => {
      cy.request({
        method: 'GET',
        url: `${domain}/weather?q=${cityData.name}&appid=${apiKey}&units=metric`,
        headers: {
          'accept': 'application/json'
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.headers['content-type']).to.include('application/json');
        expect(response.body).to.have.property('id').and.eq(cityData.id);
        expect(response.body).to.have.property('name').and.eq(cityData.name);
      });
    });
  });

  // Test para obtener información del clima en formato XML
  describe('Consulta en formato XML', () => {
    it('Debe obtener información del clima en formato XML', () => {
      cy.request({
        method: 'GET',
        url: `${domain}/weather?q=${cityData.name}&appid=${apiKey}&mode=xml&units=metric`,
        headers: {
          'accept': 'application/xml'
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.headers['content-type']).to.include('application/xml');
        const xmlDoc = Cypress.$.parseXML(response.body);
        const cityElem = Cypress.$(xmlDoc).find('city');
        expect(cityElem.attr('id')).to.equal(cityData.id.toString());
        expect(cityElem.attr('name')).to.equal(cityData.name);
      });
    });
  });
});
