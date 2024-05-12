import { v2 as cloudinary } from 'cloudinary'
import { NextRequest, NextResponse } from 'next/server'

import { env } from '@/env'

cloudinary.config({
  cloud_name: env.CLOUDINARY_NAME,
  api_key: env.CLOUDINARY_KEY,
  api_secret: env.CLOUDINARY_SECRET,
})

export async function DELETE(
  req: NextRequest,
  { params: { image } }: { params: { image: string } },
) {
  const results = await new Promise((resolve, reject) => {
    cloudinary.api.delete_resources(
      [image],
      {
        type: 'upload',
        resource_type: 'image',
      },
      (err, result) => {
        if (err) {
          reject(err)
          return
        }
        resolve(result)
      },
    )
  })

  return NextResponse.json(results, { status: 200 })
}
