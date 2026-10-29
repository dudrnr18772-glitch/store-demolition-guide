/**
 * Post-build release gate: preserve 22 curated pages and ensure the legacy
 * CSV corpus is excluded unless explicitly restored for rollback.
 * Never rewrites source CSV, live URLs, sitemap, or Netlify settings.
 */
import fs from 'node:fs';
import path from 'node:path';
import Papa from 'papaparse';

const site='https://store-demolition-guide.netlify.app';
const out=path.join(process.cwd(),'out');
const expanded=JSON.parse(fs.readFileSync('data/expanded-pages.json','utf8'));
const regional=JSON.parse(fs.readFileSync('data/regional-pages.json','utf8'));
const retired=JSON.parse(fs.readFileSync('data/retired-pages.json','utf8'));
const csv=fs.readFileSync('data/pages.csv','utf8');
const parsed=Papa.parse(csv,{header:true,skipEmptyLines:'greedy'});
if(parsed.errors.length)throw new Error('CSV parser failure: '+JSON.stringify(parsed.errors.slice(0,4)));
const csvSlugs=parsed.data.filter(p=>['발행','publish'].includes(String(p.status).trim())).map(p=>String(p.slug).trim());
const curated=['','regions',...expanded.map(p=>p.slug),...regional.map(p=>p.slug)];
const curatedSet=new Set(curated);
const regionalSet=new Set(regional.map(p=>p.slug));
const retiredSet=new Set(retired);
const legacy=csvSlugs.filter(slug=>!retiredSet.has(slug)&&!regionalSet.has(slug));
const rollback=process.env.ENABLE_LEGACY_CSV_PAGES==='1';
const failures=[];
if(curated.length!==22||curatedSet.size!==22)failures.push('Expected 22 unique curated URLs');
if(retired.length!==9||retiredSet.size!==9)failures.push('Expected 9 intentionally retired URLs');
if(csvSlugs.length!==7155)failures.push('Unexpected CSV source row count: '+csvSlugs.length);
if(legacy.length!==7143)failures.push('Unexpected legacy unique paths: '+legacy.length);
const htmlPath=slug=>path.join(out,slug,'index.html');
for(const slug of curated)if(!fs.existsSync(htmlPath(slug)))failures.push('Missing curated output: '+(slug||'/'));
for(const slug of retired)if(fs.existsSync(htmlPath(slug)))failures.push('Retired page in output: '+slug);
if(!rollback)for(const slug of legacy)if(fs.existsSync(htmlPath(slug)))failures.push('Old CSV page unexpectedly generated: '+slug);
const sitemap=fs.existsSync(path.join(out,'sitemap.xml'))?fs.readFileSync(path.join(out,'sitemap.xml'),'utf8'):'';
const expected=new Set(curated.map(slug=>site+(slug?'/'+slug+'/':'/')));
const actual=[...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(x=>x[1].trim());
if(actual.length!==22||new Set(actual).size!==22||actual.some(x=>!expected.has(x))||[...expected].some(x=>!actual.includes(x)))failures.push('Focused sitemap must list exactly 22 curated URLs');
const robots=fs.existsSync(path.join(out,'robots.txt'))?fs.readFileSync(path.join(out,'robots.txt'),'utf8'):'';
if(!robots.includes('Sitemap: '+site+'/sitemap.xml'))failures.push('robots sitemap missing or incorrect');
if(retired.some(slug=>robots.includes('Disallow: /'+slug)))failures.push('robots incorrectly blocks removed URLs');
const homepage=fs.existsSync(path.join(out,'index.html'))?fs.readFileSync(path.join(out,'index.html'),'utf8'):'';
for(const marker of ['google-site-verification','naver-site-verification','https://docs.google.com/forms/d/e/1FAIpQLSfdzNitw'])if(!homepage.includes(marker))failures.push('Homepage verification/CTA missing: '+marker);
if(!fs.existsSync(path.join(out,'404.html')))failures.push('Static 404.html missing');
if(failures.length){console.error('Curated output validation failed:\n- '+failures.slice(0,30).join('\n- '));process.exitCode=1;}
else console.log('Curated SEO release gate passed: 22 curated pages, 9 retired, '+legacy.length+' legacy paths '+(rollback?'retained under rollback flag':'omitted from output')+', '+(csvSlugs.length-legacy.length-retired.length)+' CSV paths superseded by regional content.');
