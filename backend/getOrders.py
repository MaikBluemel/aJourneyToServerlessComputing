
import boto3
import json
import logging
import os
import order
from order import Order
from boto3.dynamodb.conditions import Key, Attr

tableName = os.environ['TABLE_NAME']
dynamo = boto3.resource('dynamodb')

logger = logging.getLogger()
logger.setLevel(logging.INFO)

def lambda_handler(event, context):
    logger.info(event)

    size = 10
    if 'size' in event.keys():
        size = event['size']

    status = ''
    if 'status' in event.keys():
        status = event['status']

    page = 0
    if 'page' in event.keys():
        page = event['page']

    sortKey = 'created_on'
    if 'sortKey' in event.keys():
        sortKey = event['sortKey']

    asc = True
    if 'asc' in event.keys():
        asc = event['asc'] == '1'

    return query_orders(status, page, size, sortKey, asc)


def query_orders(status, page, size, sortKey, asc):
    table = dynamo.Table(tableName)
    response = table.query(
        IndexName='statusIndex',
        KeyConditionExpression=Key('orderStatus').eq(status)
    )
    logging.info(response)
    items = response['Items']
    orders = []

    for item in items:
        orders.append(Order.from_json(item).to_item())

    logging.info(orders)

    return orders


