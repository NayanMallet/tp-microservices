const proxy = require('./proxy');

module.exports = (app) => {
    // Toutes les requêtes débutant par /api passent par le proxy
    app.use('/api', proxy);
};
