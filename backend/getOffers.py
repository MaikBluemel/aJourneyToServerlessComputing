from __future__ import print_function

import boto3
import os
import json
import logging

print('Loading function')
dynamo = boto3.client('dynamodb')
tableName =  'offers'

logger = logging.getLogger()
logger.setLevel(logging.INFO)

def lambda_handler(event, context):
    logger.info(event)
    return dynamo.scan(TableName=tableName)