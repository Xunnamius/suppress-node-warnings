<!-- badges-start -->

[![Black Lives Matter!][badge-blm]][link-blm]
[![!!UNMAINTAINED!!][badge-unmaintained]][link-unmaintained]

<!-- badges-end -->

# ⛔️ DEPRECATED/UNMAINTAINED

> [!CAUTION]
>
> This project is no longer necessary. Node has supported suppressing warnings
> natively
> [for a while now](https://nodejs.org/en/blog/release/v21.3.0#new---disable-warning-flag).

Use this package to prevent certain pesky warnings (e.g. `ExperimentalWarning`,
`DeprecationWarning`) from causing Node to add noise to generated output, which
can cause all sorts of issues from false positive CI failures from tests
expecting no output to improper text generation from automated processes that
consume stderr.

This is an implementation of my proposed solution to the issue posed [here][1].
Node also comes with [its own methods][2] of suppressing warnings, though they
are inconvenient for a variety of reasons, especially for library authors whose
code will be consumed by various runtimes with disparate configurations.

Unlike similar packages, suppress-node-warnings takes care to _only suppress the
warnings you're specifically targeting_ while letting others through and
_without clobbering any existing listeners_, saving hours of debugging headache
down the road. Additionally, this library does not rely on any horrifying hacks
redefining `process.emit` or anything crazy like that. No footguns here!

---

<!-- remark-ignore-start -->
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Install](#install)
- [Usage](#usage)
  - [Esm](#esm)
  - [Cjs](#cjs)
  - [CLI](#cli)
- [Appendix](#appendix)
  - [Inspiration](#inspiration)
  - [Published Package Details](#published-package-details)
  - [License](#license)
- [Contributing and Support](#contributing-and-support)
  - [Contributors](#contributors)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->
<!-- remark-ignore-end -->

## Install

```shell
npm install suppress-node-warnings
```

## Usage

### Esm

To suppress `ExperimentalWarning`s and `DeprecationWarning`s:

```typescript
import { suppressWarnings } from 'suppress-node-warnings';

suppressWarnings(['ExperimentalWarning', 'DeprecationWarning']);
```

### Cjs

To suppress `ExperimentalWarning`s and `DeprecationWarning`s:

```javascript
const { suppressWarnings } = require('suppress-node-warnings');

suppressWarnings(['ExperimentalWarning', 'DeprecationWarning']);
```

### CLI

This package also looks for a `NODE_SUPPRESS_WARNINGS` environment variable and
parses its contents as comma-separated values that are then trimmed. For
example, to suppress `ExperimentalWarning`s and `DeprecationWarning`s without
explicitly listing them:

```typescript
// file: my-thing.js

import { suppressWarnings } from 'suppress-node-warnings';

// ...

suppressWarnings();

// ...
```

```shell
NODE_SUPPRESS_WARNINGS=ExperimentalWarning,DeprecationWarning node
my-thing.js
```

Specifying one or more warnings explicitly _and_ providing the environment
variable will result in the two arrays being concatenated.

## Appendix

Further documentation can be found under [`docs/`][x-repo-docs].

### Inspiration

[The mother of invention][1].

### Published Package Details

This is a [CJS2 package][x-pkg-cjs-mojito] with statically-analyzable exports
built by Babel for Node.js versions that are not end-of-life. For TypeScript
users, this package supports both `"Node10"` and `"Node16"` module resolution
strategies.

<details><summary>Expand details</summary>

That means both CJS2 (via `require(...)`) and ESM (via `import { ... } from ...`
or `await import(...)`) source will load this package from the same entry points
when using Node. This has several benefits, the foremost being: less code
shipped/smaller package size, avoiding [dual package
hazard][x-pkg-dual-package-hazard] entirely, distributables are not
packed/bundled/uglified, a drastically less complex build process, and CJS
consumers aren't shafted.

Each entry point (i.e. `ENTRY`) in [`package.json`'s
`exports[ENTRY]`][x-repo-package-json] object includes one or more [export
conditions][x-pkg-exports-conditions]. These entries may or may not include: an
[`exports[ENTRY].types`][x-pkg-exports-types-key] condition pointing to a type
declarations file for TypeScript and IDEs, an
[`exports[ENTRY].module`][x-pkg-exports-module-key] condition pointing to
(usually ESM) source for Webpack/Rollup, an `exports[ENTRY].node` condition
pointing to (usually CJS2) source for Node.js `require` _and `import`_, an
`exports[ENTRY].default` condition pointing to source for browsers and other
environments, and [other conditions][x-pkg-exports-conditions] not enumerated
here. Check the [package.json][x-repo-package-json] file to see which export
conditions are supported.

Though [`package.json`][x-repo-package-json] includes
[`{ "type": "commonjs" }`][x-pkg-type], note that any ESM-only entry points will
be ES module (`.mjs`) files. Finally, [`package.json`][x-repo-package-json] also
includes the [`sideEffects`][x-pkg-side-effects-key] key, which is `false` for
optimal [tree shaking][x-pkg-tree-shaking] where appropriate.

</details>

### License

See [LICENSE][x-repo-license].

## Contributing and Support

**[New issues][x-repo-choose-new-issue] and [pull requests][x-repo-pr-compare]
are always welcome and greatly appreciated! 🤩** Just as well, you can [star 🌟
this project][x-badge-repo-link] to let me know you found it useful! ✊🏿 Or you
could [buy me a beer][x-repo-sponsor] 🥺 Thank you!

See [CONTRIBUTING.md][x-repo-contributing] and [SUPPORT.md][x-repo-support] for
more information.

### Contributors

<!-- remark-ignore-start -->
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->

[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)

<!-- ALL-CONTRIBUTORS-BADGE:END -->
<!-- remark-ignore-end -->

Thanks goes to these wonderful people ([emoji
key][x-repo-all-contributors-emojis]):

<!-- remark-ignore-start -->
<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->

<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://xunn.io/"><img src="https://avatars.githubusercontent.com/u/656017?v=4?s=100" width="100px;" alt="Bernard"/><br /><sub><b>Bernard</b></sub></a><br /><a href="#infra-Xunnamius" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/Xunnamius/suppress-node-warnings/commits?author=Xunnamius" title="Code">💻</a> <a href="https://github.com/Xunnamius/suppress-node-warnings/commits?author=Xunnamius" title="Documentation">📖</a> <a href="#maintenance-Xunnamius" title="Maintenance">🚧</a> <a href="https://github.com/Xunnamius/suppress-node-warnings/commits?author=Xunnamius" title="Tests">⚠️</a> <a href="https://github.com/Xunnamius/suppress-node-warnings/pulls?q=is%3Apr+reviewed-by%3AXunnamius" title="Reviewed Pull Requests">👀</a></td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td align="center" size="13px" colspan="7">
        <img src="https://raw.githubusercontent.com/all-contributors/all-contributors-cli/1b8533af435da9854653492b1327a23a4dbd0a10/assets/logo-small.svg">
          <a href="https://all-contributors.js.org/docs/en/bot/usage">Add your contributions</a>
        </img>
      </td>
    </tr>
  </tfoot>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->
<!-- remark-ignore-end -->

This project follows the [all-contributors][x-repo-all-contributors]
specification. Contributions of any kind welcome!

[badge-blm]: https://xunn.at/badge-blm 'Join the movement!'
[link-blm]: https://xunn.at/donate-blm
[badge-unmaintained]:
  https://xunn.at/badge-unmaintained
  'Unfortunately, this project is unmaintained (forks welcome!)'
[link-unmaintained]: https://xunn.at/link-unmaintained
[x-badge-codecov-image]:
  https://img.shields.io/codecov/c/github/Xunnamius/suppress-node-warnings/main?style=flat-square&token=HWRIOBAAPW
  'Is this package well-tested?'
[x-badge-codecov-link]: https://codecov.io/gh/Xunnamius/suppress-node-warnings
[x-badge-downloads-image]:
  https://img.shields.io/npm/dm/suppress-node-warnings?style=flat-square
  'Number of times this package has been downloaded per month'
[x-badge-lastcommit-image]:
  https://img.shields.io/github/last-commit/xunnamius/suppress-node-warnings?style=flat-square
  'Latest commit timestamp'
[x-badge-license-image]:
  https://img.shields.io/npm/l/suppress-node-warnings?style=flat-square
  "This package's source license"
[x-badge-license-link]:
  https://github.com/Xunnamius/suppress-node-warnings/blob/main/LICENSE
[x-badge-npm-image]:
  https://xunn.at/npm-pkg-version/suppress-node-warnings
  'Install this package using npm or yarn!'
[x-badge-npm-link]: https://www.npmjs.com/package/suppress-node-warnings
[x-badge-repo-link]: https://github.com/xunnamius/suppress-node-warnings
[x-badge-semanticrelease-image]:
  https://xunn.at/badge-semantic-release
  'This repo practices continuous integration and deployment!'
[x-badge-semanticrelease-link]:
  https://github.com/semantic-release/semantic-release
[x-pkg-cjs-mojito]:
  https://dev.to/jakobjingleheimer/configuring-commonjs-es-modules-for-nodejs-12ed#publish-only-a-cjs-distribution-with-property-exports
[x-pkg-dual-package-hazard]:
  https://nodejs.org/api/packages.html#dual-package-hazard
[x-pkg-exports-conditions]:
  https://webpack.js.org/guides/package-exports#reference-syntax
[x-pkg-exports-module-key]:
  https://webpack.js.org/guides/package-exports#providing-commonjs-and-esm-version-stateless
[x-pkg-exports-types-key]:
  https://devblogs.microsoft.com/typescript/announcing-typescript-4-5-beta#packagejson-exports-imports-and-self-referencing
[x-pkg-side-effects-key]:
  https://webpack.js.org/guides/tree-shaking#mark-the-file-as-side-effect-free
[x-pkg-tree-shaking]: https://webpack.js.org/guides/tree-shaking
[x-pkg-type]:
  https://github.com/nodejs/node/blob/8d8e06a345043bec787e904edc9a2f5c5e9c275f/doc/api/packages.md#type
[x-repo-all-contributors]: https://github.com/all-contributors/all-contributors
[x-repo-all-contributors-emojis]: https://allcontributors.org/docs/en/emoji-key
[x-repo-choose-new-issue]:
  https://github.com/xunnamius/suppress-node-warnings/issues/new/choose
[x-repo-contributing]: /CONTRIBUTING.md
[x-repo-docs]: docs
[x-repo-license]: ./LICENSE
[x-repo-package-json]: package.json
[x-repo-pr-compare]: https://github.com/xunnamius/suppress-node-warnings/compare
[x-repo-sponsor]: https://github.com/sponsors/Xunnamius
[x-repo-support]: /.github/SUPPORT.md
[1]: https://github.com/nodejs/node/issues/30810
[2]: https://github.com/nodejs/node/issues/30810#issuecomment-1446093458
