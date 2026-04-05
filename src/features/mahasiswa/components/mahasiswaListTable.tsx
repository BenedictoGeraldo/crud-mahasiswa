"use client";

import { useRouter } from "next/navigation";
import {
  Button,
  CircularProgress,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
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
            <TableCell>NIM</TableCell>
            <TableCell>Nama</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Jurusan</TableCell>
            <TableCell align="center">Aksi</TableCell>
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
                  <Stack direction="row" spacing={1} justifyContent="flex-end">
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => router.push("/mahasiswa/" + item.id)}
                      sx={{ textTransform: "none" }}
                    >
                      Detail
                    </Button>

                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() =>
                        router.push("/mahasiswa/" + item.id + "/edit")
                      }
                      sx={{ textTransform: "none" }}
                    >
                      Edit
                    </Button>

                    <Button
                      size="small"
                      color="error"
                      variant="outlined"
                      onClick={() => onDelete(item)}
                      sx={{ textTransform: "none" }}
                    >
                      Hapus
                    </Button>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
