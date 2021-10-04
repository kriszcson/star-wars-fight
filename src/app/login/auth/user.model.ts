export class User {
    constructor(
        public email: string,
        public firstName: string,
        public lastName: string,
        private _token: string,
        private _tokenExp: Date
    ) { }

    get token() {
        if (!this._tokenExp || new Date() > this._tokenExp) {
            return null;
        }
        return this._token;
    }
}

