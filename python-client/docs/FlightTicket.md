# FlightTicket

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **str** | Uniquely identifies this ticket in this travel record. This ID is persistent, and remains the same for the lifetime of the travel record. | 
**price** | [**Amount**](Amount.md) | The cost of this ticket. | 
**traveler_ids** | **list[str]** | Traveler identifiers to indicate the travelers to whom this ticket applies. | 
**flight_bounds** | [**list[FlightReservationBound]**](FlightReservationBound.md) | The flight itinerary for this ticket. | 

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


