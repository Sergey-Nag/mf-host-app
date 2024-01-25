import Carousel from "@/shared/components/Carousel/Carousel";
import Section from "@/shared/components/Section";

function SliderSection() {
    return (
        <Section maxWidth="xl">
            <Carousel
                images={[
                    {
                        url: "https://img.freepik.com/free-photo/close-up-minimalist-shot-generic-laptop-computer-working-accessories-resting-wooden-table_273609-1706.jpg?w=1380&t=st=1696278265~exp=1696278865~hmac=221a502c4badbf608a5d6d20d7ef3d19f3668677404d3daf73315056faea4b13",
                        alt: "some image",
                    },
                    {
                        url: "https://img.freepik.com/free-photo/smiling-teenage-girl-with-red-hair-gives-recommendation-pointing-copy-space-breaks-through-blue-paper-hole_273609-46488.jpg?w=1480&t=st=1696278250~exp=1696278850~hmac=c407a772dee1bdb64cc72e50ec2436cd146cc97affa7852039b648376c43448e",
                        alt: "some another image",
                    },
                    {
                        url: "https://img.freepik.com/free-photo/psychedelic-paper-shapes-different-color-tones_23-2149378249.jpg?w=1380&t=st=1696278231~exp=1696278831~hmac=321fddf6c477acda0de21bcbeb5b7670ab688121a75a0b3b8e3f8f5954fa0c22",
                        alt: "some 3 image",
                    },
                    {
                        url: "https://img.freepik.com/free-vector/realistic-glassmorphism-background_52683-87290.jpg?w=1380&t=st=1696278102~exp=1696278702~hmac=ae7862ffa5eb6bc5d8991adc06c78e687d18fee726c41f9bf3a83a4b4bdf6e68",
                        alt: "some 4 image",
                    },
                ]}
            />
        </Section>
    );
}

export default SliderSection;
