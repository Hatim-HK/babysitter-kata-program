# Babysitter Kata CLI

A command-line tool to calculate nightly pay for babysitting based on family-specific rates.

## Prerequisites

* Node.js (v14 or later) installed on your system.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Hatim-HK/babysitter-kata-program.git
   cd babysitter-kata-program
   ```
2. Install dependencies:

   ```bash
   npm install
   ```

## Usage

You can run the CLI in two ways:

* Using `npx` (for zero-install):

  ```bash
  npx babysit --start <hour> --end <hour> --family <A|B|C>
  ```

* Using `npm exec` (with an explicit double-dash to forward args):

  ```bash
  npm exec babysit -- --start 17 --end 1 --family A
  ```

### Options

* `-s, --start <time>`  Start time (24-hour hour only, e.g. `17` for 5 PM or `1` for 1 AM)
* `-e, --end <time>`    End time (same format)
* `-f, --family <A|B|C>` Family: `A`, `B`, or `C`

### Example

```bash
npx babysit --start 17 --end 1 --family A
# Output: 130
```

## Running Tests

Unit tests are written with Mocha and Chai. To run them:

```bash
npm test
```

Test files live in the `test/` directory.

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## License

ISC
