const yargs = require('yargs/yargs');
const { JSDOM } = require('jsdom');
const { promises: fs } = require('fs');

const argv = yargs(process.argv.slice(2)).options({
  html: { type: 'string', default: '/app/cover.html' },
}).argv;

const readFile = async (filepath: string): Promise<string> => {
  try {
    return await fs.readFile(filepath, 'utf-8');
  } catch (e) {
    console.error(`no such file or directory. ${filepath}`);
    return '';
  }
};

(async () => {
  const htmlString = await readFile(argv.html);
  if (htmlString === '') process.exit(1);

  // parse dom
  let dom: typeof JSDOM;
  try {
    dom = new JSDOM(htmlString, { includeNodeLocations: true });
  } catch (e) {
    console.error(`failed to parse html. ${e}`);
    process.exit(1);
  }

  const result: {
    filename: string,
    value: string,
    coverage: number, // float
  }[] = [];
  // each option tags should be like
  //   <option value="file0">app/main.go (28.6%)</option>
  // results will be
  // {
  //   "app/main.go": {
  //     "value": "file0",
  //     "coverage": 28.6
  //   }
  // }
  const optionsTags = dom.window.document.querySelectorAll('#topbar #nav option');
  optionsTags.forEach((optionTag: Node) => {
    const txt = optionTag.textContent;
    const [filename, coverageRawTxt] = txt.split(' ');
    if (filename === '' || filename === undefined || coverageRawTxt === '' || coverageRawTxt === undefined) {
      return;
    }

    const value = (optionTag as Element).getAttribute('value');
    const coverageTextMatched = coverageRawTxt.match(/\d+(\.\d+)?/);
    if (coverageTextMatched.length === 0) {
      console.info(`invalid coverage percentage format. ${coverageRawTxt}`);
      return;
    }
    const parsedPercentage = parseFloat(coverageTextMatched[0]);
    if (parsedPercentage === NaN) {
      console.info(`invalid percentage format. ${coverageRawTxt}`)
      return;
    }

    result.push({
      filename,
      value,
      coverage: parsedPercentage,
    });
  });

  console.log(JSON.stringify(result));
})();
