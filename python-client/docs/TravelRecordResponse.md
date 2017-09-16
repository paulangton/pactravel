# TravelRecordResponse

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**record_locator** | **str** | 6 character identifier of this travel record on the Amadeus system. | 
**header** | [**TravelRecordHeader**](TravelRecordHeader.md) | Summarized metadata on the record that has been retrieved. | [optional] 
**messages** | [**list[Message]**](Message.md) | Functional or technical messages associated with the retrieval of this travel record. | [optional] 
**travelers** | [**list[Traveler]**](Traveler.md) | Information about each traveler who may be included as part of this travel record. | [optional] 
**reservation** | [**Reservation**](Reservation.md) | Details about the itineraries that have been reserved as part of this travel record. | [optional] 

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


