# DatasetServiceApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**datasetServiceAdminAddDataset**](#datasetserviceadminadddataset) | **POST** /Dataset/AdminAddDataset | 添加数据集|
|[**datasetServiceAdminDelDataset**](#datasetserviceadmindeldataset) | **POST** /Dataset/AdminDelDataset | 删除数据集. 数据集处理过程中必须先停止才能删除|
|[**datasetServiceAdminRunProcessDataset**](#datasetserviceadminrunprocessdataset) | **POST** /Dataset/AdminRunProcessDataset | 启动处理|
|[**datasetServiceAdminStopProcessDataset**](#datasetserviceadminstopprocessdataset) | **POST** /Dataset/AdminStopProcessDataset | 停止处理|
|[**datasetServiceAdminUpdateDataset**](#datasetserviceadminupdatedataset) | **POST** /Dataset/AdminUpdateDataset | 修改数据集. 只有\&quot;已创建\&quot;状态才会修改 datasetExtend|
|[**datasetServiceQueryDatasetData**](#datasetservicequerydatasetdata) | **POST** /Dataset/QueryDatasetData | 查询数据|
|[**datasetServiceQueryDatasetInfo**](#datasetservicequerydatasetinfo) | **POST** /Dataset/QueryDatasetInfo | 查询数据集基本信息|
|[**datasetServiceQueryDatasetList**](#datasetservicequerydatasetlist) | **POST** /Dataset/QueryDatasetList | 查询数据集列表|
|[**datasetServiceQueryDatasetStatusInfo**](#datasetservicequerydatasetstatusinfo) | **POST** /Dataset/QueryDatasetStatusInfo | 查询数据集信息, 用于获取处理中的数据集的变化数据|
|[**datasetServiceSearchDatasetName**](#datasetservicesearchdatasetname) | **POST** /Dataset/SearchDatasetName | 搜索数据集名|

# **datasetServiceAdminAddDataset**
> DatasetAdminAddDatasetRsp datasetServiceAdminAddDataset(body)


### Example

```typescript
import {
    DatasetServiceApi,
    Configuration,
    DatasetAdminAddDatasetReq
} from './api';

const configuration = new Configuration();
const apiInstance = new DatasetServiceApi(configuration);

let body: DatasetAdminAddDatasetReq; //

const { status, data } = await apiInstance.datasetServiceAdminAddDataset(
    body
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **body** | **DatasetAdminAddDatasetReq**|  | |


### Return type

**DatasetAdminAddDatasetRsp**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | A successful response. |  -  |
|**0** | An unexpected error response. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **datasetServiceAdminDelDataset**
> object datasetServiceAdminDelDataset(body)


### Example

```typescript
import {
    DatasetServiceApi,
    Configuration,
    DatasetAdminDelDatasetReq
} from './api';

const configuration = new Configuration();
const apiInstance = new DatasetServiceApi(configuration);

let body: DatasetAdminDelDatasetReq; //

const { status, data } = await apiInstance.datasetServiceAdminDelDataset(
    body
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **body** | **DatasetAdminDelDatasetReq**|  | |


### Return type

**object**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | A successful response. |  -  |
|**0** | An unexpected error response. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **datasetServiceAdminRunProcessDataset**
> object datasetServiceAdminRunProcessDataset(body)


### Example

```typescript
import {
    DatasetServiceApi,
    Configuration,
    DatasetAdminRunProcessDatasetReq
} from './api';

const configuration = new Configuration();
const apiInstance = new DatasetServiceApi(configuration);

let body: DatasetAdminRunProcessDatasetReq; //

const { status, data } = await apiInstance.datasetServiceAdminRunProcessDataset(
    body
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **body** | **DatasetAdminRunProcessDatasetReq**|  | |


### Return type

**object**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | A successful response. |  -  |
|**0** | An unexpected error response. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **datasetServiceAdminStopProcessDataset**
> object datasetServiceAdminStopProcessDataset(body)


### Example

```typescript
import {
    DatasetServiceApi,
    Configuration,
    DatasetAdminStopProcessDatasetReq
} from './api';

const configuration = new Configuration();
const apiInstance = new DatasetServiceApi(configuration);

let body: DatasetAdminStopProcessDatasetReq; //

const { status, data } = await apiInstance.datasetServiceAdminStopProcessDataset(
    body
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **body** | **DatasetAdminStopProcessDatasetReq**|  | |


### Return type

**object**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | A successful response. |  -  |
|**0** | An unexpected error response. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **datasetServiceAdminUpdateDataset**
> object datasetServiceAdminUpdateDataset(body)


### Example

```typescript
import {
    DatasetServiceApi,
    Configuration,
    DatasetAdminUpdateDatasetReq
} from './api';

const configuration = new Configuration();
const apiInstance = new DatasetServiceApi(configuration);

let body: DatasetAdminUpdateDatasetReq; //

const { status, data } = await apiInstance.datasetServiceAdminUpdateDataset(
    body
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **body** | **DatasetAdminUpdateDatasetReq**|  | |


### Return type

**object**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | A successful response. |  -  |
|**0** | An unexpected error response. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **datasetServiceQueryDatasetData**
> DatasetQueryDatasetDataRsp datasetServiceQueryDatasetData(body)


### Example

```typescript
import {
    DatasetServiceApi,
    Configuration,
    DatasetQueryDatasetDataReq
} from './api';

const configuration = new Configuration();
const apiInstance = new DatasetServiceApi(configuration);

let body: DatasetQueryDatasetDataReq; //

const { status, data } = await apiInstance.datasetServiceQueryDatasetData(
    body
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **body** | **DatasetQueryDatasetDataReq**|  | |


### Return type

**DatasetQueryDatasetDataRsp**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | A successful response. |  -  |
|**0** | An unexpected error response. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **datasetServiceQueryDatasetInfo**
> DatasetQueryDatasetInfoRsp datasetServiceQueryDatasetInfo(body)


### Example

```typescript
import {
    DatasetServiceApi,
    Configuration,
    DatasetQueryDatasetInfoReq
} from './api';

const configuration = new Configuration();
const apiInstance = new DatasetServiceApi(configuration);

let body: DatasetQueryDatasetInfoReq; //

const { status, data } = await apiInstance.datasetServiceQueryDatasetInfo(
    body
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **body** | **DatasetQueryDatasetInfoReq**|  | |


### Return type

**DatasetQueryDatasetInfoRsp**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | A successful response. |  -  |
|**0** | An unexpected error response. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **datasetServiceQueryDatasetList**
> DatasetQueryDatasetListRsp datasetServiceQueryDatasetList(body)


### Example

```typescript
import {
    DatasetServiceApi,
    Configuration,
    DatasetQueryDatasetListReq
} from './api';

const configuration = new Configuration();
const apiInstance = new DatasetServiceApi(configuration);

let body: DatasetQueryDatasetListReq; //

const { status, data } = await apiInstance.datasetServiceQueryDatasetList(
    body
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **body** | **DatasetQueryDatasetListReq**|  | |


### Return type

**DatasetQueryDatasetListRsp**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | A successful response. |  -  |
|**0** | An unexpected error response. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **datasetServiceQueryDatasetStatusInfo**
> DatasetQueryDatasetStatusInfoRsp datasetServiceQueryDatasetStatusInfo(body)


### Example

```typescript
import {
    DatasetServiceApi,
    Configuration,
    DatasetQueryDatasetStatusInfoReq
} from './api';

const configuration = new Configuration();
const apiInstance = new DatasetServiceApi(configuration);

let body: DatasetQueryDatasetStatusInfoReq; //

const { status, data } = await apiInstance.datasetServiceQueryDatasetStatusInfo(
    body
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **body** | **DatasetQueryDatasetStatusInfoReq**|  | |


### Return type

**DatasetQueryDatasetStatusInfoRsp**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | A successful response. |  -  |
|**0** | An unexpected error response. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **datasetServiceSearchDatasetName**
> DatasetSearchDatasetNameRsp datasetServiceSearchDatasetName(body)


### Example

```typescript
import {
    DatasetServiceApi,
    Configuration,
    DatasetSearchDatasetNameReq
} from './api';

const configuration = new Configuration();
const apiInstance = new DatasetServiceApi(configuration);

let body: DatasetSearchDatasetNameReq; //

const { status, data } = await apiInstance.datasetServiceSearchDatasetName(
    body
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **body** | **DatasetSearchDatasetNameReq**|  | |


### Return type

**DatasetSearchDatasetNameRsp**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | A successful response. |  -  |
|**0** | An unexpected error response. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

