import { notFound } from "next/navigation";
import TestPageClient from "./test-page-client";
import { getTestById } from "@/data/tests-data";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const test = getTestById(resolvedParams?.id);
  if (!test) {
    return {
      title: "Тест не найден",
      description: "Выбранный тест не найден",
    };
  }

  return {
    title: test.title,
    description: test.description,
    alternates: {
      canonical: `https://setly.space/tests/${test.id}`,
    },
  };
}

export default async function TestPage({ params }) {
  const resolvedParams = await params;
  const test = getTestById(resolvedParams?.id);
  if (!test) {
    notFound();
  }

  return <TestPageClient test={test} />;
}
