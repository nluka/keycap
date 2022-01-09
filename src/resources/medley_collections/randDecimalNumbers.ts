const randDecimalNumbers: string[] = [];

for (let i = 0; i < 1000; ++i) {
  randDecimalNumbers.push(
    Math.random().toFixed(Math.round(1 + Math.random() * 4)),
  );
}

export default randDecimalNumbers;
