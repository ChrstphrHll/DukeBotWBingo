const prod = {url:  'https://chrstphrhll.github.io'};
const dev = {url: 'http://localhost:3000'};
const config = process.env.NODE_ENV === 'development' ? dev : prod;
export default config