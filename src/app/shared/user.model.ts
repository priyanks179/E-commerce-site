export class User {
    public id: Number;
    public userName: String;
    public email: String;

    constructor(id: Number,userName: String,email: String){
        this.id=id;
        this.userName=userName;
        this.email=email;
    }
}