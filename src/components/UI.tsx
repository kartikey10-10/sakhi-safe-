import React from 'react';
import {StyleSheet, Switch, Text, TouchableOpacity, View} from 'react-native';
import {colors} from '../theme';

export function Card({children,style}:any){return <View style={[s.card,style]}>{children}</View>;}
export function Button({title,onPress,color=colors.purple,disabled=false}:any){return <TouchableOpacity accessibilityRole="button" disabled={disabled} onPress={onPress} style={[s.button,{backgroundColor:disabled?colors.muted:color}]}><Text style={s.buttonText}>{title}</Text></TouchableOpacity>;}
export function Label({children}:any){return <Text style={s.label}>{children}</Text>;}
export function Preference({label,value,onChange}:any){return <View style={s.row}><Text style={s.preference}>{label}</Text><Switch value={value} onValueChange={onChange} trackColor={{true:colors.purple}}/></View>;}
const s=StyleSheet.create({card:{backgroundColor:colors.white,borderRadius:18,padding:17,marginBottom:13,borderWidth:1,borderColor:colors.line},button:{alignItems:'center',justifyContent:'center',borderRadius:13,minHeight:48,paddingHorizontal:16,marginTop:10},buttonText:{color:colors.white,fontSize:15,fontWeight:'700'},label:{fontSize:11,fontWeight:'700',color:colors.muted,marginTop:8},row:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',gap:8},preference:{fontSize:14,color:colors.ink,lineHeight:21,marginBottom:6,flex:1}});
