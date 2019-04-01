import * as React from 'react'
import Hello from './Hello'
import renderer from 'react-test-renderer'

test('<Hello /> counter increases', () => {
  const component = renderer.create(<Hello />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // trigger button click
  tree.children[0].props.onClick()
  expect(component.toJSON()).toMatchSnapshot();

});
