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


class AffiliateSearchResponse(object):
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
        'meta': 'AffiliateSearchMeta',
        'results': 'list[AffiliateSearchResult]'
    }

    attribute_map = {
        'meta': 'meta',
        'results': 'results'
    }

    def __init__(self, meta=None, results=None):
        """
        AffiliateSearchResponse - a model defined in Swagger
        """

        self._meta = None
        self._results = None

        self.meta = meta
        if results is not None:
          self.results = results

    @property
    def meta(self):
        """
        Gets the meta of this AffiliateSearchResponse.
        Meta data about the results

        :return: The meta of this AffiliateSearchResponse.
        :rtype: AffiliateSearchMeta
        """
        return self._meta

    @meta.setter
    def meta(self, meta):
        """
        Sets the meta of this AffiliateSearchResponse.
        Meta data about the results

        :param meta: The meta of this AffiliateSearchResponse.
        :type: AffiliateSearchMeta
        """
        if meta is None:
            raise ValueError("Invalid value for `meta`, must not be `None`")

        self._meta = meta

    @property
    def results(self):
        """
        Gets the results of this AffiliateSearchResponse.

        :return: The results of this AffiliateSearchResponse.
        :rtype: list[AffiliateSearchResult]
        """
        return self._results

    @results.setter
    def results(self, results):
        """
        Sets the results of this AffiliateSearchResponse.

        :param results: The results of this AffiliateSearchResponse.
        :type: list[AffiliateSearchResult]
        """

        self._results = results

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
        if not isinstance(other, AffiliateSearchResponse):
            return False

        return self.__dict__ == other.__dict__

    def __ne__(self, other):
        """
        Returns true if both objects are not equal
        """
        return not self == other
