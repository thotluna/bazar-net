/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
'use client'

import { useState } from 'react'
import { ArrowBack } from '..'
import { RaitingBar } from '../raiting-bar'

interface Props {
  thumbnail: string
  images: string[]
  title: string
  rating: number
}

export function Carrousel({ thumbnail, images, title, rating }: Props) {
  const [srcPicture, setSrcPicture] = useState(0)

  return (
    <>
      <div className="w-full aspect-auto flex items-center justify-center mb-2">
        <figure className=" relative mx-auto  sm:max-h-60 sm:aspect-[16/9] flex items-center justify-center ">
          <img
            data-testid="preview-image"
            className="rounded-xl w-full sm:w-[460px] max-h-60 sm: object-cover shadow-md "
            src={images[srcPicture] || thumbnail}
            alt={title}
          />
          <div className="absolute top-2 end-1 sm:-end-6">
            <RaitingBar value={rating} />
          </div>
        </figure>
      </div>
      <section className="flex">
        <button
          onClick={() => setSrcPicture((prev) => (prev > 0 ? prev - 1 : images.length - 1))}
          className="text-[var(--color-carrousel-text)] hover:scale-110 transition-transform duration-150"
        >
          <ArrowBack label="back image" />
        </button>
        <div className="flex flex-1">
          {images?.map((url, index) => (
            <button
              key={index}
              onClick={() => setSrcPicture(index)}
              className={` border-4 ${
                srcPicture === index ? 'border-[var(--color-carrousel-border)]' : 'border-transparent'
              }`}
            >
              <img
                data-testid="carrousel-image"
                width={240}
                className={`object-cover w-60 aspect-[16/9] `}
                src={url}
                alt={`Image #${index} of ${title}`}
              />
            </button>
          ))}
        </div>
        <button
          onClick={() => setSrcPicture((prev) => (prev < images.length - 1 ? prev + 1 : 0))}
          className="rotate-180 text-[var(--color-carrousel-text)] hover:scale-110 transition-transform duration-150"
        >
          <ArrowBack label="next image" />
        </button>
      </section>
    </>
  )
}
