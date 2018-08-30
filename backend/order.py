import uuid
import json
import decimal

class Order:

    STATUS_NEW = 'NEW'
    STATUS_IN_PROCESS = 'IN_PROCESS'
    STATUS_DONE = 'DONE'

    def __init__(self, order_id, name, phone, offers, status, created_on, finished_on):
        self.order_id = order_id
        self.name = name
        self.phone = phone
        self.offers = offers
        self.order_status = status
        self.created_on = created_on
        self.finished_on = finished_on

    def __buildDict(self):
        data =  {
                'orderID': self.order_id,
                'name': self.name,
                'phone': self.phone,
                'orderStatus': self.order_status,
                'offers': self.offers
                }

        if self.created_on is not None and len(self.created_on) > 0:
            data['created_on'] = self.created_on

        if self.finished_on is not None and len(self.finished_on) > 0:
            data['finished_on'] = self.finished_on

        return data

    def to_item(self):
        return self.__buildDict()

    @staticmethod
    def from_json(jsonObj):
        name = ''
        if 'name' in jsonObj.keys():
            name = jsonObj['name']

        orderID = ''
        if 'orderID' in jsonObj.keys():
            orderID = jsonObj['orderID']

        phone = ''
        if 'phone' in jsonObj.keys():
            phone = jsonObj['phone']

        status = ''
        if 'orderStatus' in jsonObj.keys():
            status = jsonObj['orderStatus']

        offers = []
        if 'offers' in jsonObj.keys():
            offers = jsonObj['offers']
            # for offer in offers:
            #     if 'amount' in offer.keys():
            #         if isinstance(offer['amount'], decimal.Decimal):
            #             offer['amount'] = str(offer['amount'])

        created_on = ''
        if 'created_on' in jsonObj.keys():
            created_on = jsonObj['created_on']

        finished_on = ''
        if 'finished_on' in jsonObj.keys():
            finished_on = jsonObj['finished_on']

        return Order(orderID, name, phone, offers, status, created_on, finished_on)





def createOrderNum():
    return uuid.uuid4().hex
