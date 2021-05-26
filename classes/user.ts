export class User {
    username            : string;
    email               : string;
    firstname           : string;
    lastname            : string;
    password            : string;
    confirmPassword     : string;
    phoneNumber         : string;

    
    constructor(json?: any) {
        if(json) {
            this.username           = json.username;
            this.email              = json.email;
            this.firstname          = json.firstname;
            this.lastname           = json.lastname;
            this.password           = json.password;
            this.confirmPassword    = json.confirmPassword;
            this.phoneNumber        = json.phoneNumber;
        }
    }
}
