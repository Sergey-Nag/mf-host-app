import { Box, Pagination } from "@mui/material";

export interface PaginationControlsProps {
    pages?: number;
    page: number;
    onPageChange: (page: number) => void;
}

export default function PaginationControls({ pages = 5, page, onPageChange, }: PaginationControlsProps) {
    return (
        <Box bgcolor="lightgray" p={1}>
            <Pagination
                count={pages}
                page={page}
                onChange={(_, value) => {
                    onPageChange(value);
                }}
            />
        </Box>
    )
}