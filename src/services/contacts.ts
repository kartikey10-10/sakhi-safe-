import Contacts from 'react-native-contacts';
import {PermissionsAndroid, Platform} from 'react-native';
import type {Contact} from '../types/models';
import {validPhone} from '../utils/validation';

export {validPhone};
export async function importPhoneContacts():Promise<Contact[]> {
  if (Platform.OS !== 'android') throw new Error('Contact import is only enabled on Android.');
  const permission=await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS,{title:'Choose trusted contacts',message:'Sakhi Safe uses contact access only when you import a contact.' ,buttonPositive:'Continue',buttonNegative:'Cancel'});
  if(permission!==PermissionsAndroid.RESULTS.GRANTED) throw new Error('Contact permission was denied. You can still add contacts manually.');
  const rows=await Contacts.getAll();
  return rows.flatMap((row:any)=>{const phone=row.phoneNumbers?.[0]?.number;if(!phone)return[];return[{id:`phone-${row.recordID}`,name:[row.givenName,row.familyName].filter(Boolean).join(' ')||'Contact',phone,primary:false,selected:false}];});
}
