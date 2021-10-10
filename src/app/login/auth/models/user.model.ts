export class User {
    constructor(
        public email: string,
        public _token: string,
        public _tokenExpirationDate: Date,
        public firstName: string,
        public lastName: string,
    ) { }

}

