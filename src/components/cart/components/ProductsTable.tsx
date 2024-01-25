import Delete from "@mui/icons-material/Delete";
import { Box, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from "@mui/material";
import Image from "next/image";
import { CartProduct } from "./Products";
import { QuantityCounter } from "../../../shared/components/QuantityCounter";

export interface ProductsTableProps {
    products: CartProduct[];
    productsQuantity: Record<string, number>;
    totalProuctsPrice: Record<string, number>;
    totalPrice: number;
    removeFromCart: (id: string) => void;
    increaseProduct: (id: string) => void;
    decreaseProduct: (id: string) => void;
}

export function ProductsTable({
    products, productsQuantity, totalProuctsPrice, totalPrice, removeFromCart,
    increaseProduct, decreaseProduct,
}: ProductsTableProps) {

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Product</TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell align="right">Quantity</TableCell>
                        <TableCell align="right">Total</TableCell>
                        <TableCell width={50} />
                    </TableRow>
                </TableHead>
                <TableBody>
                    {products.map((prod) => (
                        <TableRow key={prod.id}>
                            <TableCell>
                                <Box display="flex" alignItems="center" gap={2}>
                                    <Image
                                        src={prod.imageUrl}
                                        alt={prod.name}
                                        width={100}
                                        height={100}
                                        style={{
                                            objectFit: 'cover',
                                        }}
                                    />
                                    <span>
                                        {prod.name}
                                    </span>
                                </Box>
                            </TableCell>
                            <TableCell align="right">${prod.price.toFixed(2)}</TableCell>
                            <TableCell align="right">
                                <QuantityCounter
                                    value={productsQuantity[prod.id]}
                                    max={prod.maxQuantity}
                                    onChange={(value) => {
                                        if (value > productsQuantity[prod.id]) {
                                            increaseProduct(prod.id);
                                        } else {
                                            decreaseProduct(prod.id);
                                        }
                                    }}
                                />
                            </TableCell>
                            <TableCell align="right">
                                ${totalProuctsPrice[prod.id].toFixed(2)}
                            </TableCell>
                            <TableCell align="right">
                                <IconButton color="error" onClick={() => removeFromCart(prod.id)}>
                                    <Delete />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={3} align="right">Total:</TableCell>
                        <TableCell
                            sx={{ fontWeight: 'bold' }}
                            align="right"
                        >
                            ${totalPrice.toFixed(2)}
                        </TableCell>
                        <TableCell />
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    );
}