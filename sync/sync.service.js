const { XMLParser } = require('fast-xml-parser');

const parser = new XMLParser();

module.exports = {
  getHostAndPath: (url) => {
    const { protocol, hostname, pathname, search } = new URL(url);
    return { protocol: protocol.slice(0, -1), hostname, path: pathname + search };
  },
  getXmlData: ({ protocol, hostname, path }, headers = {}) => {
    const options = {
      method: 'GET',
      hostname,
      path,
      headers,
      maxRedirects: 20,
    };
    return new Promise((resolve, reject) => {
      const req = require(protocol).request(options, function (res) {
        const chunks = [];

        res.on('data', function (chunk) {
          chunks.push(chunk);
        });

        res.on('end', function () {
          const body = Buffer.concat(chunks);
          resolve(body.toString());
        });

        res.on('error', function (error) {
          reject(error);
        });
      });

      req.end();
    });
  },
  fetchXmlToJson: async function (url) {
    const urlObject = this.getHostAndPath(url);
    const xmlData = await this.getXmlData(urlObject);
    return parser.parse(xmlData).Response;
  },
};
