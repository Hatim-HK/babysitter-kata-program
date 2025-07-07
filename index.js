#!/usr/bin/env node
const { program } = require('commander');
const calcPay = require('./lib/calcPay');

program
  .requiredOption('-s, --start <time>', 'Start time (e.g. 17:00 or 23)')
  .requiredOption('-e, --end <time>', 'End time (e.g. 04:00 or 4)')
  .requiredOption('-f, --family <A|B|C>', 'Family (A, B or C)')
  .action(({ start, end, family }) => {
    try {
      const total = calcPay(start, end, family);
      console.log(total);
    } catch (err) {
      console.error('Error:', err.message);
      process.exit(1);
    }
  });

program.parse(process.argv);
