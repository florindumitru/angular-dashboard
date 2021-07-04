import { FormGroup } from "@angular/forms";

export class UserDomains {
    id?:string;
    uid: string;
    subdomainName: string;
    ipfsLink: string;
    datetime: string;
    constructor(
        id:string,
        uid:string,
        subdomainName: string,
        ipfsLink: string,
        datetime: string,
    ){
        this.id = id;
        this.uid = uid;
        this.subdomainName = subdomainName;
        this.ipfsLink = ipfsLink;
        this.datetime = datetime;
    }
}


export interface EditUserDomains {
    currentData?: UserDomains;
    originalData: UserDomains;
    editable: boolean;
    validator: FormGroup;
  }