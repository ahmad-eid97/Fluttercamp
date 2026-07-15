//= Components
import Grid from "@mui/material/Grid";
//= Styles
import cls from "./user.module.scss"

type Props = {
  children: React.ReactNode;
  value: number;
  index: number;
}

export default function TabPanel({ children, value, index, ...other }: Props) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Grid container spacing={3} sx={{ alignItems: 'center', justifyContent: 'flex-start' }}>{children}</Grid>
      )}
    </div>
  );
}