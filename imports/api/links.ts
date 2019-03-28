import { Mongo } from 'meteor/mongo';


export interface ILink {
  _id?: string
  url: string
  title: string
  createdAt: Date
}

export const Links:Mongo.Collection<ILink> = new Mongo.Collection('links')
