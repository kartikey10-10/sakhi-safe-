import QRCode from 'qrcode';

const $=id=>document.getElementById(id);
const fallback={repository:'OWNER/REPOSITORY'};
let downloadUrl='';
async function init(){
  $('year').textContent=String(new Date().getFullYear());
  let cfg=fallback;try{const response=await fetch('./site-config.json');if(response.ok)cfg={...cfg,...await response.json()};}catch{}
  const [owner,repo]=String(cfg.repository||fallback.repository).split('/');
  const valid=owner&&repo&&owner!=='OWNER'&&repo!=='REPOSITORY';
  const releaseUrl=valid?`https://github.com/${owner}/${repo}/releases/latest/download/SakhiSafe.apk`:'#';
  downloadUrl=releaseUrl;
  for(const id of ['download','download-main'])$(id).href=releaseUrl;
  $('repo-link').href=valid?`https://github.com/${owner}/${repo}/releases`:'https://github.com/';
  $('help-link').href=valid?`https://github.com/${owner}/${repo}/issues`:'#';
  if(!valid){$('version').textContent='Repository not configured';$('release-date').textContent='Configure the GitHub repository to enable downloads.';$('status').textContent='The latest APK link will be available after this site is deployed from the project repository.';return;}
  await QRCode.toCanvas($('qr'),releaseUrl,{width:220,margin:1,errorCorrectionLevel:'H',color:{dark:'#241d2b',light:'#ffffff'}});
  const api=`https://api.github.com/repos/${owner}/${repo}/releases/latest`;
  try{const res=await fetch(api,{headers:{Accept:'application/vnd.github+json'}});if(!res.ok)throw new Error('Release not available yet');const release=await res.json();const apk=release.assets?.find(a=>a.name==='SakhiSafe.apk');$('version').textContent=release.tag_name||'Latest release';$('release-date').textContent=release.published_at?`Released ${new Date(release.published_at).toLocaleDateString()}`:'Latest release';$('file-size').textContent=apk?`${(apk.size/1024/1024).toFixed(1)} MB`:'';$('status').textContent=apk?'Latest release is ready to download.':'The release exists, but its APK asset is not available yet.';}catch{$('version').textContent='Latest APK';$('release-date').textContent='Release details are temporarily unavailable.';$('status').textContent='The QR and button still point to the stable latest-release download URL.';}
}
$('copy-link').addEventListener('click',async()=>{if(!downloadUrl||downloadUrl==='#')return;$('copy-status').textContent='';try{await navigator.clipboard.writeText(downloadUrl);$('copy-status').textContent='Download link copied.';}catch{$('copy-status').textContent=downloadUrl;}});
init();
