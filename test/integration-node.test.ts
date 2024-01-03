/* eslint-disable jest/require-hook */
/* eslint-disable jest/no-conditional-in-test, jest/no-conditional-expect */

import assert from 'node:assert';
import { exports as pkgExports, name as pkgName } from 'package';

import { debugFactory } from 'multiverse/debug-extended';
import { run } from 'multiverse/run';

import {
  dummyFilesFixture,
  dummyNpmPackageFixture,
  mockFixtureFactory,
  nodeImportAndRunTestFixture,
  npmCopySelfFixture
} from 'testverse/setup';

// * These tests ensure all exports function as expected.

const TEST_IDENTIFIER = 'integration-node';
const debug = debugFactory(`${pkgName}:${TEST_IDENTIFIER}`);

const pkgMainPaths = Object.values(pkgExports)
  .map((xport) =>
    typeof xport === 'string'
      ? null
      : `${__dirname}/../${'node' in xport ? xport.node : xport.default}`
  )
  .filter(Boolean) as string[];

const withMockedFixture = mockFixtureFactory(TEST_IDENTIFIER, {
  performCleanup: true,
  pkgRoot: `${__dirname}/..`,
  pkgName,
  use: [
    dummyNpmPackageFixture(),
    dummyFilesFixture(),
    npmCopySelfFixture(),
    nodeImportAndRunTestFixture()
  ],
  npmInstall: []
});

beforeAll(async () => {
  debug('pkgMainPaths: %O', pkgMainPaths);

  await Promise.all(
    pkgMainPaths.map(async (pkgMainPath) => {
      if ((await run('test', ['-e', pkgMainPath])).code != 0) {
        debug(`unable to find main distributable: ${pkgMainPath}`);
        throw new Error('must build distributables first (try `npm run build:dist`)');
      }
    })
  );
});

describe('::suppressWarnings', () => {
  it('only suppresses given warnings', async () => {
    expect.hasAssertions();

    await withMockedFixture(
      async (context) => {
        assert(context.testResult, 'must use node-import-and-run-test fixture');
        expect(context.testResult.stdout).toBe('1');
        expect(context.testResult.code).toBe(0);
        expect(context.testResult.stderr).toMatch(
          /^[^[]+\[ExperimentalWarning]([^\n]+\n){2}[^\n]+$/
        );
      },
      {
        initialFileContents: {
          'src/index.cjs': `
const { suppressWarnings } = require('suppress-node-warnings');

emitDummyWarning('ExperimentalWarning');
console.log('1');

${emitDummyWarning.toString()}
    `
        }
      }
    );

    await withMockedFixture(
      async (context) => {
        assert(context.testResult, 'must use node-import-and-run-test fixture');
        expect(context.testResult.stdout).toBe('2');
        expect(context.testResult.code).toBe(0);
        expect(context.testResult.stderr).toMatch(
          /^[^[]+\[ExperimentalWarning]([^\n]+\n){2}[^\n]+$/
        );
      },
      {
        initialFileContents: {
          'src/index.cjs': `
const { suppressWarnings } = require('suppress-node-warnings');

suppressWarnings();
emitDummyWarning('ExperimentalWarning');
console.log('2');

${emitDummyWarning.toString()}
    `
        }
      }
    );

    await withMockedFixture(
      async (context) => {
        assert(context.testResult, 'must use node-import-and-run-test fixture');
        expect(context.testResult.stdout).toBe('3');
        expect(context.testResult.code).toBe(0);
        expect(context.testResult.stderr).toBeEmpty();
      },
      {
        initialFileContents: {
          'src/index.cjs': `
const { suppressWarnings } = require('suppress-node-warnings');

suppressWarnings('ExperimentalWarning');
emitDummyWarning('ExperimentalWarning');
console.log('3');

${emitDummyWarning.toString()}
`
        }
      }
    );

    await withMockedFixture(
      async (context) => {
        assert(context.testResult, 'must use node-import-and-run-test fixture');
        expect(context.testResult.stdout).toBe('4');
        expect(context.testResult.code).toBe(0);
        expect(context.testResult.stderr).toMatch(
          /^[^[]+\[DeprecationWarning]([^\n]+\n){2}[^\n]+$/
        );
      },
      {
        initialFileContents: {
          'src/index.cjs': `
const { suppressWarnings } = require('suppress-node-warnings');

emitDummyWarning('DeprecationWarning');
console.log('4');

${emitDummyWarning.toString()}
`
        }
      }
    );

    await withMockedFixture(
      async (context) => {
        assert(context.testResult, 'must use node-import-and-run-test fixture');
        expect(context.testResult.stdout).toBe('5');
        expect(context.testResult.code).toBe(0);
        expect(context.testResult.stderr).toBeEmpty();
      },
      {
        initialFileContents: {
          'src/index.cjs': `
const { suppressWarnings } = require('suppress-node-warnings');

suppressWarnings(['ExperimentalWarning', 'DeprecationWarning']);
emitDummyWarning('ExperimentalWarning');
emitDummyWarning('DeprecationWarning');
console.log('5');

${emitDummyWarning.toString()}
`
        }
      }
    );
  });

  it('respects NODE_SUPPRESS_WARNINGS if present', async () => {
    expect.hasAssertions();

    await withMockedFixture(
      async (context) => {
        assert(context.testResult, 'must use node-import-and-run-test fixture');
        expect(context.testResult.stdout).toBe('1');
        expect(context.testResult.code).toBe(0);
        expect(context.testResult.stderr).toMatch(
          /^[^[]+\[DeprecationWarning]([^\n]+\n){2}[^\n]+$/
        );
      },
      {
        initialFileContents: {
          'src/index.cjs': `
const { suppressWarnings } = require('suppress-node-warnings');

process.env.NODE_SUPPRESS_WARNINGS = 'ExperimentalWarning, ';

suppressWarnings();
emitDummyWarning('ExperimentalWarning');
emitDummyWarning('DeprecationWarning');
console.log('1');

${emitDummyWarning.toString()}
`
        }
      }
    );

    await withMockedFixture(
      async (context) => {
        assert(context.testResult, 'must use node-import-and-run-test fixture');
        expect(context.testResult.stdout).toBe('2');
        expect(context.testResult.code).toBe(0);
        expect(context.testResult.stderr).toBeEmpty();
      },
      {
        initialFileContents: {
          'src/index.cjs': `
const { suppressWarnings } = require('suppress-node-warnings');

process.env.NODE_SUPPRESS_WARNINGS = 'ExperimentalWarning, DeprecationWarning';

suppressWarnings();
emitDummyWarning('ExperimentalWarning');
emitDummyWarning('DeprecationWarning');
console.log('2');

${emitDummyWarning.toString()}
`
        }
      }
    );
  });
});

function emitDummyWarning(name: string) {
  process.emitWarning(name, { code: name, detail: 'detail', type: name });
}
