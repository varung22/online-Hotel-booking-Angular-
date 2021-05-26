export class BookingOrder {
    firstName               : string;
    lastName                : string;
    phone                   : string;
    curUser                 : string;
    hotelId                 : String;
    hotelName               : String;
    comments                : string;
    checkIn                 : Date;
    checkOut                : Date;
    noAdults                : number;
    noChildren              : number;
    roomInfo                : string;

    constructor(json?: any) {
        if(json) {
            this.firstName                      = json.firstName;
            this.lastName                       = json.lastName;
            this.phone                          = json.phone;
            this.curUser                        = json.curUser;
            this.hotelId                        = json.hotelId;
            this.hotelName                      = json.hotelName;
            this.comments                       = json.comments;
            this.checkIn                        = json.checkIn;
            this.checkOut                       = json.checkOut;
            this.noAdults                       = json.noAdults;
            this.noChildren                     = json.noChildren;
            this.roomInfo                       = json.roomInfo;
        }
    }
}
