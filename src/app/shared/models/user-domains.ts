export class UserDomains {
    id?:string;
    subdomainName: string;
    ipfsLink: string;
    datetime: string;
    constructor(
        id:string,
        subdomainName: string,
        ipfsLink: string,
        datetime: string,
    ){
        this.id = id;
        this.subdomainName = subdomainName;
        this.ipfsLink = ipfsLink;
        this.datetime = datetime;
    }
}
