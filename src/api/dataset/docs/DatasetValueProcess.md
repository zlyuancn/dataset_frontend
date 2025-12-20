# DatasetValueProcess


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**delim** | **string** |  | [optional] [default to undefined]
**trimSpace** | **boolean** | 修剪空字符. 包括 \&#39;\\t\&#39;, \&#39;\\n\&#39;, \&#39;\\v\&#39;, \&#39;\\f\&#39;, \&#39;\\r\&#39;, \&#39; \&#39;, U+0085 (NEL), U+00A0 (NBSP). | [optional] [default to undefined]
**trimPrefix** | **string** |  | [optional] [default to undefined]
**trimSuffix** | **string** |  | [optional] [default to undefined]
**filterSubString** | **string** |  | [optional] [default to undefined]
**filterPrefix** | **string** |  | [optional] [default to undefined]
**filterSuffix** | **string** |  | [optional] [default to undefined]

## Example

```typescript
import { DatasetValueProcess } from './api';

const instance: DatasetValueProcess = {
    delim,
    trimSpace,
    trimPrefix,
    trimSuffix,
    filterSubString,
    filterPrefix,
    filterSuffix,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
