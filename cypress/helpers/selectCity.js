// Function to select a random element from an array
const cities = [
    {
        id: 3652462,
        name: 'Quito',
        lon: -78.5249,
        lat: -0.2299,
        country: {
            id: '8555',
            code: 'EC',
        },
    },
    {
        id: 3688689,
        name: 'Bogota',
        lon: -74.0817,
        lat: 4.6097,
        country: {
            id: '8582',
            code: 'CO',
        },

    },
    {
        id: 5128581,
        name: 'New York',
        lon: -74.006,
        lat: 40.7143,
        country: {
            id: '4610',
            code: 'US',
        },
    },
    {
        id: 3646738,
        name: 'Caracas',
        lon: -66.8792,
        lat: 10.488,
        country: {
            id: 'Caracas',
            code: 'VE',
        },
    }
]

const selectRandom = (array) => {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
};

export const selectCity = () => {
    const city = selectRandom(cities);
    return city
}