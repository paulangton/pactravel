# HotelReservation

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **str** | Uniquely identifies this hotel room reservation in this travel record. This ID is persistent, and remains the same for the lifetime of the travel record. | 
**check_in** | **date** | Date on which the guest will begin their stay in the hotel, in the &lt;a href&#x3D;\&quot;https://en.wikipedia.org/wiki/ISO_8601\&quot;&gt;ISO 8601&lt;/a&gt; date format yyyy-MM-dd. | 
**check_out** | **date** | Date on which the guest will end their stay in the hotel, in the &lt;a href&#x3D;\&quot;https://en.wikipedia.org/wiki/ISO_8601\&quot;&gt;ISO 8601&lt;/a&gt; date format yyyy-MM-dd. | 
**property_code** | **str** | The 8 character property code of this given hotel. The first 2 characters of this code are the chain code that can be specified in the input. The remaining elements are proprietary to each hotel chain. | 
**property_name** | **str** | The name of this hotel. | 
**total_price** | [**Amount**](Amount.md) | The total price of this stay, from the given check in date to the given check out date. | [optional] 
**traveler_ids** | **list[str]** | Traveler identifiers to indicate the travelers to whom this hotel room reservation applies. Generally all non-infant room occupants will be marked in this array. | 
**booking_info** | [**HotelReservationBookingInfo**](HotelReservationBookingInfo.md) | Additional details and status of this hotel room reservation. | 

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


