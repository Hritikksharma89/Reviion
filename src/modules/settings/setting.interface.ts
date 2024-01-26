

export interface INotification {
    notifyMe: string;
    accountEmail: boolean;
    marketingEmail: boolean;
    communicationEmail: boolean;
  }
  
  export interface ISidebarState {
    isCollapsed: boolean;
  }

export interface ISettings {
    display: string[];
    theme: string;
    notification: INotification;
    language: string;
    sidebarState: ISidebarState;
  }
  
  
  