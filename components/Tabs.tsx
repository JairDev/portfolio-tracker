import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs({
  handleTransactionType,
}: {
  handleTransactionType: (value: string) => void;
}) {
  const [value, setValue] = React.useState(0);

  const handleChange = (e: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    //@ts-ignore
    handleTransactionType(e.target?.dataset.action);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          sx={{
            button: {
              color: "text.primary",
            },
          }}
        >
          <Tab
            onClick={handleClick}
            data-action="buy"
            label="Comprar"
            {...a11yProps(0)}
          />

          <Tab
            onClick={handleClick}
            data-action="sell"
            label="Vender"
            {...a11yProps(1)}
          />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        Comprar
      </TabPanel>
      <TabPanel value={value} index={1}>
        Vender
      </TabPanel>
    </Box>
  );
}
