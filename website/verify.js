import {readFile} from 'node:fs/promises';
import QRCode from 'qrcode';

const {repository}=JSON.parse(await readFile(new URL('./public/site-config.json',import.meta.url),'utf8'));
if(!/^[^/\s]+\/[^/\s]+$/.test(repository)||repository.includes('OWNER/REPOSITORY'))throw new Error('Set site-config.json to the actual GitHub owner/repository before deployment.');
const url=`https://github.com/${repository}/releases/latest/download/SakhiSafe.apk`;
if(!url.endsWith('/releases/latest/download/SakhiSafe.apk'))throw new Error('Download URL is not the stable latest-release asset URL.');
const svg=await QRCode.toString(url,{type:'svg',errorCorrectionLevel:'H'});
if(!svg.includes('<svg'))throw new Error('QR code generation failed.');
console.log(`QR code URL validated and generated: ${url}`);
