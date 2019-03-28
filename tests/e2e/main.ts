import { NightwatchTests } from 'nightwatch';

import { Links } from 'imports/api/links'

const tests: NightwatchTests = {
  'Check 2x click': (browser) => {
    browser
      .url('http://localhost:3000')
      .assert.containsText('#react-target', '0 times')
      .click('div button')
      .assert.containsText('#react-target', '1 times')
      .click('div button')
      .assert.containsText('#react-target', '2 times')
  },
  'Create new link and delete again': (browser) => {
    browser
      .execute(function() {
        return (Meteor as any).connection._stores['links']._getCollection()
          .insert({title:"new link"})
      }, [], (result) => {
        const newid = result.value
        browser
          .assert.containsText('#' + newid, 'new link')
          .execute(function(newid) {
            return (Meteor as any).connection._stores['links']._getCollection()
              .remove({_id: newid})
          }, [newid], () => {
            browser
              .assert.elementNotPresent('#' + newid)
          })
      })
  }
};

module.exports = tests
