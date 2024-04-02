import { Box, SxProps } from "@mui/material";
import { ColumnSizeType } from "../../types/component.types";

export const Page = ({
  children,
  style = {},
}: {
  children: JSX.Element | JSX.Element[];
  style?: SxProps;
}) => {
  return (
    <Box
      sx={{
        backgroundColor: "#EAECEF",
        paddingTop: "20px",
        paddingBottom: "28px",
        width: "100%",
      }}
    >
      <Box
        sx={{
          width: "1366px",
          margin: "auto",
          display: "block",
          position: "relative",
          ...style,
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export const Line = ({
  children,
  style = {},
}: {
  children: JSX.Element | JSX.Element[];
  style?: SxProps;
}) => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        marginBottom: "20px",
        ...style,
      }}
    >
      {children}
    </Box>
  );
};

export const Column = ({
  children,
  size,
}: {
  children: JSX.Element | JSX.Element[];
  size: ColumnSizeType;
}) => {
  const width = size * 20;
  return (
    <Box
      sx={{
        padding: "0px 12px",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        width: `${width}%`
      }}
    >
      {children}
    </Box>
  );
};

export const WidgetWrapper = ({
  children,
  style = {},
}: {
  children: JSX.Element | JSX.Element[];
  style?: SxProps;
}) => {
  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        padding: "20px",
        borderRadius: "8px",
        ...style,
      }}
    >
      {children}
    </Box>
  );
};
