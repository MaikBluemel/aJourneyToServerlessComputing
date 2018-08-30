import logging
import boto3
import os
import order
from order import Order
from datetime import datetime

tableName =  os.environ['TABLE_NAME']
dynamo = boto3.resource('dynamodb')

logger = logging.getLogger()
logger.setLevel(logging.INFO)

def lambda_handler(event, context):
    eventBody = event['body']
    logger.info(eventBody)
    create_order(eventBody)



def create_order(eventBody):
    order_data = eventBody

    customer_data = order_data['customer']
    customer_name = customer_data['name']
    customer_phone = customer_data['phone']

    order_items = order_data['shoppingCard']
    clean_order_items(order_items)

    order_obj = Order(order.createOrderNum(), customer_name, customer_phone, order_items, Order.STATUS_NEW, str(datetime.now()), None)
    write_order_to_dynamo(order_obj)


def clean_order_items(order_items):
    for orderItem in order_items:
        orderItem['offer'].pop('price', None)


def write_order_to_dynamo(order_obj):

    table = dynamo.Table(tableName)
    order_obj_item = order_obj.to_item()
    logger.info(order_obj_item)

    response = table.put_item(
        Item=order_obj_item
    )
    logger.info(response)


