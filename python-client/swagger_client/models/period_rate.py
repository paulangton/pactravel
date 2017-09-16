# coding: utf-8

"""
    Amadeus Travel Innovation Sandbox

    No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)

    OpenAPI spec version: 1.2
    
    Generated by: https://github.com/swagger-api/swagger-codegen.git
"""


from pprint import pformat
from six import iteritems
import re


class PeriodRate(object):
    """
    NOTE: This class is auto generated by the swagger code generator program.
    Do not edit the class manually.
    """


    """
    Attributes:
      swagger_types (dict): The key is attribute name
                            and the value is attribute type.
      attribute_map (dict): The key is attribute name
                            and the value is json key in definition.
    """
    swagger_types = {
        'start_date': 'date',
        'end_date': 'date',
        'currency': 'str',
        'price': 'float'
    }

    attribute_map = {
        'start_date': 'start_date',
        'end_date': 'end_date',
        'currency': 'currency',
        'price': 'price'
    }

    def __init__(self, start_date=None, end_date=None, currency=None, price=None):
        """
        PeriodRate - a model defined in Swagger
        """

        self._start_date = None
        self._end_date = None
        self._currency = None
        self._price = None

        self.start_date = start_date
        self.end_date = end_date
        self.currency = currency
        self.price = price

    @property
    def start_date(self):
        """
        Gets the start_date of this PeriodRate.
        The start date of this rate, in <a href=\"https://en.wikipedia.org/wiki/ISO_8601\">ISO 8601</a> date format yyyy-MM-dd.

        :return: The start_date of this PeriodRate.
        :rtype: date
        """
        return self._start_date

    @start_date.setter
    def start_date(self, start_date):
        """
        Sets the start_date of this PeriodRate.
        The start date of this rate, in <a href=\"https://en.wikipedia.org/wiki/ISO_8601\">ISO 8601</a> date format yyyy-MM-dd.

        :param start_date: The start_date of this PeriodRate.
        :type: date
        """
        if start_date is None:
            raise ValueError("Invalid value for `start_date`, must not be `None`")

        self._start_date = start_date

    @property
    def end_date(self):
        """
        Gets the end_date of this PeriodRate.
        The date on which this rate ends, in <a href=\"https://en.wikipedia.org/wiki/ISO_8601\">ISO 8601</a> date format yyyy-MM-dd.

        :return: The end_date of this PeriodRate.
        :rtype: date
        """
        return self._end_date

    @end_date.setter
    def end_date(self, end_date):
        """
        Sets the end_date of this PeriodRate.
        The date on which this rate ends, in <a href=\"https://en.wikipedia.org/wiki/ISO_8601\">ISO 8601</a> date format yyyy-MM-dd.

        :param end_date: The end_date of this PeriodRate.
        :type: date
        """
        if end_date is None:
            raise ValueError("Invalid value for `end_date`, must not be `None`")

        self._end_date = end_date

    @property
    def currency(self):
        """
        Gets the currency of this PeriodRate.
        <a href=\"http://en.wikipedia.org/wiki/ISO_4217\">ISO 4217</a> currency code of this rate.

        :return: The currency of this PeriodRate.
        :rtype: str
        """
        return self._currency

    @currency.setter
    def currency(self, currency):
        """
        Sets the currency of this PeriodRate.
        <a href=\"http://en.wikipedia.org/wiki/ISO_4217\">ISO 4217</a> currency code of this rate.

        :param currency: The currency of this PeriodRate.
        :type: str
        """
        if currency is None:
            raise ValueError("Invalid value for `currency`, must not be `None`")

        self._currency = currency

    @property
    def price(self):
        """
        Gets the price of this PeriodRate.
        Total amount in the given currency per day of this rate, formatted appropriately. For example&colon; 194.99.

        :return: The price of this PeriodRate.
        :rtype: float
        """
        return self._price

    @price.setter
    def price(self, price):
        """
        Sets the price of this PeriodRate.
        Total amount in the given currency per day of this rate, formatted appropriately. For example&colon; 194.99.

        :param price: The price of this PeriodRate.
        :type: float
        """
        if price is None:
            raise ValueError("Invalid value for `price`, must not be `None`")

        self._price = price

    def to_dict(self):
        """
        Returns the model properties as a dict
        """
        result = {}

        for attr, _ in iteritems(self.swagger_types):
            value = getattr(self, attr)
            if isinstance(value, list):
                result[attr] = list(map(
                    lambda x: x.to_dict() if hasattr(x, "to_dict") else x,
                    value
                ))
            elif hasattr(value, "to_dict"):
                result[attr] = value.to_dict()
            elif isinstance(value, dict):
                result[attr] = dict(map(
                    lambda item: (item[0], item[1].to_dict())
                    if hasattr(item[1], "to_dict") else item,
                    value.items()
                ))
            else:
                result[attr] = value

        return result

    def to_str(self):
        """
        Returns the string representation of the model
        """
        return pformat(self.to_dict())

    def __repr__(self):
        """
        For `print` and `pprint`
        """
        return self.to_str()

    def __eq__(self, other):
        """
        Returns true if both objects are equal
        """
        if not isinstance(other, PeriodRate):
            return False

        return self.__dict__ == other.__dict__

    def __ne__(self, other):
        """
        Returns true if both objects are not equal
        """
        return not self == other