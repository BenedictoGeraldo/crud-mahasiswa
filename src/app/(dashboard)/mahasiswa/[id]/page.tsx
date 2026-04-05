import { MahasiswaDetailView } from "@/features/mahasiswa/components/mahasiswaDetailView";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function MahasiswaDetailPage({ params }: PageProps) {
  const { id } = await params;
  const numericId = Number.parseInt(id, 10);

  return <MahasiswaDetailView id={numericId} />;
}
