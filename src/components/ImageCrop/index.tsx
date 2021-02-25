import React, {FC, useState, useEffect, useRef, useCallback} from 'react';
import ReactCrop, { Crop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import {Button} from "@material-ui/core";

type Props = {
    file: File,
    onCrop: (file?: Blob) => void
}

export const ImageCrop: FC<Props> = ({file, onCrop}) => {
    const [crop, setCrop] = useState<Crop>({
      unit: '%',
      height: 100,
      aspect: 1,
    })
    const [src, setSrc] = useState<string|null>()
    const [croppedImage, setCroppedImage] = useState<Blob>()
    const imageRef = useRef<HTMLImageElement>()


    useEffect(() => {
      const reader = new FileReader()
      reader.addEventListener('load', () =>
        setSrc(reader.result?.toString())
      );
      reader.readAsDataURL(file)
    }, [])

    // If you setState the crop in here you should return false.
    const onImageLoaded = image => {
        imageRef.current = image;
    };

    const onCropChange = (crop, percentCrop) => {
        // You could also use percentCrop:
        // this.setState({ crop: percentCrop });
        setCrop(crop)
    };

    const onCropComplete = useCallback((crop) => {
        const image = imageRef.current!
        const canvas = document.createElement('canvas');
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext('2d');

        ctx?.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
        );

        canvas.toBlob(blob => {
            if (!blob) {
                //reject(new Error('Canvas is empty'));
                console.error('Canvas is empty');
                return;
            }
            setCroppedImage(blob);
        }, 'image/jpeg');
    }, [imageRef.current, crop])

    const onSave = useCallback(() => onCrop(croppedImage),
        [croppedImage])

    return <>
      <ReactCrop
        src={src!}
        crop={crop}
        onImageLoaded={onImageLoaded}
        onComplete={onCropComplete}
        onChange={onCropChange}
      />
        <Button onClick={onSave}>Save</Button>
      </>
}