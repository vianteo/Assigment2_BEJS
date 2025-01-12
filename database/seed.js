const User = require('./user');
const Movie = require('./movie');
const { sequelize } = require('./database');
const bcrypt = require('bcrypt');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });
    await User.bulkCreate([
        { username: 'johndoe', email: 'johndoe@example.com', password: await bcrypt.hash('password123', 10), role: 'admin', address: '123 Street', phoneNumber: '08123456789' },
        { username: 'janedoe', email: 'janedoe@example.com', password: await bcrypt.hash('password123', 10), role: 'user', address: '456 Avenue', phoneNumber: '08123456788' }
    ]);

    await Movie.bulkCreate([
        { title: 'Inception', synopsis: 'A mind-bending thriller', trailerUrl: 'https://trailer.link/inception', imgUrl: 'https://img.link/inception.jpg', rating: 8.8, status: 'Available' },
        { title: 'The Matrix', synopsis: 'A sci-fi classic', trailerUrl: 'https://trailer.link/matrix', imgUrl: 'https://img.link/matrix.jpg', rating: 8.7, status: 'Available' }
    ]);
};

module.exports = seedDatabase;
