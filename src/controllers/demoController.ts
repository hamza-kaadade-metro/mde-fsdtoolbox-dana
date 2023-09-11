import { PrismaClient } from '@prisma/client';
import { Body, Controller, Get, Post, Route, Tags } from 'tsoa';
import { getAllMarkets, sendDanaRequest } from '../services/marketsService'; // Adjust the path as needed

const prisma = new PrismaClient();
type bodyTest = {
  b: number;
};
@Tags('Demo')
@Route('demo')
export class DemoController extends Controller {
  @Get('markets')
  public async getMarkets() {
    const users = getAllMarkets();
    return users;
  }
  @Get('regions')
  public async getRegions() {
    const users = await prisma.regions.findMany({
      include: {
        markets: true,
      },
    });
    return users;
  }
  //post to create a new market
  @Post('market')
  public async handlePost7(@Body() b: number) {
    return '';
  }
  @Post('marketToDana')
  public async addMarket(@Body() b: bodyTest) {
    const data = {
      bkz: 720,
      regions: { id: 7 },
    };
    try {
      //const token = await getDanaIdamToken();
      const token =
        'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IktfMzc5YmNhNDAtYWQ2OS0xMWVhLWIwZGUtZjJiYjAzZTJmYzMzIn0.eyJpYXQiOjE2OTQwODU0MzQsInVzZXJUeXBlIjoiQ0xJRU5UIiwiaXNzIjoiaHR0cHM6Ly9pZGFtLXBwLm1ldHJvLmRlIiwiZXhwIjoxNjk0MDg5MDM0LCJhdXRob3JpemF0aW9uIjpbeyJEQU5BX1NDSEVNQV9SRVBPX1JFQUQiOlt7ImNvdW50cnkiOlsiREUiXSwib3duZXIiOlsiREFOQSJdfV19LHsiREFOQV9TQ0hFTUFfUkVQT19XUklURSI6W3siY291bnRyeSI6WyJERSJdLCJvd25lciI6WyJEQU5BIl19XX1dLCJzdWIiOiJERV9NQ0NfTE9DQUwiLCJyZWFsbSI6IkRBTkFfUkVBTE0ifQ.AFVHOupxGMUNnx_zPyQbw-HAYNibgHcvLD2eQBf5RHr_60fmPUkDsMoSXqPQNlbBusZuxeM4rizKw7UUKxO1cYQEy9bTQFRY8MqWZ6kTxp3Q7aPAb4m0hGt5fOAegLmG-nap7q_m_cmMYw4KvQYHgnrrNwPKNlwYHzB00AC2IbOpQrbj2luVlcenPPakyiOn8HAN2b40_o07tqqMzCwjavA2P0ZfiLx_5ggl3mVSZX-wVJFfVPxi7YvyUGTPoqlcI0evOWjtzBuALhYpLNjgWShzEr1EUYx_OBZTcYUZSWOoY0cmM3KuzPg37KBBkellikhC7Btd_4yQiAKYKOQePTrxMNJc704';
      await sendDanaRequest('c179be600c8f425d7628af1ac71165fa', token, data);
      return 'saved';
    } catch (error) {
      console.error('Error:', error);
      return 'error'; // return an error message
    }
  }
}
