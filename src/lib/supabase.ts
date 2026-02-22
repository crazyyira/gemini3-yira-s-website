import { createClient } from '@supabase/supabase-js';

// 服务器端使用
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Booking {
  id?: string;
  name: string;
  contact: string;
  booking_date: string;
  booking_time: string;
  booking_type: string;
  details?: string;
  created_at?: string;
}

// 获取 PHOTO bucket 中的所有图片
export async function getPhotos() {
  const { data, error } = await supabase.storage
    .from('PHOTO')
    .list('', {
      limit: 100,
      offset: 0,
      sortBy: { column: 'created_at', order: 'desc' }
    });

  if (error) {
    console.error('Error fetching photos:', error);
    return [];
  }

  // 过滤出图片文件并生成公开 URL
  const photos = data
    .filter(file => {
      const ext = file.name.toLowerCase();
      return ext.endsWith('.jpg') || ext.endsWith('.jpeg') || 
             ext.endsWith('.png') || ext.endsWith('.gif') || 
             ext.endsWith('.webp');
    })
    .map(file => {
      const { data: urlData } = supabase.storage
        .from('PHOTO')
        .getPublicUrl(file.name);
      
      return {
        name: file.name,
        url: urlData.publicUrl,
        created_at: file.created_at
      };
    });

  return photos;
}

// 上传图片到 PHOTO bucket
export async function uploadPhoto(file: File) {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}.${fileExt}`;

  const { data, error } = await supabase.storage
    .from('PHOTO')
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: false
    });

  if (error) {
    throw error;
  }

  return data;
}

// 删除图片
export async function deletePhoto(fileName: string) {
  const { error } = await supabase.storage
    .from('PHOTO')
    .remove([fileName]);

  if (error) {
    throw error;
  }

  return true;
}

// 通用函数：获取指定 bucket 的所有图片
export async function getImagesFromBucket(bucketName: string) {
  const { data, error } = await supabase.storage
    .from(bucketName)
    .list('', {
      limit: 100,
      offset: 0,
      sortBy: { column: 'created_at', order: 'desc' }
    });

  if (error) {
    console.error(`Error fetching images from ${bucketName}:`, error);
    return [];
  }

  const images = data
    .filter(file => {
      const ext = file.name.toLowerCase();
      return ext.endsWith('.jpg') || ext.endsWith('.jpeg') || 
             ext.endsWith('.png') || ext.endsWith('.gif') || 
             ext.endsWith('.webp');
    })
    .map(file => {
      const { data: urlData } = supabase.storage
        .from(bucketName)
        .getPublicUrl(file.name);
      
      return {
        name: file.name,
        url: urlData.publicUrl,
        created_at: file.created_at
      };
    });

  return images;
}

// 通用函数：上传图片到指定 bucket
export async function uploadImageToBucket(bucketName: string, file: File) {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}.${fileExt}`;

  const { data, error } = await supabase.storage
    .from(bucketName)
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: false
    });

  if (error) {
    throw error;
  }

  // 返回公开 URL
  const { data: urlData } = supabase.storage
    .from(bucketName)
    .getPublicUrl(fileName);

  return {
    ...data,
    publicUrl: urlData.publicUrl
  };
}

// 通用函数：从指定 bucket 删除图片
export async function deleteImageFromBucket(bucketName: string, fileName: string) {
  const { error } = await supabase.storage
    .from(bucketName)
    .remove([fileName]);

  if (error) {
    throw error;
  }

  return true;
}



