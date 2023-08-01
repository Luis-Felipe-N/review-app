import { imgur } from '.'

export async function getAlbum(albumLink: string) {
  const albumHash = albumLink.split('/')[albumLink.split('/').length - 1]

  const album = await imgur.getAlbum(albumHash)
  if (album.success == false) {
    return new Error('Ocorreu um erro ao encontrar as imagens.')
  }
  return album.data
}
