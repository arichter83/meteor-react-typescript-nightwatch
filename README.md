## Installation

```bash
git clone https://github.com/arichter83/meteor-react-typescript-nightwatch.git
npm install
meteor
```

## Running unit test with jest

The jest tests are using the "react-test-renderer" and "meteor-jest-stubs" (https://github.com/tomscholz/meteor-jest-stubs):
```bash
npm run test
```

## Running end-to-end (e2e) tests with nightwatch

Open three terminals and run these commands

Typescript compiler (-w will run on any file change):
```bash
tsc -w
```

Run meteor server:
```bash
meteor
```

Run nightwatch (with ```config/nightwatch.json```) and Chrome:
```bash
npm run test-nightwatch
```

## Steps that created this boilerplate

```bash
meteor create --react meteor-react-typescript-nightwatch
cd meteor-react-typescript-nightwatch
npm install typescript
meteor add adornis:typescript
npm install @types/meteor @types/react @types/react-dom
npm install nightwatch chromedriver @types/nightwatch
```

And all the changes in the code as seen in this repository.
