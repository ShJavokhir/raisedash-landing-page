/* Tiny console logger. No deps, no colors that break in dumb terminals. */

let stepN = 0;

export const log = {
  step(msg: string) {
    stepN += 1;
    process.stdout.write(`\n[${stepN}] ${msg}\n`);
  },
  info(msg: string) {
    process.stdout.write(`    ${msg}\n`);
  },
  ok(msg: string) {
    process.stdout.write(`    ok  ${msg}\n`);
  },
  warn(msg: string) {
    process.stdout.write(`    !!  ${msg}\n`);
  },
  fail(msg: string) {
    process.stderr.write(`    XX  ${msg}\n`);
  },
  blank() {
    process.stdout.write("\n");
  },
  resetSteps() {
    stepN = 0;
  },
};
