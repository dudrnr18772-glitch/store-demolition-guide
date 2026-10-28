import rawPages from '@/data/regional-pages.json';
export type RegionalPage={
 key:string;city:string;label:string;keyword:string;slug:string;title:string;description:string;
 badge:string;intro:string;focus:string[];summary:string;
 hero:string;visualAlt:string;micro:string;
 local:{heading:string;paras:string[];checks:string[]};
 sections:[string,string[],string[]][];
 matrix:[string,string,string][];
 faqs:[string,string][];
 links:[string,string][];
 sources:[string,string][];
};
export const REGION_SITE='https://store-demolition-guide.netlify.app';
export const regionalPages:RegionalPage[]=rawPages as RegionalPage[];
export const regionalBySlug=new Map(regionalPages.map(p=>[p.slug,p]));
export function getRegionalPage(slug:string){return regionalBySlug.get(slug.replace(/^\/+|\/+$/g,''));}
