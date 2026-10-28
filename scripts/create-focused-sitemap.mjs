import fs from 'node:fs';
import path from 'node:path';
const base='https://store-demolition-guide.netlify.app';
const services=['commercial-restoration','store-restoration','office-restoration','cafe-demolition','closure-demolition','interior-demolition'];
const guides=['cost-checklist','contract-checklist','work-process','waste-disposal','closure-support'];
const priority=['dogok-dong-demolition-restoration','guro-dong-restoration-cost','jukjeon-dong-shop-demolition','sangnoksu-demolition-restoration','paju-cafe-demolition','pyeongtaek-station-demolition-cost','busan-seo-gu-restaurant-demolition','asan-closure-support','gumi-closure-support'];
const urls=[base+'/',...services.map(s=>base+'/services/'+s+'/'),...guides.map(s=>base+'/guides/'+s+'/'),...priority.map(s=>base+'/'+s+'/')];
fs.mkdirSync('public',{recursive:true});
constencode=s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;');
fs.writeFileSync('public/sitemap.xml','<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'+urls.map(u=>'  <url><loc>'+encode(u)+'</loc></url>').join('\n')+'\n</urlset>\n','utf8');
fs.writeFileSync('public/robots.txt','User-agent: *\nAllow: /\nSitemap: '+base+'/sitemap.xml\n','utf8');
// 7155 unverified old URLs remain served. Sitemap is an explicit curation shortlist, NOT a removal rule.
console.log('curated sitemap count:',urls.length);
