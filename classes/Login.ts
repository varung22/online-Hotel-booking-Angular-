export class Login {
    username            : string;
    password            : string;

    
    constructor(json?: any) {
        if(json) {
            this.username           = json.username;
            this.password           = json.password;
        }
    }
}
