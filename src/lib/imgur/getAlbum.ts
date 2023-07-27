import { imgur } from ".";

export async function getAlbum(albumLink: string){
  const albumHash = albumLink.split('/')[albumLink.split('/').length - 1]

  const { data: album } = await imgur.getAlbum(albumHash)
  return album
} 