suppress-node-warnings

# suppress-node-warnings

## Table of contents

### Functions

- [suppressNodeWarnings](README.md#suppressnodewarnings)

## Functions

### suppressNodeWarnings

▸ **suppressNodeWarnings**(`name`): `void`

Places a filter in front of all current `'warning'` event handlers attached
to `globalThis.process`. This filter quietly swallows any warning events
matching `name` while letting others pass through like normal.

**IMPORTANT: Imports that might generate warnings must occur _AFTER_ this
function is executed. If warning suppression isn't working for you, it means
you must use _dynamic imports_, and they must occur _AFTER_ this function is
executed.**

On the other hand, imports that might add additional `'warning'` event
handlers must occur _BEFORE_ this function is executed. Any handlers added
after this function executes will not be suppressed.

Common warning names include:

- `"DeprecationWarning"`
- `"ExperimentalWarning"`
- `"MaxListenersExceededWarning"`
- `"TimeoutOverflowWarning"`
- `"UnsupportedWarning"`

Note that this function does not rely on any horrifying hacks redefining
`process.emit` or anything crazy like that.

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` \| `string`[] |

#### Returns

`void`

**`See`**

 - https://nodejs.org/api/process.html#nodejs-warning-names
 - https://nodejs.org/api/process.html#event-warning
 - https://github.com/nodejs/node/issues/30810#issuecomment-1252948007

#### Defined in

index.ts:30
