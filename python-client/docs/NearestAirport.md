# NearestAirport

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**airport** | **str** | The 3 letter IATA airport code of this given airport. You can use this as an input parameter for a low-fare flight search, to get more specific results than the city code, but inspiration search works best using the city code. | 
**airport_name** | **str** | The name of this airport, in UTF-8 format | 
**city** | **str** | The three letter &lt;a href&#x3D;\&quot;https://en.wikipedia.org/wiki/International_Air_Transport_Association_airport_code\&quot;&gt;IATA code&lt;/a&gt; of the city of the city in which this airport is located. | 
**city_name** | **str** | The English name of the city in which this airport is located | 
**state** | **str** | The state code of this city, if applicable | [optional] 
**distance** | **float** | The distance in km from the point specified in the query, to this location | 
**location** | [**Geolocation**](Geolocation.md) |   An object containing the longitude and latitude of the given airport. | 
**aircraft_movements** | **int** | The annual number of aircraft movements at that airport. | [optional] 
**timezone** | **str** | The &lt;a href&#x3D;\&quot;http://en.wikipedia.org/wiki/List_of_tz_database_time_zones\&quot;&gt;Olson format&lt;/a&gt; name of the timezone in which this airport is located | 

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


