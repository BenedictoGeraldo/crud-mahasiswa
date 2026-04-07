"use client";

import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Stack,
  Typography,
  type SxProps,
  type Theme,
} from "@mui/material";
import type { ReactNode } from "react";

type GlobalDialogProps = {
  open: boolean;
  title: string;
  message: ReactNode;
  onClose: () => void;
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
  loading?: boolean;
  destructive?: boolean;
};

const buttonBaseSx: SxProps<Theme> = {
  textTransform: "none",
  fontWeight: 700,
  fontSize: { xs: "0.9rem", sm: "1rem" },
  borderRadius: "12px",
  minHeight: 44,
  px: 2.5,
  boxShadow: "none",
};

export function GlobalDialog({
  open,
  title,
  message,
  onClose,
  onConfirm,
  confirmText = "Sure, Continue!",
  cancelText = "Maybe This Time",
  loading = false,
  destructive = false,
}: GlobalDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={loading ? undefined : onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          borderRadius: "28px",
          p: { xs: 1, sm: 2 },
          backgroundColor: "#f3f3f3",
          boxShadow: "0 14px 45px rgba(18, 20, 27, 0.18)",
        },
      }}
    >
      <DialogContent sx={{ px: { xs: 1.5, sm: 2 }, py: { xs: 1.5, sm: 2 } }}>
        <Stack spacing={3.5}>
          <Stack spacing={1.7}>
            <Stack direction="row" alignItems="center" spacing={1.2}>
              <InfoOutlinedIcon sx={{ fontSize: 30, color: "#a2a2a8" }} />
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 800,
                  lineHeight: 1.2,
                  color: "#111317",
                  fontSize: { xs: "1.35rem", sm: "2rem" },
                }}
              >
                {title}
              </Typography>
            </Stack>

            <Typography
              sx={{
                color: "#2f3338",
                lineHeight: 1.6,
                fontSize: { xs: "1rem", sm: "1.08rem" },
                maxWidth: "62ch",
              }}
            >
              {message}
            </Typography>
          </Stack>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 1.2,
              flexWrap: "wrap",
            }}
          >
            <Button
              onClick={onClose}
              disabled={loading}
              sx={{
                ...buttonBaseSx,
                color: "#2d2f34",
                backgroundColor: "transparent",
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.05)",
                },
              }}
            >
              {cancelText}
            </Button>

            <Button
              onClick={onConfirm}
              disabled={loading}
              variant="contained"
              sx={{
                ...buttonBaseSx,
                color: "#202228",
                backgroundColor: destructive ? "#f8d4d1" : "#e5e5e8",
                "&:hover": {
                  backgroundColor: destructive ? "#efc1bc" : "#d6d7db",
                },
              }}
            >
              {confirmText}
            </Button>
          </Box>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
