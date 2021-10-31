const Glue = require('@hapi/glue');

const manifest = require('./manifest');

const options = {
    relativeTo: __dirname,
};

const init = async () => {

    const server = await Glue.compose(manifest, options);
    await server.start();
    return `Server started on ${server.info.uri}`;
};

init()
  .then(console.log)
  .catch(console.error);