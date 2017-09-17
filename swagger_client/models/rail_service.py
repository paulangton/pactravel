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


class RailService(object):
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
        'destination_station_id': 'str',
        'services': 'list[str]'
    }

    attribute_map = {
        'destination_station_id': 'destination_station_id',
        'services': 'services'
    }

    def __init__(self, destination_station_id=None, services=None):
        """
        RailService - a model defined in Swagger
        """

        self._destination_station_id = None
        self._services = None

        self.destination_station_id = destination_station_id
        self.services = services

    @property
    def destination_station_id(self):
        """
        Gets the destination_station_id of this RailService.
        ID of the destination rail station.

        :return: The destination_station_id of this RailService.
        :rtype: str
        """
        return self._destination_station_id

    @destination_station_id.setter
    def destination_station_id(self, destination_station_id):
        """
        Sets the destination_station_id of this RailService.
        ID of the destination rail station.

        :param destination_station_id: The destination_station_id of this RailService.
        :type: str
        """
        if destination_station_id is None:
            raise ValueError("Invalid value for `destination_station_id`, must not be `None`")

        self._destination_station_id = destination_station_id

    @property
    def services(self):
        """
        Gets the services of this RailService.
        An array of departure times at which trains depart from the origin station to this destination station. Times are in the ISO 8601 YYYY-MM-DDTHH:mm format.

        :return: The services of this RailService.
        :rtype: list[str]
        """
        return self._services

    @services.setter
    def services(self, services):
        """
        Sets the services of this RailService.
        An array of departure times at which trains depart from the origin station to this destination station. Times are in the ISO 8601 YYYY-MM-DDTHH:mm format.

        :param services: The services of this RailService.
        :type: list[str]
        """
        if services is None:
            raise ValueError("Invalid value for `services`, must not be `None`")

        self._services = services

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
        if not isinstance(other, RailService):
            return False

        return self.__dict__ == other.__dict__

    def __ne__(self, other):
        """
        Returns true if both objects are not equal
        """
        return not self == other