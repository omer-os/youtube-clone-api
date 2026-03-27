import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3"

const r2 = new S3Client({
  region: "auto",
  endpoint: `https://${Bun.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: Bun.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: Bun.env.R2_SECRET_ACCESS_KEY!,
  },
})

export const uploadToR2 = async (file: File, folder: string = "uploads") => {
  const key = `${folder}/${crypto.randomUUID()}-${file.name}`

  await r2.send(
    new PutObjectCommand({
      Bucket: Bun.env.R2_BUCKET_NAME!,
      Key: key,
      Body: Buffer.from(await file.arrayBuffer()),
      ContentType: file.type,
    })
  )

  return {
    key,
    url: `${Bun.env.R2_PUBLIC_URL}/${key}`,
    name: file.name,
    size: file.size,
    type: file.type,
  }
}

export const deleteFromR2 = async (url: string) => {
  const key = url.replace(`${process.env.R2_PUBLIC_URL}/`, "")
  await r2.send(
    new DeleteObjectCommand({
      Bucket: Bun.env.R2_BUCKET_NAME!,
      Key: key,
    })
  )
}
