import { NightwatchTests } from 'nightwatch';

const tests: NightwatchTests = {
  'Check click': (browser) => {
    browser
      .url('http://localhost:3000')
      .assert.containsText('#react-target', '0 times')
      .click('div button')
      .assert.containsText('#react-target', '1 times')
      .click('div button')
      .assert.containsText('#react-target', '2 times')
      .pause(2000)

  }
};

module.exports = tests
