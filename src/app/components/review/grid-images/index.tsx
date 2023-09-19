'use client'

import { Review } from '@/@types'
import { getAlbum } from '@/lib/imgur/getAlbum'
import { AlbumData, ImageData } from 'imgur/lib/common/types'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { ScrollArea } from '../../ui/scroll-area'
import { Skeleton } from '../../ui/skeleton'

import error404 from 'public/monsters-error-404.png'

interface GridImagesProps {
  review: Review
}

export function GridImages({ review }: GridImagesProps) {
  const [album, setAlbum] = useState<AlbumData | Error>()
  const [currentImage, setCurrentImage] = useState<ImageData>()

  useEffect(() => {
    const getAlbumFromImgur = async () => {
      const album = await getAlbum(review.album_link)
      setAlbum(album)
    }

    getAlbumFromImgur()
  }, [review.album_link])

  useEffect(() => {
    if (album && !(album instanceof Error)) {
      setCurrentImage(album.images[0])
    }
  }, [album])

  function handleChangeCurrentImage(image: ImageData) {
    setCurrentImage(image)
  }

  if (album instanceof Error) {
    return (
      <div className="flex flex-col justify-center items-center w-full">
          <Image
            alt="Monstro roxo com cabeça aberta saindo um pó verde. Cara de tonto e escrito 404 no rosto."
            src={error404}
          />
          <h1>
            Não foi possível encontrar as imagens do album:{' '}
            <a
              className="underline"
              href={review.album_link}
              target="_blank"
              rel="noopener noreferrer"
            >
              {review.album_link}
            </a>
          </h1>
        </div>
    )
  }

  if (!album) {
    return (
      <>
      <ScrollArea className="h-full flex-shrink-1">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-28 w-28 rounded" />
          <Skeleton className="h-28 w-28 rounded" />
          <Skeleton className="h-28 w-28 rounded" />
          <Skeleton className="h-28 w-28 rounded" />
          <Skeleton className="h-28 w-28 rounded" />
          <Skeleton className="h-28 w-28 rounded" />
          <Skeleton className="h-28 w-28 rounded" />
        </div>
      </ScrollArea>
      <div className="flex-1 w-full h-full">
        {currentImage && (
          <img
            className="w-full aspect-video rounded-xl"
            src={currentImage.link}
            alt=""
          />
        )}
        <Skeleton className="w-full h-full rounded" />
      </div>
    </>
    )
  }

  return (
    <div className=''>
      <div className='flex items-stretch flex-col gap-4 h-full'>
          <div className='w-ful h-full'>
            {currentImage && (
              <Image
              width={3840}
                height={700}
                className="object-cover block max-h-full w-full rounded"
                src={currentImage.link}
                alt=""
              />
            )}
          </div>

          <ScrollArea className="min-w-28" scrollHideDelay={0}>
            <ul className="flex gap-1 w-full">
              {album &&
                album.images.map((image) => (
                  <li
                    key={image.id}
                    onClick={() => handleChangeCurrentImage(image)}
                    className={
                      currentImage?.id == image.id
                        ? 'border-2 shrink-0 border-purple-500 rounded overflow-hidden'
                        : 'border-2 shrink-0 border-transparent rounded overflow-hidden cursor-pointer'
                    }
                  >
                    <Image
                      src={image.link}
                      alt=""
                      width={100}
                      height={100}
                      className="lg:h-28 lg:w-28 h-20 w-20"
                    />
                  </li>
                ))}
            </ul>
          </ScrollArea>
        </div>
    </div>
  )
}
