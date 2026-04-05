import { MahasiswaEditView } from "@/features/mahasiswa/components/mahasiswaEditView";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function MahasiswaEditPage({ params }: PageProps) {
  const { id } = await params;
  const numericId = Number.parseInt(id, 10);

  return <MahasiswaEditView id={numericId} />;
}
