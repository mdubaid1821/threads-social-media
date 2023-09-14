import Image from 'next/image'
import Link from 'next/link'
import React from 'react'



interface Props {
    id:string,
currentUserId:string,
parentId:string | null,
content:string,
author:{
    name:string,
    image:string,
    id:string
},
community:{
    name:string,
    image:string,
    id:string
} | null ,
createdAt:string,
comments:{
    author:{
        image:string,
    }
}[]
isComment? : boolean
}

const ThreadCard = ({
    id,
currentUserId,
parentId,
content,
author,
community,
createdAt,
comments,
isComment,
}:Props) => {
  return (
    <article className={isComment ? 'px-0 xs:p-7' : ' bg-dark-2 p-7'}> 

    <div className="flex items-start justify-between">
        <div className="flex w-full flex-1 flex-row gap-4">
            <div className='flex flex-col items-center'>
                <Link href={`/profile/${author.id}`} className='relative h-11 w-11'>
                    <Image
                    src={author.image}
                    alt='Loading'
                    fill
                    className='cursor-pointer rounded-full'
                     />
                </Link>

                <div className='thread-card_bar'/>
            </div>

            <div className='flex w-full flex-col'>
            <Link href={`/profile/${author.id}`} className='w-fit'>
                   <h4 className="cursor-pointer text-base-semibold text-light-1">{author.name}</h4>
                </Link>

                <p className="mt-2 text-small-regular text-light-2">{content}</p>

                <div className="mt-5 flex flex-col gap-3" >
                    <div className="flex gap-3.5">
                    <Image
                    src={'/images/heart.svg'}
                    alt='Like'
                    width={25}
                    height={25}
                    className='cursor-pointer object-contain'
                     />

                    <Link href={`/thread/${id}`}>
                    <Image
                    src={'/images/reply.svg'}
                    alt='Reply'
                    width={25}
                    height={25}
                    className='cursor-pointer object-contain'
                     />
                    </Link>

                    <Image
                    src={'/images/share.svg'}
                    alt='Share'
                    width={25}
                    height={25}
                    className='cursor-pointer object-contain'
                     />

                    <Image
                    src={'/images/repost.svg'}
                    alt='Repost'
                    width={25}
                    height={25}
                    className='cursor-pointer object-contain'
                     />
                    </div>

                    {
                        isComment && comments.length > 0 &&(
                            <Link href={`/profile/${id}`}>
                                <p className='mt-1 text-subtle-medium text-gray-1'>{comments.length}</p>
                            </Link>
                        )
                    }
                </div>
            </div>
        </div>
    </div>

    </article>
  )
}

export default ThreadCard