'use client'

import { Review } from '@/@types'
import { getAlbum } from '@/lib/imgur/getAlbum'
import { AlbumData, ImageData } from 'imgur/lib/common/types'
import image from 'next/image'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { ScrollArea } from '../../ui/scroll-area'

interface GridImagesProps {
  review: Review
}

interface ImageProps {

}

export function GridImages({ review }: GridImagesProps) {
  const [album, setAlbum] = useState<AlbumData>()
  const [currentImage, setCurrentImage] = useState<ImageData>()
  console.log('render')

  useEffect(() => {
    const getAlbumFromImgur = async () => {
      const album = await getAlbum(review.album_link)
      setAlbum(album)
    }

    getAlbumFromImgur()
  }, [])

  useEffect(() => {
    if (album) {
      setCurrentImage(album.images[0])
    }
  }, [album])



  function handleChangeCurrentImage(image: ImageData) {
    setCurrentImage(image)
  }

  return (
    <div className='flex gap-2 items-start'>
      <ScrollArea className='h-full flex-shrink-1'>
        <ul className='flex flex-col gap-1'>
          { album && album.images.map(image => (
            <li
              key={image.id}
              onClick={() => handleChangeCurrentImage(image)} 
              className={currentImage?.id == image.id ? 'border-2 border-purple-500 rounded' : 'border-2 border-transparent rounded overflow-hidden cursor-pointer'}>
              <Image
                src={image.link}
                alt=""
                width={70}
                height={70}
                className="w-72"
              />
            </li>
          ))}
        </ul>
      </ScrollArea>
      <div className='flex-shrink-1 flex-grow-1'>
        { currentImage && (
          <img
            className="w-full rounded-xl"
            src={currentImage.link} alt=""/>
        )}
      </div>
    </div>
  )
}
