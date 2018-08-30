import logging
import boto3
import os
from order import Order
from datetime import datetime

tableName =  os.environ['TABLE_NAME']
dynamo = boto3.resource('dynamodb')

logger = logging.getLogger()
logger.setLevel(logging.INFO)

def lambda_handler(event, context):
    logger.info(event)
    update_order(event)



def update_order(eventBody):
    order_data = eventBody

    order_id = ''
    if 'orderID' in order_data.keys():
        order_id = order_data['orderID']

    new_status = ''
    if 'status' in order_data.keys():
        new_status = order_data['status']

    finished_on = ''
    if new_status == Order.STATUS_DONE:
        finished_on = str(datetime.now())

    logger.info('OrderID: ' + order_id + ' status:' + new_status )

    update_order_in_dynamo(order_id, new_status, finished_on)



def update_order_in_dynamo(order_id, order_status, finished_on):

    table = dynamo.Table(tableName)

    response = table.update_item(
        Key={'orderID': order_id},
        UpdateExpression='set orderStatus = :newStatus',
        ExpressionAttributeValues={
            ':newStatus': order_status
        },
        ReturnValues='ALL_NEW'
    )
    logger.info(response)