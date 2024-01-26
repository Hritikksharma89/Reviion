import { Url } from 'url'

export type TRole = 'User' | 'Admin' | 'Employee'
export type TMembership = 'Premium' | 'Free' | 'Enterprise'
export interface ISocial {
  name: string
  url: Url
}

<!-- export interface IUser {
  id: string
  name: string
  image: Url
  email: string
  phone: number
  emailVerified: boolean
  bio: string
  social: ISocial[]
  dob: Date
  language: string
  role: TRole
  membership: TMembership
  project: string[]
  onboarding: boolean
} -->
export interface IToken {
  token: string
  expires: Date
}
export interface ITokens {
  refresh: IToken
  access: IToken
}
export interface IAuth {
  email: string
  password: string
  token: ITokens
  role: TRole
  membership: TMembership
  userId: string
}
<!-- export interface ITeam {
  id: string
  name: string
  image: Url
  members: objectId[]   
  projects: string[]
} -->
<!-- export interface ITask {
  id: string
  name: string
  category: string[]
  priority: TPriority
  description: string
  timeline: ITimeLine
  status: TStatus
  assignTo: string[]
}
export interface ITimeLine {
  start: Date
  end: Date
}
export type TPriority = 'High' | 'Low' | 'Medium' | 'Urgent'
export type TStatus = 'Pending' | 'Not Started' | 'Completed' | 'Archive' | 'Started' -->
<!-- export interface IProject {
  id: string
  name: string
  category: string[]
  priority: TPriority
  description: string
  timeline: ITimeLine
  status: TStatus
  taskList: string[]
  paymentDetails: string[]
  assignTeam: string[]
  body: string
  repository: Url
} -->
export interface INotification {
  notifyMe: string
  accountEmail: boolean
  marketingEmail: boolean
  communicationEmail: boolean
}
export interface ISetting {
  display: string[]
  theme: string
  notification: INotification
  language: string
}
export interface ISidebarState {
  isCollapsed: boolean
}


interface - schema - models- services - controller - routes - 

