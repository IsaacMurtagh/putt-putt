const glob = require('glob');
const logger = require('./logger');

module.exports = {
  server: {
    port: '3000',
    routes: {
      cors: {
        origin: [ '*' ],
      }
    }
  },
  register: {
    plugins: [
      {
        plugin: {
          register(server) {
            glob.sync('**/*.route.js', { cwd: __dirname })
            .map(path => {
              const route = require(`./${path}`);
              logger.log(`Registered: ${route.method} ${route.path}`);
              server.route(route);
            });
          },
          name: 'routes'
        }
      }
    ]
  }
};