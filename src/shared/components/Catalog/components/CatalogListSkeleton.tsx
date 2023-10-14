import { Grid, Skeleton } from "@mui/material";
import { tss } from "tss-react/mui";

export interface CatalogListSkeletonProps {
    itemsAmount?: number;
}

export default function CatalogListSkeleton({ itemsAmount = 8, }: CatalogListSkeletonProps) {
    const { classes } = useStyles();
    const itemsArray = new Array(itemsAmount).fill(1);

    return itemsArray.map((_, i) => {
        return (
            <Grid item key={i} xs={6} md={4} lg={3}>
                <div className={classes.item}>
                    <div className={classes.coverPhotoWrapp}>
                        <Skeleton className={classes.coverPhoto} component="div" variant="rounded" />
                    </div>
                    <Grid container spacing={1}>
                        <Grid item xs={9}>
                            <Skeleton className={classes.name} component="div" variant="rounded" />                    
                        </Grid>
                        <Grid item xs={3}>
                            <Skeleton className={classes.name} component="div" variant="rounded" />                    
                        </Grid>
                    </Grid>
                    <Skeleton className={classes.actions} component="div" variant="rounded" />
                </div>
            </Grid>
        )
    })
}

const useStyles = tss.create(({ theme }) => ({
    item: {
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing(1),
    },
    coverPhotoWrapp: {
        paddingBottom: '100%',
        width: '100%',
        position: 'relative',
    },
    coverPhoto: {
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
    name: {
        height: 24
    },
    actions: {
        height: 36
    }
}))