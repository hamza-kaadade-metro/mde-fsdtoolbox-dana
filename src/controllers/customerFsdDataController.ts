import { PrismaClient } from '@prisma/client';
import { Body, Controller, Post, Route, Tags } from 'tsoa';
import { getDanaIdamToken, sendDanaRequest } from '../services/marketsService'; // Adjust the path as needed

const prisma = new PrismaClient();
type CustomerFsdData = {
  store_key?: number;
  cust_no?: string;
  fulfillment_type_cd?: string;
  fulfillment_type_date?: number;
  single_invoice?: boolean;
  expected_order_income_type_cd?: number;
  expected_call_time?: string;
  internalcomment?: string;
  generalpickingcomment?: string;
  generaldeliverycomment?: string;
  generalinvoicecomment?: string;
  no_item_replacement_ind?: boolean;
  primarydeliverystore?: number;
  delivery_aggreement_cd?: string;
  delivery_aggreement_info?: string;
  ispaperinvoicecustomer?: boolean;
  minimal_order_value?: number;
  order_lead_time?: number;
  fulfillment_type_break_ind?: boolean;
  fulfillment_type_break_date?: number;
  channelstore?: number;
  expected_payment_type_cd?: string;
  payment_type_reason?: string;
  fsd_potential_prepartion_ind?: boolean;
  fsd_potential_prepartion_date?: string;
  expected_first_delivery_date?: number;
  no_fsd_option_ind?: boolean;
  no_fsd_option_reason?: string;
  deposit_handling_ind?: boolean;
  customer_door_key?: string;
  customer_tg_type?: string;
  expected_order_income_reason?: string;
  nostopping?: boolean;
  further_details_required?: boolean;
  feedback_fsd_delivery_team?: boolean;
  no_special_handling_needed_ind?: boolean;
};
@Tags('Demo')
@Route('demo')
export class CustomerFsdDataController extends Controller {
  @Post('customerFsdData')
  public async add(@Body() body: CustomerFsdData) {
    const DanaSchemaID = process.env.DATABASE_URL;
    try {
      const token = await getDanaIdamToken();

      await sendDanaRequest(DanaSchemaID, token, body);
      return 'saved';
    } catch (error) {
      console.error('Error:', error);
      return 'error'; // return an error message
    }
  }
}
