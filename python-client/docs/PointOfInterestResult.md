# PointOfInterestResult

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**title** | **str** | Display name of a given point of interest | 
**main_image** | **str** | A link to an image of the given location | 
**location** | [**Geolocation**](Geolocation.md) |  | 
**grades** | [**PointOfInterestResultGrades**](PointOfInterestResultGrades.md) |  | [optional] 
**categories** | **list[str]** | Array of descriptions indicating what type of point of interest this is. You can filter the results to include only certain categories of point of interest using the category input parameter. | 
**details** | [**PointOfInterestDetails**](PointOfInterestDetails.md) |  | [optional] 
**contextual_images** | [**list[ImageSize]**](ImageSize.md) | Images taken at this point of interest. Note that these images might have nothing to do with the point itself, particularly if you have enabled the social_media parameter | [optional] 
**geoname_id** | **int** | The GeonamesID of this point of interest, if available | [optional] 
**walk_time** | **float** | Time in minutes that it takes to walk from the searched coordinates to this Point of Interest | [optional] 

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


