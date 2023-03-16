# poc-monorepo

Monorepo POC with lerna, yarn, commitizen and github packages

# Steps

## Install

At monorepo root level, run:

- `npx lerna init --exact` to enable fixed mode (useful for a final package (like a UI library) with multiple dependent packages/assets (to allow syncing breaking changes and make release and monorepo management easier (unique CHANGELOG.md at the monorepo root)))
- `npx lerna init --exact --independent` to enable independent mode (each package owns it release lifecycle (CHANGELOG.md generate on each package folder))

https://github.com/lerna/lerna/tree/main/commands/init#--independent

## Bootstrap packages

- With `npm`, add monorepo command bootstrap and run it: `lerna bootstrap`

- With `yarn`, no need to add or run `lerna bootstrap` since `yarn install` already handles it (linking submodules...). In most Lerna tutorials, it is advocated to use the lerna bootstrap command, however when yarn workspaces is enabled this is unecessary and redundant.
  > lerna bootstrap when you're using Yarn workspaces is literally redundant? All lerna bootstrap --npm-client yarn --use-workspaces (CLI equivalent of your lerna.json config) does is call yarn install in the root. — [Issue 1308](https://github.com/lerna/lerna/issues/1308#issuecomment-370848535)

**How the lerna bootstraping algorithm works?** See https://github.com/lerna/lerna/tree/main/commands/bootstrap#how-it-works

https://github.com/lerna/lerna/blob/main/commands/bootstrap/README.md#--use-workspaces

## Install a shared package

There is currently no automatic way to determine dependencies between packages.

- Though, you can add a shared packages to **all** workspaces via `node node_modules/.bin/lerna add shared --exact`
- Or to only **some** workspaces via `node node_modules/.bin/lerna add shared --exact --scope=components --scope modules`

https://github.com/lerna/lerna/tree/main/commands/add#examples

# Fixed vs Independent strategy mode

## Fixed (used)

✅ Pros:

- No tag overwhelming: one tag per release
- A CHANGELOG.md added at the root to give an overview of all changes from all packages (+ CHANGELOG.md per package)
- Only updated packages are release to npm

🛑 Cons:

- For a given package, potential discontinuous versions: due to the global versioning nature of the fixed mode, if no updates is done to the asset package (for example, components packages) but the documentation was updated => the global version is incremented and the asset package will skip this release version leading to a discontinuous release number for the asset package
- Changelog scope visibility: since we have a centralized changelog, it can be difficult to see which commits impacts which package without clear convention on commit message (for example by enforcing package name in commit message)

🎯 Good use cases:

- Projects with strongly coupled packages (for example, a library built upon small other packages)

## Independent

✅ Pros:

- Each package release are independent: no more discontinuous release number
- Flexibility on scope definition: each package has its own CHANGELOG => the ownership is clear (so no need to adopt convention on scope and we can be more granular on scope affectation (for example, by specifiying `feat(Button): add component` instead of `feat(components): add Button component` in fixed mode))

🛑 Cons:

- Tag overwhelming: one tag per package leading to a more complicated tag management flow

🎯 Good use cases:

- Projects with loosely coupled packages:
  You know that not all of these packages will rely on each other. You don’t want to increment each package’s version every time you make a change in any individual package.
