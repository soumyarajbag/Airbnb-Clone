import { bytesToMb } from '@/lib/utils';
import * as yup from 'yup';

export const homeSchema = yup
  .object({
    title : yup.string().required().min(5).max(50),
    country : yup.string().required().min(5).max(50),
    state : yup.string().required().min(5).max(50),
    city : yup.string().required().min(5).max(50),
    price : yup.number().required().typeError("Price must be a number"),
    description : yup.string().required().min(10).max(20000),
    categories : yup.mixed<Array<string> | []>().required().test( "categories" ,"Please At Least One Category !" , (data:any)=>{
        const isValid = data?.length > 1 ? true : false
        return isValid;
    } ),
    image : yup.mixed().required().test( "image" ,"Only JPEG/PNG/WEPB format are allowed !" , (file:any)=>{
            const isValid = file?.type==="image/jpeg" || file?.type==="image/png" || file?.type==="image/webp" ? true : false
            return isValid;
  })
  .test(
    "imageSize" , "Image must be Less than 2 MB " , (file:any)=>{
        const isValid = bytesToMb(file?.size) < 2 ? true : false
        return isValid;
    }
  )
}) 
export type AddHomeType = yup.InferType<typeof homeSchema>