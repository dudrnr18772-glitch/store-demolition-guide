import fs from 'node:fs';
import path from 'node:path';
const base='https://store-demolition-guide.netlify.app';
const services=['commercial-restoration','store-restoration','office-restoration','cafe-demolition','closure-demolition','interior-demolition'];
const guides=['cost-checklist','contract-checklist','work-process','waste-disposal','closure-support'];
const regions=["yeoksam-office-restoration","seongsu-cafe-demolition","seomyeon-restaurant-demolition","hongdae-store-demolition","yeouido-office-restoration","guro-dong-restoration","jamsil-store-demolition","bupyeong-closure-demolition","ingye-dong-store-demolition"];
const urls=[base+'/',base+'/regions/',...services.map(s=>base+'/services/'+s+'/'),...guides.map(s=>base+'/guides/'+s+'/'),...regions.map(s=>base+'/'+s+'/')];
const retired=JSON.parse(fs.readFileSync('data/retired-pages.json','utf8'));
if(urls.some(u=>retired.some(s=>u===base+'/'+s+'/')))throw new Error('Retired page leaked into sitemap');
fs.mkdirSync('public',{recursive:true});
const encode=s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;');
fs.writeFileSync('public/sitemap.xml','<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'+urls.map(u=>'  <url><loc>'+encode(u)+'</loc></url>').join('\n')+'\n</urlset>\n','utf8');
fs.writeFileSync('public/robots.txt','User-agent: *\nAllow: /\nSitemap: '+base+'/sitemap.xml\n','utf8');
// Curated sitemap: homepage, service / guides, regional directory and nine current regional pages.
// Old legacy regional URLs are retired from output, not redirected to unrelated content.
console.log('curated sitemap count:',urls.length);
