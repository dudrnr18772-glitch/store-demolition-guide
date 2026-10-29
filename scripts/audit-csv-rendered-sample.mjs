/**
 * Read-only post-build quality audit for a deterministic, stratified 200-page
 * CSV sample. Run after npm run build:
 * node scripts/audit-csv-rendered-sample.mjs
 * Writes to audit-output/ only; no production URLs or files are changed.
 */
import fs from 'node:fs';
import path from 'node:path';
import Papa from 'papaparse';

const site = 'https://store-demolition-guide.netlify.app';
const types = [
  'demolition-cost','restoration-cost','reinstatement-cost',
  'restoration-company','reinstatement-company','demolition-company',
  'business-closure-demolition','demolition-restoration','commercial-demolition',
  'commercial-restoration','restaurant-demolition','cafe-demolition',
  'store-demolition','shop-demolition','closure-support'
];
const root=process.cwd(), csv=fs.readFileSync(path.join(root,'data/pages.csv'),'utf8');
const parsed=Papa.parse(csv,{header:true,skipEmptyLines:'greedy'});
if(parsed.errors.length) throw new Error('CSV parsing error: '+JSON.stringify(parsed.errors.slice(0,3)));
const retired=new Set(JSON.parse(fs.readFileSync(path.join(root,'data/retired-pages.json'),'utf8')));
const records=parsed.data.filter(p=>['발행','publish'].includes(String(p.status).trim())&&!retired.has(p.slug));
const sample=[];
for(let i=0;i<types.length;i++){
  const type=types[i],group=records.filter(p=>p.slug.endsWith('-'+type)),n=i<5?14:13;
  if(group.length<n) throw new Error('Insufficient sample from '+type);
  for(let j=0;j<n;j++) sample.push({...group[(i*29+j*37)%group.length],type});
}
if(sample.length!==200||new Set(sample.map(x=>x.slug)).size!==200) throw new Error('Sample must have 200 unique URLs');
const clean=x=>String(x||'').replace(/<[^>]*>/g,' ').replace(/&nbsp;/g,' ').replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&#(?:39|x27);/g,"'").replace(/\s+/g,' ').trim();
const tags=(html,name)=>[...html.matchAll(new RegExp('<'+name+'\\b[^>]*>([\\s\\S]*?)<\\/'+name+'>','gi'))].map(m=>clean(m[1])).filter(Boolean);
const attribute=(tag,key)=>tag?.match(new RegExp('\\b'+key+'=["\\x27]([^"\\x27]+)["\\x27]','i'))?.[1]||'';
const canonical=(html)=>[...html.matchAll(/<link\b[^>]*>/gi)].map(m=>m[0]).filter(t=>attribute(t,'rel').split(' ').includes('canonical')).map(t=>attribute(t,'href'));
const ps=new Map(),h2=new Map(),qs=new Map();
function recordRepeats(map,values,slug){
  for(const v of new Set(values)){
    if(v.length<35)continue;
    const a=map.get(v)||{count:0,slugs:[]};a.count++;
    if(a.slugs.length<5)a.slugs.push(slug);
    map.set(v,a);
  }
}
const result=[];
for(const p of sample){
  const file=path.join(root,'out',p.slug,'index.html');
  if(!fs.existsSync(file)){result.push({slug:p.slug,type:p.type,keyword:p.main_keyword,status:'missing static HTML',h1:0,h2:0,faq:0,canonical:''});continue;}
  const html=fs.readFileSync(file,'utf8').replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,'').replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi,'');
  const article=html.match(/<article\b[^>]*>([\s\S]*?)<\/article>/i)?.[1]||html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1]||html;
  const hs=tags(article,'h2'),paragraphs=tags(article,'p'),questions=tags(article,'h3').filter(x=>x.includes('?')||x.includes('？'));
  recordRepeats(ps,paragraphs,p.slug);recordRepeats(h2,hs,p.slug);recordRepeats(qs,questions,p.slug);
  const cs=canonical(html),expected=site+'/'+p.slug+'/',h1s=tags(html,'h1');
  result.push({slug:p.slug,type:p.type,keyword:p.main_keyword,status:cs.length===1&&cs[0]===expected&&h1s.length===1?'source reviewed':'technical review',h1:h1s.length,h2:hs.length,faq:questions.length,canonical:cs.join(' | ')});
}
const repeats=map=>[...map.entries()].filter(([,v])=>v.count>=3).sort((a,b)=>b[1].count-a[1].count).slice(0,40).map(([text,v])=>({text,...v}));
const report={sample:200,rendered:result.filter(x=>x.status!=='missing static HTML').length,technicalReview:result.filter(x=>x.status!=='source reviewed').length,repeatedParagraphs:repeats(ps),repeatedH2:repeats(h2),repeatedFaq:repeats(qs),results:result};
const dir=path.join(root,'audit-output');fs.mkdirSync(dir,{recursive:true});
fs.writeFileSync(path.join(dir,'csv-200-rendered-audit.json'),JSON.stringify(report,null,2));
console.log(JSON.stringify({sample:report.sample,rendered:report.rendered,technicalReview:report.technicalReview,repeatedParagraphs:report.repeatedParagraphs.length,repeatedH2:report.repeatedH2.length,repeatedFaq:report.repeatedFaq.length,output:'audit-output/csv-200-rendered-audit.json'}));
if(report.technicalReview)process.exitCode=1;
