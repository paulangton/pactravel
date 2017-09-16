# TrainSearchSegment

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**departs_at** | **str** | The &lt;a href&#x3D;\&quot;https://en.wikipedia.org/wiki/ISO_8601\&quot;&gt;ISO 8601&lt;/a&gt; date-time of the train&#39;s departure in the local time zone of the departure station, in the format YYYY-MM-DDTHH:mm. | 
**arrives_at** | **str** | The &lt;a href&#x3D;\&quot;https://en.wikipedia.org/wiki/ISO_8601\&quot;&gt;ISO 8601&lt;/a&gt; date-time of the train&#39;s arrival in the local time zone of the arrival station, in the format YYYY-MM-DDTHH:mm. | 
**departure_station** | [**Station**](Station.md) | The station object representing the station at which the passenger should board this train in order to complete this part of the itinerary. | 
**arrival_station** | [**Airport**](Airport.md) | The station object representing the station at which the passenger should disembark this train in order to complete this part of the itinerary. | 
**marketing_company** | **str** | The name of the train company selling this train journey. This is the name you should see printed on your ticket. | 
**operating_company** | **str** | The name of the train company operating this train journey. This is the name you should see written on the train. | 
**train_number** | **str** | The identifying number of this train service. Usually the marketing company will only operate on train per day with this train number. | 
**train_type** | **str** | The type of train that you may expect for this journey. For example&amp;colon; InterCity, Regional... | [optional] 
**prices** | [**list[TrainSearchPricing]**](TrainSearchPricing.md) | Possible pricing for this train journey. | 

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


