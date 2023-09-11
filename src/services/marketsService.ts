import { markets, PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

interface User {
  id: number;
  name: string;
}

const markets: markets[] = []; // Simulated database

async function getAllMarkets(): Promise<markets[]> {
  return await prisma.markets.findMany({
    include: {
      region: true, // Assuming there's a "region" relation in your "markets" model
    },
  });
}

function createMarket(user: markets): void {
  markets.push(user);
}

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

  const danaIdamTokenUrl = process.env.DANA_IDAM_TOKEN_URL;

  try {
    const response = await axios.get(danaIdamTokenUrl);
    //console.log(response.data);
    return response.data;
  } catch (error) {
    //console.error('Error:', error);
    throw error;
  }
}

export { getAllMarkets, createMarket, sendDanaRequest, getDanaIdamToken };
