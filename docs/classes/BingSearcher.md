[**@isdk/bing-searcher**](../README.md)

***

[@isdk/bing-searcher](../globals.md) / BingSearcher

# Class: BingSearcher

Defined in: [bing-searcher/src/bing.ts:10](https://github.com/isdk/bing-searcher.js/blob/548f8cac0d7920cfedf80842d2ae53ce44f79cca/src/bing.ts#L10)

## Extends

- `WebSearcher`

## Constructors

### Constructor

> **new BingSearcher**(`options?`): `BingSearcher`

Defined in: web-fetcher/dist/index.d.ts:1171

Creates a new FetchSession.

#### Parameters

##### options?

`FetcherOptions`

Configuration options for the fetcher.

#### Returns

`BingSearcher`

#### Inherited from

`WebSearcher.constructor`

## Properties

### closed

> `protected` **closed**: `boolean`

Defined in: web-fetcher/dist/index.d.ts:1165

#### Inherited from

`WebSearcher.closed`

***

### context

> `readonly` **context**: `FetchContext`

Defined in: web-fetcher/dist/index.d.ts:1164

The execution context for this session, containing configurations, event bus, and shared state.

#### Inherited from

`WebSearcher.context`

***

### id

> `readonly` **id**: `string`

Defined in: web-fetcher/dist/index.d.ts:1160

Unique identifier for the session.

#### Inherited from

`WebSearcher.id`

***

### options

> `protected` **options**: `FetcherOptions`

Defined in: web-fetcher/dist/index.d.ts:1156

#### Inherited from

`WebSearcher.options`

***

### \_isFactory

> `static` **\_isFactory**: `boolean`

Defined in: web-searcher/dist/index.d.ts:350

#### Inherited from

`WebSearcher._isFactory`

***

### alias

> `static` **alias**: `string`[]

Defined in: [bing-searcher/src/bing.ts:12](https://github.com/isdk/bing-searcher.js/blob/548f8cac0d7920cfedf80842d2ae53ce44f79cca/src/bing.ts#L12)

Engine alias(es). Can be a single string or an array of strings.
Useful for registering shorthand names (e.g., 'g' for 'Google').

#### Overrides

`WebSearcher.alias`

***

### createObject()

> `static` **createObject**: (`name`, ...`args`) => `WebSearcher`

Defined in: web-searcher/dist/index.d.ts:393

Creates an instance of the registered search engine.

#### Parameters

##### name

`string`

The name of the engine.

##### args

...`any`[]

Arguments to pass to the constructor.

#### Returns

`WebSearcher`

An instance of the search engine.

#### Inherited from

`WebSearcher.createObject`

***

### currentInstanceIndex?

> `static` `optional` **currentInstanceIndex**: `number`

Defined in: web-searcher/dist/index.d.ts:364

Globally shared index for tracking the currently active instance (node) across sessions.

#### Inherited from

`WebSearcher.currentInstanceIndex`

***

### defaultBaseUrls?

> `static` `optional` **defaultBaseUrls**: `string`[]

Defined in: web-searcher/dist/index.d.ts:362

Default base URLs for engines that support multiple instances.

#### Inherited from

`WebSearcher.defaultBaseUrls`

***

### forEach()

> `static` **forEach**: (`cb`) => `void`

Defined in: web-searcher/dist/index.d.ts:399

Iterates over all registered engines.

#### Parameters

##### cb

(`ctor`, `name`) => `void`

Callback function to invoke for each registered engine.

#### Returns

`void`

#### Inherited from

`WebSearcher.forEach`

***

### get()

> `static` **get**: (`name`) => *typeof* `WebSearcher`

Defined in: web-searcher/dist/index.d.ts:385

Retrieves a registered search engine class by name.

#### Parameters

##### name

`string`

The name of the engine (e.g., 'Google').

#### Returns

*typeof* `WebSearcher`

The search engine class constructor.

#### Inherited from

`WebSearcher.get`

***

### name?

> `static` `optional` **name**: `string`

Defined in: web-searcher/dist/index.d.ts:355

Custom engine name. If not provided, it is derived from the class name.
For example, `GoogleSearcher` becomes `Google`.

#### Inherited from

`WebSearcher.name`

***

### register()

> `static` **register**: (`ctor`, `options?`) => `boolean`

Defined in: web-searcher/dist/index.d.ts:372

Registers a search engine class.

#### Parameters

##### ctor

*typeof* `WebSearcher`

The search engine class to register.

##### options?

Registration options. If a string is provided, it is used as the registered name.

`string` | `IBaseFactoryOptions`

#### Returns

`boolean`

`true` if registration was successful.

#### Inherited from

`WebSearcher.register`

***

### setAliases()

> `static` **setAliases**: (`ctor`, ...`aliases`) => `void`

Defined in: web-searcher/dist/index.d.ts:406

Sets aliases for a registered engine.

#### Parameters

##### ctor

*typeof* `WebSearcher`

The search engine class.

##### aliases

...`string`[]

Aliases to add.

#### Returns

`void`

#### Inherited from

`WebSearcher.setAliases`

***

### unregister()

> `static` **unregister**: (`name?`) => `void`

Defined in: web-searcher/dist/index.d.ts:378

Unregisters a search engine.

#### Parameters

##### name?

The name or class to unregister.

`string` | *typeof* `WebSearcher`

#### Returns

`void`

#### Inherited from

`WebSearcher.unregister`

## Accessors

### pagination

#### Get Signature

> **get** **pagination**(): `PaginationConfig`

Defined in: [bing-searcher/src/bing.ts:68](https://github.com/isdk/bing-searcher.js/blob/548f8cac0d7920cfedf80842d2ae53ce44f79cca/src/bing.ts#L68)

Optional pagination configuration.
Defines how the searcher navigates to subsequent pages.

If undefined, the searcher will only fetch the first page.

##### Returns

`PaginationConfig`

#### Overrides

`WebSearcher.pagination`

***

### template

#### Get Signature

> **get** **template**(): `FetcherOptions`

Defined in: [bing-searcher/src/bing.ts:14](https://github.com/isdk/bing-searcher.js/blob/548f8cac0d7920cfedf80842d2ae53ce44f79cca/src/bing.ts#L14)

The declarative template for the fetch options.

Subclasses can implement this getter to provide the engine configuration,
including the base URL, search parameters pattern, and extraction rules.

This getter is **optional** if you override [getTemplate](#gettemplate).

Supports variable injection using syntax like `${query}`, `${offset}`, etc.

##### Example

```typescript
get template() {
  return {
    url: 'https://example.com/search?q=${query}',
    actions: [ ... ]
  };
}
```

##### Returns

`FetcherOptions`

#### Overrides

`WebSearcher.template`

## Methods

### \_logDebug()

> `protected` **\_logDebug**(`category`, ...`args`): `void`

Defined in: web-fetcher/dist/index.d.ts:1172

#### Parameters

##### category

`string`

##### args

...`any`[]

#### Returns

`void`

#### Inherited from

`WebSearcher._logDebug`

***

### createContext()

> `protected` **createContext**(`options?`): `FetchContext`

Defined in: web-searcher/dist/index.d.ts:458

#### Parameters

##### options?

`FetcherOptions`

#### Returns

`FetchContext`

#### Inherited from

`WebSearcher.createContext`

***

### dispose()

> **dispose**(): `Promise`\<`void`\>

Defined in: web-fetcher/dist/index.d.ts:1231

Disposes of the session and its associated engine.

#### Returns

`Promise`\<`void`\>

#### Remarks

This method should be called when the session is no longer needed to free up resources
(e.g., closing browser instances, purging temporary storage).

#### Inherited from

`WebSearcher.dispose`

***

### execute()

> **execute**\<`R`\>(`actionOptions`, `context?`): `Promise`\<`FetchActionResult`\<`R`\>\>

Defined in: web-fetcher/dist/index.d.ts:1186

Executes a single action within the session.

#### Type Parameters

##### R

`R` *extends* `FetchReturnType` = `"response"`

The expected return type of the action.

#### Parameters

##### actionOptions

`_RequireAtLeastOne`

Configuration for the action to be executed.

##### context?

`FetchContext`

Optional context override for this specific execution. Defaults to the session context.

#### Returns

`Promise`\<`FetchActionResult`\<`R`\>\>

A promise that resolves to the result of the action.

#### Example

```ts
await session.execute({ name: 'goto', params: { url: 'https://example.com' } });
```

#### Inherited from

`WebSearcher.execute`

***

### executeAll()

> **executeAll**(`actions`, `options?`): `Promise`\<\{ `outputs`: `Record`\<`string`, `any`\>; `result`: `FetchResponse` \| `undefined`; \}\>

Defined in: web-fetcher/dist/index.d.ts:1203

Executes a sequence of actions.

#### Parameters

##### actions

`_RequireAtLeastOne`\<`FetchActionProperties`, `"id"` \| `"name"` \| `"action"`\>[]

An array of action options to be executed in order.

##### options?

`Partial`\<`FetcherOptions`\> & `object`

Optional temporary configuration overrides (e.g., timeoutMs, headers) for this batch of actions.
                 These overrides do not affect the main session context.

#### Returns

`Promise`\<\{ `outputs`: `Record`\<`string`, `any`\>; `result`: `FetchResponse` \| `undefined`; \}\>

A promise that resolves to an object containing the result of the last action and all accumulated outputs.

#### Example

```ts
const { result, outputs } = await session.executeAll([
  { name: 'goto', params: { url: 'https://example.com' } },
  { name: 'extract', params: { schema: { title: 'h1' } }, storeAs: 'data' }
], { timeoutMs: 30000 });
```

#### Inherited from

`WebSearcher.executeAll`

***

### formatOptions()

> `protected` **formatOptions**(`options`): `Record`\<`string`, `any`\>

Defined in: [bing-searcher/src/bing.ts:77](https://github.com/isdk/bing-searcher.js/blob/548f8cac0d7920cfedf80842d2ae53ce44f79cca/src/bing.ts#L77)

Transforms standard options into engine-specific template variables.

Subclasses should override this to map standard options like 'timeRange',
'category', 'region' into the specific URL parameters required by the engine
(e.g., mapping `timeRange: 'day'` to `tbs: 'qdr:d'` for Google).

#### Parameters

##### options

`SearchOptions`

The search options provided by the user.

#### Returns

`Record`\<`string`, `any`\>

A dictionary of variables to be injected into the template.

#### Overrides

`WebSearcher.formatOptions`

***

### getOutputs()

> **getOutputs**(): `Record`\<`string`, `any`\>

Defined in: web-fetcher/dist/index.d.ts:1214

Retrieves all outputs accumulated during the session.

#### Returns

`Record`\<`string`, `any`\>

A record of stored output data.

#### Inherited from

`WebSearcher.getOutputs`

***

### getState()

> **getState**(): `Promise`\<\{ `cookies`: `Cookie`[]; `sessionState?`: `any`; \} \| `undefined`\>

Defined in: web-fetcher/dist/index.d.ts:1220

Gets the current state of the session, including cookies and engine-specific state.

#### Returns

`Promise`\<\{ `cookies`: `Cookie`[]; `sessionState?`: `any`; \} \| `undefined`\>

A promise resolving to the session state, or undefined if no engine is initialized.

#### Inherited from

`WebSearcher.getState`

***

### getTemplate()

> `protected` **getTemplate**(`variables`, `options`): `FetcherOptions`

Defined in: web-searcher/dist/index.d.ts:457

Dynamically retrieves the fetch template based on current variables and search options.

Subclasses can override this method to return different extraction rules (actions)
or URL patterns based on the search category, region, or other parameters.

#### Parameters

##### variables

`Record`\<`string`, `any`\>

The calculated variables (from formatOptions, pagination, etc.).

##### options

`SearchOptions`

The original search options provided by the user.

#### Returns

`FetcherOptions`

The fetcher configuration to be used for the current request.

#### Inherited from

`WebSearcher.getTemplate`

***

### search()

> **search**(`query`, `options?`): `Promise`\<`StandardSearchResult`[]\>

Defined in: web-searcher/dist/index.d.ts:469

Executes a search query.

This method handles the pagination loop, multi-instance failover, variable injection,
fetching, and result transformation.

#### Parameters

##### query

`string`

The search query string.

##### options?

`SearchOptions`

Optional search parameters (e.g., limit, timeRange).

#### Returns

`Promise`\<`StandardSearchResult`[]\>

A promise resolving to an array of standardized search results.

#### Inherited from

`WebSearcher.search`

***

### transform()

> **transform**(`outputs`, `options`): `Promise`\<`any`[]\>

Defined in: [bing-searcher/src/bing.ts:165](https://github.com/isdk/bing-searcher.js/blob/548f8cac0d7920cfedf80842d2ae53ce44f79cca/src/bing.ts#L165)

Transform and clean the raw extracted results.

Subclasses should override this method to provide engine-specific cleaning,
normalization, or post-processing of the data extracted by the fetcher.

#### Parameters

##### outputs

`Record`\<`string`, `any`\>

The complete outputs object from the fetch actions.

##### options

`SearchOptions` = `{}`

#### Returns

`Promise`\<`any`[]\>

A promise resolving to an array of standardized search results.

#### Overrides

`WebSearcher.transform`

***

### validateFetchResult()

> `protected` **validateFetchResult**(`results`, `context`): `Promise`\<`boolean`\>

Defined in: web-searcher/dist/index.d.ts:479

Hook for subclasses to validate fetched results before they are accepted.
If this returns false, the instance manager will consider the fetch a failure
and automatically switch to the next available baseUrl (if any).

#### Parameters

##### results

`StandardSearchResult`[]

The extracted results.

##### context

`SearchContext`

Context including the current baseUrl and page.

#### Returns

`Promise`\<`boolean`\>

A promise resolving to true if valid, false otherwise.

#### Inherited from

`WebSearcher.validateFetchResult`

***

### search()

> `static` **search**(`engineNames`, `query`, `options?`): `Promise`\<`StandardSearchResult`[]\>

Defined in: web-searcher/dist/index.d.ts:418

Static helper to execute a one-off search or a fallback chain.

It creates an instance of the specified engine(s), executes the search, and automatically
falls back to the next engine in the list if the current one fails or is exhausted.

#### Parameters

##### engineNames

The name(s) of the engine(s) to use (e.g., 'Google' or ['SearXNG', 'Google']).

`string` | `string`[]

##### query

`string`

The search query string.

##### options?

`SearchOptions` & `FetcherOptions`

Combined search options and fetcher options.

#### Returns

`Promise`\<`StandardSearchResult`[]\>

A promise resolving to an array of standardized search results.

#### Inherited from

`WebSearcher.search`
