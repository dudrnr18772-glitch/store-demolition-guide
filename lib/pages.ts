import fs from "node:fs";
import path from "node:path";
import Papa from "papaparse";
import {stripSlashes} from "./site";

export const PAGES_CSV_PATH=path.join(process.cwd(),"data","pages.csv");
export const REQUIRED_PAGE_COLUMNS=["status","slug","main_keyword","content_angle","tone","manner"] as const;
export type PageStatus="발행"|"publish"|string;
export type PageRecord={status:PageStatus;slug:string;main_keyword:string;content_angle:string;tone:string;manner:string;extra:Record<string,string>};
type RawPageRecord=Record<string,unknown>;
function norm(value:unknown){return String(value??'').trim();}
export function normalizeSlug(slug:string){const clean=stripSlashes(slug);if(clean.includes('/'))throw new Error(`중간 / 포함 slug: ${slug}`);return clean;}
export functionisPublishedStatus(status:string){const s=status.trim().toLowerCase();return s==='발행'||s==='publish';}
export function parsePagesCsv(csv:string):PageRecord[]{
 const parsed=Papa.parse<RawPageRecord>(csv,{header:true,skipEmptyLines:'greedy'});
 if(parsed.errors.length)throw new Error(`CSV 파싱 오류: ${parsed.errors.map(x=>x.message).join('; ')}`);
 const fields=parsed.meta.fields??[];
 const missing=REQUIRED_PAGE_COLUMNS.filter(c=>!fields.includes(c));
 if(missing.length)throw new Error(`CSV 필수 컬럼 누락: ${missing.join(', ')}`);
 const rows=parsed.data.map(row=>({
  status:norm(row.status),slug:normalizeSlug(norm(row.slug)),main_keyword:norm(row.main_keyword),content_angle:norm(row.content_angle),tone:norm(row.tone),manner:norm(row.manner),
  extra:Object.fromEntries(Object.entries(row).filter(([k])=>!(REQUIRED_PAGE_COLUMNS as readonly string[]).includes(k)).map(([k,v])=>[k,norm(v)]).filter(([,v])=>Boolean(v)))
 })).filter(row=>row.slug&&row.main_keyword);
 const seen=newSet<string>();for(const row of rows){if(seen.has(row.slug))throw new Error(`중복 slug: ${row.slug}`);seen.add(row.slug);}
 return rows;
}
let allCache:PageRecord[]|undefined;
let publishedCache:PageRecord[]|undefined;
let bySlugCache:Map<string,PageRecord>|undefined;
export function getAllPages(){if(!allCache){if(!fs.existsSync(PAGES_CSV_PATH))throw new Error(`CSV 파일이 없습니다: ${PAGES_CSV_PATH}. 기존 저장소의 data/pages.csv 파일은 삭제하면 안 됩니다.`);allCache=parsePagesCsv(fs.readFileSync(PAGES_CSV_PATH,'utf8'));}return allCache;}
export function getPublishedPages(){if(!publishedCache)publishedCache=getAllPages().filter(row=>isPublishedStatus(row.status));return publishedCache;}
export function getPageBySlug(slug:string){if(!bySlugCache)bySlugCache=new Map(getPublishedPages().map(p=>[p.slug,p]));return bySlugCache.get(normalizeSlug(slug))??null;}
