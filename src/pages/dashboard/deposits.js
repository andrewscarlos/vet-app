import React from 'react';
import { format,moment, formatDistance, formatRelative, subDays } from 'date-fns'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';


function preventDefault(event) {
    event.preventDefault();
}

const useStyles = makeStyles({
    depositContext: {
        flex: 1,
    },
});

const dataFormat =  format( new Date (), 'yyyy-MM-dd')

export default function Deposits() {
    const classes = useStyles();
    return (
        <React.Fragment>
            <Typography component="p" variant="h4">
                $3,024.00
            </Typography>
            <div>
                <p> Atendidos Hoje </p>
                {dataFormat}
            </div>
        </React.Fragment>
    );
}