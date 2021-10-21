import React, { useEffect, useState } from 'react';
import { format,moment, formatDistance, formatRelative, subDays } from 'date-fns'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import axios from "axios";


const useStyles = makeStyles({
    depositContext: {
        flex: 1,
    },
});

const dataFormat =  format( new Date (), 'yyyy-MM-dd')

const Deposits = ()=> {
    const classes = useStyles();
    
    const API = axios.create({
        baseURL: "http://localhost:5001",
      });
    const host = "http://localhost:5001/";
    
    const getToday = async ()=>{
        const { data } =  await API.get(`${host}animaistoday`).then((r) => r).catch(e => e);
        return data
    };
    const [numberAtendidos, setNumberAtendidos] = useState(0)
    
    useEffect(async()=>{
        const response = await getToday()
        setNumberAtendidos(response.length)
    },[])
    return (
        <React.Fragment>
            <Typography component="p" variant="h4">
                {numberAtendidos}
            </Typography>
            <div>
                <p> Atendidos Hoje </p>
                {dataFormat}
            </div>
        </React.Fragment>
    );
};

export default Deposits;