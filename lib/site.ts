export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://store-demolition-guide.netlify.app";

export const GOOGLE_SHEET_CSV_URL =
  process.env.GOOGLE_SHEET_CSV_URL ||
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQM4PA0V3kPuQXoYrYKkKwOSH73YAMtIju5Edj_Q_VOV1FXQsF9Ln_dkC5VS3FK8AFkASTFxCX-xseM/pub?gid=0&single=true&output=csv";

export const CTA_URL =
  process.env.NEXT_PUBLIC_CTA_URL ||
  "https://docs.google.com/forms/d/e/1FAIpQLSfdzNitwdwclnvlcy6wj8D73z8kBuRSHsiyCp-L3XB9agx9bQ/viewform?usp=header";

export const THUMBNAIL_IMAGE = "/thumbnail.jpg";
export const LANDING_IMAGE = "/store-demolition-guide.webp";

export function stripSlashes(value: string) {
  return value.trim().replace(/^\/+|\/+$/g, "");
}

export function getPageUrl(slug: string) {
  const siteUrl = SITE_URL.replace(/\/+$/g, "");
  const cleanSlug = stripSlashes(slug);
  return cleanSlug ? `${siteUrl}/${cleanSlug}/` : `${siteUrl}/`;
}

export function getAssetUrl(path: string) {
  const cleanPath = path.trim().replace(/^\/+/g, "");
  return `${SITE_URL.replace(/\/+$/g, "")}/${cleanPath}`;
}
