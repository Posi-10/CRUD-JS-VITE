export class User {

  /**
   * 
   * @param { Like<User> } userDataLike 
   */
  constructor( { avatar, balance, firstName, gender, id, isActive, lastName } ) {
    this.avatar = avatar;
    this.balance = balance;
    this.firstName = firstName;
    this.gender = gender;
    this.id = id;
    this.isActive = isActive;
    this.lastName = lastName;
  }
}