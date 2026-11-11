import Geolocation from '@react-native-community/geolocation';
import {Linking, PermissionsAndroid, Platform} from 'react-native';
import type {Contact} from '../types/models';

export type LocationResult={url:string;timestamp:string}|null;
export async function getOneTimeLocation():Promise<LocationResult>{
  if(Platform.OS!=='android')return null;
  const permission=await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,{title:'Share your location',message:'Location is used only when you prepare an SOS message.',buttonPositive:'Allow',buttonNegative:'Not now'});
  if(permission!==PermissionsAndroid.RESULTS.GRANTED)return null;
  return new Promise(resolve=>Geolocation.getCurrentPosition(({coords,timestamp})=>resolve({url:`https://maps.google.com/?q=${coords.latitude},${coords.longitude}`,timestamp:new Date(timestamp||Date.now()).toLocaleString()}),()=>resolve(null),{enableHighAccuracy:true,timeout:12000,maximumAge:0}));
}
export async function openSosMessage(contacts:Contact[],location:LocationResult){
  const recipients=contacts.filter(c=>c.selected).map(c=>c.phone);
  if(!recipients.length)throw new Error('Select at least one trusted contact first.');
  const body=`I may need support. Please check in with me.${location?` My current location: ${location.url} (as of ${location.timestamp}).`:' Location is unavailable.'}`;
  const url=`sms:${recipients.join(',')}?body=${encodeURIComponent(body)}`;
  if(!(await Linking.canOpenURL(url)))throw new Error('No SMS app is available on this phone.');
  await Linking.openURL(url); // Opening the composer does not mean a message was sent.
}
export async function openEmergencyDialer(){const url='tel:112';if(!(await Linking.canOpenURL(url)))throw new Error('Phone dialer is unavailable.');await Linking.openURL(url);}
