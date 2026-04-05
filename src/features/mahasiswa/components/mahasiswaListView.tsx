"use client";

import { Alert, Box, Pagination, Paper, Stack } from "@mui/material";
import { MahasiswaDeleteDialog } from "@/features/mahasiswa/components/mahasiswaDeleteDialog";
import { MahasiswaListTable } from "@/features/mahasiswa/components/mahasiswaListTable";
import { MahasiswaListToolbar } from "@/features/mahasiswa/components/mahasiswaListToolbar";
import { useMahasiswaList } from "@/features/mahasiswa/hooks/useMahasiswaList";

export function MahasiswaListView() {
  const {
    rows,
    loading,
    deleting,
    isEmpty,
    errorMessage,
    successMessage,
    queryInput,
    setQueryInput,
    page,
    setPage,
    totalPages,
    selectedDelete,
    openDeleteDialog,
    closeDeleteDialog,
    confirmDelete,
  } = useMahasiswaList();

  return (
    <main className="min-h-screen bg-[#efede8] px-4 py-6 md:py-10">
      <Box className="mx-auto w-full max-w-6xl">
        <Paper
          elevation={0}
          sx={{
            p: 2,
            borderRadius: "16px",
            border: "1px solid #dccfa8",
            backgroundColor: "#f8f6f1",
          }}
        >
          <MahasiswaListToolbar
            queryInput={queryInput}
            onChangeQuery={setQueryInput}
          />

          {errorMessage ? (
            <Alert severity="error" sx={{ mb: 2 }}>
              {errorMessage}
            </Alert>
          ) : null}

          {successMessage ? (
            <Alert severity="success" sx={{ mb: 2 }}>
              {successMessage}
            </Alert>
          ) : null}

          <MahasiswaListTable
            rows={rows}
            loading={loading}
            isEmpty={isEmpty}
            onDelete={openDeleteDialog}
          />

          <Stack alignItems="center" mt={3}>
            <Pagination
              page={page}
              count={totalPages}
              onChange={(_, nextPage) => setPage(nextPage)}
              color="primary"
              shape="rounded"
            />
          </Stack>
        </Paper>
      </Box>

      <MahasiswaDeleteDialog
        selectedDelete={selectedDelete}
        deleting={deleting}
        onClose={closeDeleteDialog}
        onConfirm={confirmDelete}
      />
    </main>
  );
}
