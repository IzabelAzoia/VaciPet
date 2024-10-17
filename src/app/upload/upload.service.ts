import { Injectable } from '@nestjs/common';
import {
  S3Client,
  PutObjectCommand,
  PutObjectCommandInput,
  ObjectCannedACL,
} from '@aws-sdk/client-s3';

@Injectable()
export class UploadService {
  private s3Client: S3Client;

  constructor() {
    const region = process.env.AWS_REGION;
    const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
    const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

    if (!region || !accessKeyId || !secretAccessKey) {
      throw new Error('AWS credentials and region must be provided.');
    }

    this.s3Client = new S3Client({
      region: region,
      credentials: {
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey,
      },
    });
  }

  public async uploadImageToStorage(
    file: Express.Multer.File,
  ): Promise<string> {
    const params: PutObjectCommandInput = {
      Bucket: process.env.AWS_S3_BUCKET_NAME as string,
      Key: `pets/${Date.now()}_${file.originalname}`,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: ObjectCannedACL.public_read,
    };

    try {
      const command = new PutObjectCommand(params);
      await this.s3Client.send(command);
      return `https://${process.env.AWS_S3_BUCKET_NAME}.s3.amazonaws.com/${params.Key}`;
    } catch (error) {
      console.error('Error uploading image to S3:', error);
      throw new Error('Failed to upload image');
    }
  }
}
