import { v2 as cloudinary } from 'cloudinary'
import { NextRequest, NextResponse } from 'next/server'

import { env } from '@/env'

cloudinary.config({
  cloud_name: env.CLOUDINARY_NAME,
  api_key: env.CLOUDINARY_KEY,
  api_secret: env.CLOUDINARY_SECRET,
})

export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const file = formData.get('photo') as File
  const arrayBuffer = await file.arrayBuffer()
  const buffer = new Uint8Array(arrayBuffer)

  const results = await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({}, (err, result) => {
        if (err) {
          reject(err)
          return
        }
        resolve(result)
      })
      .end(buffer)
  })

  return NextResponse.json(results, { status: 200 })
}
