import { Rating } from './rating';
import { Address } from './address';

export class Hotel {
    id: String;
    name: String;
    description: String;
    website: String;
    contact: String;
    email: String;
    type: String;
    rating: Rating;
    address: Address;
    room_types: {};

    
    constructor(json?: any) {
        if(json) {
            this.id                     = json.id;
            this.name                   = json.name;
            this.description            = json.description;
            this.website                = json.website;
            this.contact                = json.contact;
            this.email                  = json.email;
            this.type                   = json.type;
            this.rating                 = json.rating;
            this.address                = json.address;
        }
    }
}
