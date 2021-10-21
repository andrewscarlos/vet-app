import React, { useEffect, useState } from "react";
import { useTheme } from "@material-ui/core/styles";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";
import { getHours } from 'date-fns'

const Chart = () => {
  const theme = useTheme();
  const [dataGrafico, setData] = useState([])
  const [numberAtendidos, setNumberAtendidos] = useState(0)

  const [modal, setshowmodal] = useState(false)

  const API = axios.create({
    baseURL: "http://localhost:5001",
  });
  const host = "http://localhost:5001/";
  const createData= (time, amount)=> {
    return { time, amount };
  }
  const getToday = async () => {
    const { data } = await API.get(`${host}animaistoday`)
      .then((r) => r)
      .catch((e) => e);
    return data;
  };
  let count = 0 
  const dataAraay = []

  useEffect(async()=>{
    const response = await getToday()
    response.forEach(element => {
        count++
        const horas = getHours(new Date(element.createdAt))
        dataAraay.push({time: horas, amount:count})
    });
    setshowmodal(true)
    setData(dataAraay)
},[])

  return (
    <React.Fragment>
        {   
            modal ?
             <ResponsiveContainer>
            <LineChart
              data={dataGrafico}
              margin={{
                top: 16,
                right: 16,
                bottom: 0,
                left: 24,
              }}
            >
              <XAxis dataKey="time" stroke={theme.palette.text.secondary} />
              <YAxis stroke={theme.palette.text.secondary}>
                <Label
                  angle={270}
                  position="left"
                  style={{ textAnchor: "middle", fill: theme.palette.text.primary }}
                >
                  Hoje
                </Label>
              </YAxis>
              <Line
                type="monotone"
                dataKey="amount"
                stroke={theme.palette.primary.main}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer> 
          : null
        }
      

    </React.Fragment>
  );
};

export default Chart;
