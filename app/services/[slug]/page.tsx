import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import EditorialPage from '@/components/EditorialPage';
import {services} from '@/lib/editorial-content';
import '../../editorial.css';
type Props={params:Promise<{slug:string}>};
export const dynamicParams=false;
export function generateStaticParams(){return services.map(p=>({slug:p.slug}));}
export async function generateMetadata({params}:Props):Promise<Metadata>{const {slug}=await params;const p=services.find(p=>p.slug===slug);if(!p)return {title:'페이지를 찾을 수 없습니다'};return {title:p.title,description:p.intro,alternates:{canonical:`https://store-demolition-guide.netlify.app/services/${slug}/`},openGraph:{title:p.title,description:p.intro,url:`https://store-demolition-guide.netlify.app/services/${slug}/`,images:[p.image],type:'article'}};}
export default async function Page({params}:Props){const {slug}=await params;const p=services.find(p=>p.slug===slug);if(!p)notFound();return <EditorialPage page={p} group="services"/>;}
