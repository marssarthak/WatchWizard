import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';



const size = {
  width: 300,
  height: 160,
};

const StyledText = styled('text')(({ theme }) => ({
  fill: theme.palette.text.primary,
  textAnchor: 'middle',
  dominantBaseline: 'central',
  fontSize: 20,
}));

function PieCenterLabel({ children }: {children: string}) {
  const { width, height, left, top } = useDrawingArea();
  return (
    <StyledText x={left + width / 2} y={top + height / 2}>
      {children}
    </StyledText>
  );
}

type Props = {
  completed: number,
  remaining: number
}

export default function PieChartWithCenterLabel(props: Props) {
  const data = [
    { label: 'Completed ', value: props.completed, color: '#00C49F' },
    { label: 'Remaining ', value: props.remaining, color: '#FF8042' },
  ];
  return (
    <PieChart series={[{ data, innerRadius: 80 }]} {...size}>
      <PieCenterLabel>progress</PieCenterLabel>
    </PieChart>
  );
}