import { Mongo } from 'meteor/mongo';


interface ILink {
  _id: string
  url: string
  title: string
}

const Links:Mongo.Collection<ILink> = new Mongo.Collection('links')
export default Links
