import { Button, ButtonProps } from "@mui/material";
import Link from "next/link";

export default function ButtonLink(props: Omit<ButtonProps, 'LinkComponent'>) {
    return <Button {...props} LinkComponent={Link} />;
}
