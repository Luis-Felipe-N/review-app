import { imgur } from ".";

export async function getThumbnail(albumLink: string){
  const albumHash = albumLink.split('/')[albumLink.split('/').length - 1]

  const { data: album } = await imgur.get(`album/${albumHash}/images`)
  return album
} 