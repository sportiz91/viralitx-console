# Viralitx Console

A simple TypeScript-based console application that uses Commander to manage subcommands, displays an ASCII banner, and includes a basic "hello" command.

## Table of Contents

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Configuration Files](#configuration-files)
- [Usage](#usage)
- [Production Setup](#production-setup)
- [Available Commands](#available-commands)
- [Enforcing Environment Requirements](#enforcing-environment-requirements)
- [Troubleshooting](#troubleshooting)
- [License](#license)

## Overview

This project is a console application built with TypeScript and leverages the following packages:

- **clear**: Clears the console.
- **figlet**: Displays text banners in ASCII.
- **chalk**: Styles the terminal output.
- **commander**: Handles command-line commands and options.
- **ts-node**: Runs TypeScript files without compiling.
- **tsconfig-paths**: Resolves path aliases defined in `tsconfig.json`.

The app displays an ASCII banner, shows developer information, and provides a subcommand (`hello`) to print "Hello, World!".

## Prerequisites

- **Node.js**: v20.18.1  
  (See the `.nvmrc` file for the required version.)
- **Yarn**: v1.22.19 or higher  
  (Run `yarn -v` to verify.)

## Installation

1. **Clone the repository:**

```bash
git clone https://github.com/santiagoportiz/viralitx-console.git
cd viralitx-console
```

2. **Install dependencies using Yarn:**

```bash
yarn install
```

3. **Use nvm to switch to the required Node version:**

```bash
nvm use
```

## Project Structure

viralitx-console/
├── node_modules/
├── src/
│ └── console.ts # Main console entry point
├── dist/ # Compiled JavaScript (after build)
├── .nvmrc # Node version required
├── package.json # Project metadata and scripts
├── tsconfig.json # TypeScript configuration
└── README.md # Project documentation (this file)

## Configuration Files

- `package.json`:
  Contains project scripts, dependencies, and engine requirements.
- `tsconfig.json`:
  Configured for ES2020 output with ESM modules.
- `.nvmrc`:
  Specifies the required Node.js version (v20.18.1).

## Usage

### Running in Development

To run the console application directly using ts-node:

```bash
yarn run console hello
```

If no command is provided, the help message is displayed:

```bash
yarn run console
```

### Building and Running the Compiled Code

1. Build the project:

yarn run build

2. Run the compiled code:

yarn run start hello

## Production Setup

In production, the console is dockerized and runs as part of your external Docker network (viralitx-net), ensuring it can connect to the same MongoDB container as the API.

1. Build the Docker image for production:

```bash
docker compose -f docker-compose.prod.yml build
```

2. Run the console with a specific command (for example, hello):

```bash
docker compose -f docker-compose.prod.yml run console hello
```

This command uses the ENTRYPOINT defined in the production Dockerfile so that any extra arguments (like hello) are appended to the default command.

3. Note: If no command is provided, the container will display the help message by default.

Note: This will generate a lot of stopped containers on your server. You can remove them with:

```bash
docker system prune -a
```

## Available Commands

- `hello`: Prints "Hello, World!" to the console.

Usage:

```bash
yarn run console hello
```

When no command is provided, the app displays help:

```bash
yarn run console
```

## Enforcing Environment Requirements

Node & Yarn Versions:

The project enforces Node.js v20.18.1 and Yarn v1.22.19 or higher via the "engines" field in package.json.

ESM & TypeScript:

The project is configured to use ES modules ("type": "module") and uses the --loader ts-node/esm flag in the script to run .ts files.

## Troubleshooting

ts-node / ESM Issues:

If you encounter errors related to unknown file extensions (e.g., .ts), ensure that you are running Node with the correct loader:

```bash
node --loader ts-node/esm -r tsconfig-paths/register src/console.ts
```

Type Definitions Conflicts:

If you see type definition errors for packages like chalk or commander, ensure you remove any unnecessary @types/ packages since these packages now bundle their own types.

## License

This project is licensed under the MIT License.
