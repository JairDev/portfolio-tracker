import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useTheme } from "@mui/material/styles";

import Input from "./Input";
import SelectCoin from "./Select";
import BasicTabs from "./Tabs";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  // border: "2px solid red",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

function ChildModal() {
  const { spacing, shape } = useTheme();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button onClick={handleOpen} sx={{ marginTop: spacing(2) }}>
        Siguiente
      </Button>

      <Box>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          // sx={{ border: "1px solid red" }}
        >
          <Box sx={style}>
            <Box>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Transacción
              </Typography>
            </Box>
            <Box>
              <BasicTabs />
            </Box>
            <Box>
              {/* <form onSubmit={formik.handleSubmit}> */}
              <Box sx={{ marginTop: spacing(1) }}>
                <form>
                  <SelectCoin />
                  <Box
                    sx={{
                      display: " flex",
                      justifyContent: "space-between",
                      marginTop: spacing(4),
                    }}
                  >
                    <Box sx={{ width: "45%" }}>
                      <Input
                        id="email"
                        name="email"
                        label="Cantidad"
                        // value={formik.values.email}
                        placeHolder="0.00"
                        // onChange={formik.handleChange}
                        // error={formik.touched.email && Boolean(formik.errors.email)}
                        // helperText={formik.touched.email && formik.errors.email}
                        type="text"
                      />
                    </Box>
                    <Box sx={{ width: "45%" }}>
                      <Input
                        id="password"
                        // name="Precio por moneda"
                        label="Precio por moneda"
                        // value={formik.values.password}
                        placeHolder="$20.000.00"
                        // onChange={formik.handleChange}
                        // error={
                        //   formik.touched.password && Boolean(formik.errors.password)
                        // }
                        // helperText={formik.touched.password && formik.errors.password}
                        type="number"
                      />
                    </Box>
                  </Box>
                  <Box>
                    <Box
                      sx={{
                        border: "1px solid rgba(255, 255, 255, 0.103)",
                        borderRadius: "8px",
                        background: "#160C24",
                        width: "100%",
                        padding: spacing(2),
                        marginTop: spacing(1),
                      }}
                    >
                      <Typography>Total</Typography>
                      <Typography>$20.000.000</Typography>
                    </Box>
                  </Box>

                  <Button
                    variant="contained"
                    sx={{
                      color: "white",
                      width: "100%",
                      padding: spacing(2, 0),
                      marginTop: spacing(2),
                      borderRadius: shape.borderRadius,
                    }}
                    type="submit"
                  >
                    Añadir activo
                  </Button>
                </form>
              </Box>
            </Box>
          </Box>
        </Modal>
      </Box>
    </React.Fragment>
  );
}

export default function BasicModal({ open, handleClose }) {
  const { spacing } = useTheme();

  return (
    <Box sx={{ position: "absolute" }}>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        // sx={{ border: "1px solid red" }}
      >
        <Box sx={style}>
          <Box>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Seleccionar moneda
            </Typography>
          </Box>
          <Box>
            {/* <form onSubmit={formik.handleSubmit}> */}
            <Box sx={{ marginTop: spacing(1) }}>
              <form>
                <SelectCoin />
              </form>
            </Box>
          </Box>
          <ChildModal />
        </Box>
      </Modal>
    </Box>
  );
}
