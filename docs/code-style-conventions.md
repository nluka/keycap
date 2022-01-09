# Code Style Conventions

## Table of Contents

- [General](#general)
- [Language Specific](#language-specific)
  - [HTML and TSX Elements](#html-and-tsx-elements)
  - [CSS](#css)
  - [JavaScript and TypeScript](#javascript-and-typescript)
  - [TSX](#tsx)

## General

- All files should use CRLF for end of line sequence
- All code files should use 2 real spaces for indentation
- Trailing whitespace should be trimmed, configure editor to do so
- Comments should only be used as section labels, to give USEFUL explanations to why something is being done, or as a last resort for code that cannot be made self explanatory

## Language Specific

### HTML and TSX Elements

- Attributes should be listed in alphabetical order

### CSS

- Classes should be kebab-case

  Example:

  ```html
  <div class="game-container"></div>
  ```

- ID's should be camelCase

  Example:

  ```html
  <div id="submissionErrors"></div>
  ```

- Selectors should appear in the same order as the markup it targets

  Example:

  ```html
  <div class="container">
    <h2 id="firstHeading">Heading 1</h2>
  </div>
  <div class="container">
    <h2 id="secondHeading">Heading 2</h2>
  </div>
  <a class="link" href="#">Link</a>
  ```

  ```css
  .container {
  }
  #firstHeading {
  }
  #secondHeading {
  }
  .link {
  }
  ```

### JavaScript and TypeScript

- Refer to the [w3 JavaScript Style Guide](https://www.w3schools.com/js/js_conventions.asp) for general style guidelines

- Functions should be defined directly below their client when possible

  Example:

  ```ts
  function a() {
    b();
  }

  function b() { // client of `a`
    c();
  }

  function c() { // client of `b`
    // Some statements
  }
  ```

### TSX

Functional component contents should be in the following order:
  - Hook values (useState, useAppSelector, useRef, useDispatch, ...)
  - Local variables
  - Nested functions
  - Effects (useEffect)
