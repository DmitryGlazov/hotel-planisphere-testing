interface Person {
    email: string,
    password: string,
    name: string,
    premiumMembership: boolean,
    address?: string,
    phoneNumber?: string,
    gender: Gender,
    dateOfBirth?: string,
    recieveNotification: boolean 
}

enum Gender {
    NOT_SPECIFIED,
    MALE,
    FEMALE,
    OTHER
}