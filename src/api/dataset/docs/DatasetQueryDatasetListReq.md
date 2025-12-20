# DatasetQueryDatasetListReq


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**pageSize** | **number** |  | [optional] [default to undefined]
**datasetId** | **string** |  | [optional] [default to undefined]
**status** | [**Array&lt;DatasetStatus&gt;**](DatasetStatus.md) |  | [optional] [default to undefined]
**startTime** | **string** |  | [optional] [default to undefined]
**endTime** | **string** |  | [optional] [default to undefined]
**nextCursor** | **string** |  | [optional] [default to undefined]
**opUser** | **string** |  | [optional] [default to undefined]

## Example

```typescript
import { DatasetQueryDatasetListReq } from './api';

const instance: DatasetQueryDatasetListReq = {
    pageSize,
    datasetId,
    status,
    startTime,
    endTime,
    nextCursor,
    opUser,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
