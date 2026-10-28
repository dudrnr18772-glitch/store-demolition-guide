/** Previous regional priority pages were retired on 2026-10-28. */
export type PriorityPage={slug:string;title:string;description:string;summary:string;checks:string[];note:string;relevant:string[]};
export const priorities:PriorityPage[]=[];
export const priorityMap=new Map(priorities.map(page=>[page.slug,page]));
