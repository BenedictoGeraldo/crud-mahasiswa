"use client";

import { useRouter } from "next/navigation";
import {
  CircularProgress,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import EditSquareIcon from "@mui/icons-material/EditSquare";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import type { Mahasiswa } from "@/features/mahasiswa/types/mahasiswa.type";

type Props = {
  rows: Mahasiswa[];
  loading: boolean;
  isEmpty: boolean;
  onDelete: (row: Mahasiswa) => void;
};

export function MahasiswaListTable({
  rows,
  loading,
  isEmpty,
  onDelete,
}: Props) {
  const router = useRouter();

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 600 }}>NIM</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Nama</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Email</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Jurusan</TableCell>
            <TableCell align="center" sx={{ fontWeight: 600 }}>
              Aksi
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={5} align="center" sx={{ py: 6 }}>
                <CircularProgress size={26} />
              </TableCell>
            </TableRow>
          ) : null}

          {isEmpty ? (
            <TableRow>
              <TableCell colSpan={5} align="center" sx={{ py: 6 }}>
                Tidak ada data mahasiswa.
              </TableCell>
            </TableRow>
          ) : null}

          {!loading &&
            rows.map((item) => (
              <TableRow key={item.id} hover>
                <TableCell>{item.nim}</TableCell>
                <TableCell>{item.nama}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.jurusan}</TableCell>
                <TableCell align="right">
                  <Stack
                    direction="row"
                    spacing={0.5}
                    justifyContent="flex-end"
                  >
                    <Tooltip title="Lihat detail">
                      <IconButton
                        size="small"
                        onClick={() => router.push("/mahasiswa/" + item.id)}
                        sx={{ color: "#1d4e89" }}
                        aria-label="Lihat detail mahasiswa"
                      >
                        <RemoveRedEyeOutlinedIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Edit">
                      <IconButton
                        size="small"
                        onClick={() =>
                          router.push("/mahasiswa/" + item.id + "/edit")
                        }
                        sx={{ color: "#be931b" }}
                        aria-label="Edit mahasiswa"
                      >
                        <EditSquareIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Hapus">
                      <IconButton
                        size="small"
                        onClick={() => onDelete(item)}
                        sx={{ color: "#b42318" }}
                        aria-label="Hapus mahasiswa"
                      >
                        <DeleteOutlinedIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
