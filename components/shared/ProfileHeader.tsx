import Image from 'next/image'
import React from 'react'



interface Props {
    accountId: string,
    authUserId: string,
    name: string,
    username: string,
    imageUrl: string,
    bio: string,
}

const ProfileHeader = ({
    accountId,
    authUserId,
    name,
    username,
    imageUrl,
    bio,
}:Props) => {
  return (
    <div className="flex w-full flex-col justify-start">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className='relative h-20 w-20 object-cover'>
                    <Image 
                    src={imageUrl}
                    alt='Profile Image'
                    fill
                    className='rounded-full object-cover shadow-2xl'
                    />
                </div>

                <div className="flex-1">
                    <h2 className='text-light-1 text-left text-heading3-bold'>{name}</h2>
                    <p className='text-gray-1 text-base-medium' >{username}</p>
                </div>
            </div>
            </div>

            {/* // community */}

            <p className='mt-6 max-w-lg text-base-regular text-light-2'>{bio}</p>

            <div  className='mt-12 h-0.5 w-full bg-dark-3'/>
        
    </div>
  )
}

export default ProfileHeader