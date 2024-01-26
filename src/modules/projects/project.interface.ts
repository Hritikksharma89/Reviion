import { TPriority, ITimeLine, TStatus } from "../tasks/task.interface"



export interface IProject {
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
  }

  // url
  