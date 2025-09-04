const reporter = require('cucumber-html-reporter');
const fs = require('fs');
const path = require('path');

const jsonFile = path.join('artifacts', 'cucumber-report.json');
if (!fs.existsSync(jsonFile)) {
  console.warn('No JSON report found at', jsonFile);
  process.exit(0);
}

const options = {
  theme: 'bootstrap',
  jsonFile,
  output: path.join('artifacts', 'cucumber-report.html'),
  reportSuiteAsScenarios: true,
  launchReport: false,
  metadata: {
    Platform: process.platform,
    Browser: process.env.BROWSER || 'chromium',
    Headed: process.env.HEADED || 'false'
  }
};

reporter.generate(options);
console.log('✔ Wrote artifacts/cucumber-report.html');
