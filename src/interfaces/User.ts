export interface User {
  ID: string;
  Name: string;
  IamID: string;
  Email: string;
  Phone: string;
  ImageID: string;
  ImageURL: string;
  LastVisit: string;
  Client: any;
  Orgs: any[];
  APIKey: string;
  Roles: any[];
  IncompleteProfile: boolean;
}
