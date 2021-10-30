
function handler() {
  return 'hello world!';
}

module.exports = {
  method: 'GET',
  path: '/last-message',
  handler,
};