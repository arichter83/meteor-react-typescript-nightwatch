import * as React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Links, ILink } from '../api/links';

interface IProps {
  links: ILink[]
}

import(/* webpackChunkName: "info" */ '../../client/info.scss')

export class Info extends React.Component<IProps> {
  render() {
    const links = this.props.links.map(
      link => this.makeLink(link)
    );

    return (
      <div>
        <h2>Learn Meteor!</h2>
        <ul>{ links }</ul>
      </div>
    );
  }

  makeLink(link: ILink) {
    return (
      <li key={link._id} id={link._id}>
        <a href={link.url} target="_blank">{link.title}</a>
      </li>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe('links')

  return {
    links: Links.find().fetch(),
  };
})(Info);
