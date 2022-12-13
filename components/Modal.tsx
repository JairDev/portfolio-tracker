import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import ContentBox from "components/ContentInputBox";
import { useTheme } from "@mui/material/styles";

import Select from "./Select";
import Input from "./Input";
import SelectCoin from "./Select";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({ open, handleClose }) {
  // const [open, setOpen] = React.useState(false);
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);
  const { spacing, shape } = useTheme();

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
              Transacción
            </Typography>
          </Box>
          <Box>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Comprar
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Vender
            </Typography>
          </Box>
          <Box>
            {/* <form onSubmit={formik.handleSubmit}> */}
            <Box sx={{ marginTop: spacing(1) }}>
              <form>
                {/* <ContentBox> */}
                <SelectCoin />
                <Box sx={{ display: " flex", marginTop: spacing(4) }}>
                  <Box sx={{ width: "45%" }}>
                    <Input
                      id="email"
                      name="email"
                      label="Cantidad"
                      // value={formik.values.email}
                      // placeHolder="jhondoe@example.com"
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
                      // placeHolder="password"
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
                  <Input
                    id="password"
                    name="password"
                    // label="Contraseña"
                    // value={formik.values.password}
                    // placeHolder="password"
                    // onChange={formik.handleChange}
                    // error={
                    //   formik.touched.password && Boolean(formik.errors.password)
                    // }
                    // helperText={formik.touched.password && formik.errors.password}
                    type="password"
                  />
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
                {/* </ContentBox> */}
              </form>
            </Box>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
