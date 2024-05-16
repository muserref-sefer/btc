
import { SyntheticEvent } from "react";
const notFoundImage = "/assets/img-not-found.jpeg";
const placeholderImage = "/assets/img-placeholder.jpeg";

export function slugify(str: string) {
  if (str) {
    str = str.replace(/^\s+|\s+$/g, ''); 
    str = str.toLowerCase(); 
    str = str.replace(/[^a-z0-9 -]/g, '') 
             .replace(/\s+/g, '-') 
             .replace(/-+/g, '-');
  }

  return str;
}

export function onImageError (e: SyntheticEvent<HTMLImageElement, Event>) {
  const imgElement = e.target as HTMLImageElement;
  if (imgElement.src !== placeholderImage) {
    imgElement.src = notFoundImage;
  }
}