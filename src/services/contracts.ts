import type {AlertRecord, Contact, UserProfile} from '../types/models';

export type ServiceResult<T> = {ok:true; data:T} | {ok:false; offline:boolean; message:string};
export interface AuthenticationService {register(email:string,password:string):Promise<ServiceResult<UserProfile>>;login(email:string,password:string):Promise<ServiceResult<UserProfile>>;logout():Promise<void>}
export interface ProfileService {load():Promise<ServiceResult<UserProfile>>;save(profile:UserProfile):Promise<ServiceResult<UserProfile>>}
export interface EmergencyContactsService {list():Promise<ServiceResult<Contact[]>>;save(contacts:Contact[]):Promise<ServiceResult<Contact[]>>}
export interface EmergencyAlertsService {create(alert:AlertRecord,contacts:Contact[]):Promise<ServiceResult<AlertRecord>>}
export interface CommunityPostsService {list():Promise<ServiceResult<unknown[]>>;publish(body:string,pseudonym:string):Promise<ServiceResult<unknown>>;report(postId:string,reason:string):Promise<ServiceResult<void>>;block(postId:string):Promise<ServiceResult<void>>}
export interface ModerationService {status(postId:string):Promise<ServiceResult<'pending'|'approved'|'rejected'>>}
export interface NotificationsService {requestPermission():Promise<ServiceResult<boolean>>;setEnabled(enabled:boolean):Promise<ServiceResult<void>>}
export interface LocationSharingService {getOneTimeLocation():Promise<ServiceResult<{latitude:number;longitude:number;capturedAt:string}>>}

/** Explicit unavailable response; callers must not interpret missing backend as a success. */
export const backendUnavailable=<T>():ServiceResult<T>=>({ok:false,offline:true,message:'Backend is not configured. This action remains local to this device.'});
