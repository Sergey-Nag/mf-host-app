import ButtonLink from "@/shared/components/ButtonLink";
import { ButtonProps } from "@mui/material";

export default function NavButton(props: Omit<ButtonProps, 'color' | 'variant' | 'small'>) {
    return <ButtonLink {...props} size="small" variant="text" color="inherit" />;
}
