export const validPhone=(value:string)=>/^\+?[0-9][0-9\s().-]{5,18}$/.test(value.trim()) && value.replace(/\D/g,'').length>=7;
export const validEmail=(value:string)=>/^\S+@\S+\.\S+$/.test(value.trim());
