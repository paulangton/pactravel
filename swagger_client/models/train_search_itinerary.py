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


class TrainSearchItinerary(object):
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
        'trains': 'list[TrainSearchSegment]'
    }

    attribute_map = {
        'trains': 'trains'
    }

    def __init__(self, trains=None):
        """
        TrainSearchItinerary - a model defined in Swagger
        """

        self._trains = None

        self.trains = trains

    @property
    def trains(self):
        """
        Gets the trains of this TrainSearchItinerary.
        The array of trains that will be required to complete the given itinerary. Since the cache currently only contains direct itineraries, there will be only one object in this array.

        :return: The trains of this TrainSearchItinerary.
        :rtype: list[TrainSearchSegment]
        """
        return self._trains

    @trains.setter
    def trains(self, trains):
        """
        Sets the trains of this TrainSearchItinerary.
        The array of trains that will be required to complete the given itinerary. Since the cache currently only contains direct itineraries, there will be only one object in this array.

        :param trains: The trains of this TrainSearchItinerary.
        :type: list[TrainSearchSegment]
        """
        if trains is None:
            raise ValueError("Invalid value for `trains`, must not be `None`")

        self._trains = trains

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
        if not isinstance(other, TrainSearchItinerary):
            return False

        return self.__dict__ == other.__dict__

    def __ne__(self, other):
        """
        Returns true if both objects are not equal
        """
        return not self == other