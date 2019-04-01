import * as React from 'react'
import { Info } from './Info'
import * as renderer from 'react-test-renderer'

const props = {
  links: [
    {
      _id: "theid",
      url: "http://test.com",
      title: "Link",
      createdAt: new Date()
    }
  ]
}

test('<Info /> rendering links', () => {
  const component = renderer.create(<Info {...props} />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
