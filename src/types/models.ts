export type Contact = {id:string; name:string; phone:string; primary:boolean; selected:boolean};
export type UserProfile = {name:string; email:string; pseudonym:string};
export type Preferences = {notifications:boolean; privateProfile:boolean; shareLocation:boolean; theme:'light'|'system'};
export type AlertRecord = {id:string; createdAt:string; state:'prepared'|'composer_opened'|'cancelled'|'failed'; message:string};
