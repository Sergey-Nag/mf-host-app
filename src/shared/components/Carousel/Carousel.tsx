import Image from "next/image";
import Slider from 'react-slick';
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { tss } from "tss-react/mui";
import { NextSlideButton, PrevSlideButton } from "./CarouselActionButtons";

export interface CarouselProps {
    images: {url: string, alt: string}[],
    className?: string
}

export default function Carousel({ images, className }: CarouselProps) {
    const { classes } = useStyles();
    return (
        <Slider
            dots
            infinite
            arrows
            prevArrow={<PrevSlideButton />}
            nextArrow={<NextSlideButton />}
            className={className}
        >
            {images.map(({ url, alt }, index) => (
                <Image 
                    key={index} 
                    className={classes.slide} 
                    src={url} 
                    alt={alt} 
                    priority={index === 0} 
                    width={1488} 
                    height={720}
                />
            ))}
        </Slider>
    )
}
const useStyles = tss.create(({ theme }) => ({
    slide: {
        height: '600px',
        background: 'purple',
        color: 'white',
        objectFit: 'cover',
    },
}));
