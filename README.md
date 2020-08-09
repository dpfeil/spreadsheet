# Spreadsheet

Spreadsheet webapp built with TypeScript and CSS Grid


This project uses `Node v12.18.3`

## Installation

To install, first clone the git reposity. Then in the project directory, run:

```
npm install
```

## Available scripts

In the project directory you can run:

### `npm run-script build`

Compiles the node server typescript and uses webpack to compile and bundle the browser source.

### `npm start`

Starts simple node server on port 3000. (Must run `npm run-script build` first)

## Functionality

- Click in a cell to edit
- Hit `enter` key to commit changes to cell
- Hit `esc` key to exit cell without committing your changes
- To enter an equation, start entry with `=`
- You can reference other cells in equations, like `= A1 + B5`



## Things to add

- Needs some error checking for cells with undefined values, or algebra that references cells with strings
- More keyboard functionality (like tabs)
- Would like to add simple cookie based refresh (would normally use something like Firebase)
- Ability to rearrange columns
- Ability to Rearrange rows





## Design

- Start with a `Spreadsheet` class
- `Spreadsheet` is made up of `Cell` class objects
- `Cell` class has
  - `id` - based on positon (like "`A1`")
  - `value` - raw value, which could be an expression like "`= 5 * 10`" or "`= A1 * 5`".
  - computed value
  




## Schedule

> 2020-08-08 15:47 EST - Pausing work on this for now

> 2020-08-09 07:52 EST - Starting back up

> 2020-08-09 10:30 EST - Pausing work for now (required functionality essentially done)