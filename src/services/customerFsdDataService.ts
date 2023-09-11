import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

function sendDanaRequest(schemaID: string, danaToken: string, data: any): void {
  const axios = require('axios');

  const url = 'https://analytics-pp.metrosystems.net/ingest/DE/' + schemaID;
  const headers = {
    accept: 'application/vnd.metro.dana.event',
    Authorization: 'Bearer ' + danaToken,
    'Content-Type': 'application/json',
  };
  // Send the POST request
  axios
    .post(url, data, { headers })
    .then((response) => {
      console.log('Response:', response.data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

async function getDanaIdamToken() {
  const axios = require('axios');

  const url = 'https://api-pp.metro.de/idamaccesstoken/token/with_realm/DANA_REALM';

  try {
    const response = await axios.get(url);
    //console.log(response.data);
    return response.data;
  } catch (error) {
    //console.error('Error:', error);
    throw error;
  }
}

export { sendDanaRequest, getDanaIdamToken };
