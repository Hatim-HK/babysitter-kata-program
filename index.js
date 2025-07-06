#!/usr/bin/env node
const { program } = require('commander');

program
  .requiredOption('-s, --start <time>', 'Start time (e.g. 17:00 or 23)')
  .requiredOption('-e, --end <time>', 'End time (e.g. 04:00 or 4)')
  .requiredOption('-f, --family <A|B|C>', 'Family (A, B or C)')
  .action(({ start, end, family }) => {
    console.log(`Not implemented: ${start}–${end} for family ${family}`);
  });

program.parse(process.argv);
