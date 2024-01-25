import { Box, Typography } from "@mui/material";

export interface ProductCharacteristicsProps {
    characteristics: { name: string, value: string }[];
}

export function ProductCharacteristics({ characteristics: chars }: ProductCharacteristicsProps) {
    return (
        <Box>
            <Typography variant="h6" gutterBottom marginTop={2}>
                Characteristics
            </Typography>
            <Typography variant="body1" gutterBottom paddingLeft={3}>
                <ul>
                    {chars.map((char) => (
                        <li key={char.name}>
                            <Typography variant="body1">
                                <strong>{char.name}</strong>: {char.value}
                            </Typography>
                        </li>
                    ))}
                </ul>
            </Typography>
        </Box>
    )
}