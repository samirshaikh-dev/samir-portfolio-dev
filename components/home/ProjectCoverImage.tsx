"use client";

import ProjectCoverImageShared from "@/components/projects/ProjectCoverImage";

interface ProjectCoverImageProps {
  coverImageUrl?: string | null;
  title: string;
  category?: string | null;
  indexStr: string;
}

export default function ProjectCoverImage({
  coverImageUrl,
  title,
  category,
  indexStr,
}: ProjectCoverImageProps) {
  return (
    <ProjectCoverImageShared
      coverImageUrl={coverImageUrl}
      title={title}
      category={category}
      indexStr={indexStr}
      aspectRatio="card"
    />
  );
}
