"use client";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

const words = "Discover New Destinations, Book with Ease – Begin Your Adventure Today!";






export function TextGenerateEffectDemo() {
  return <TextGenerateEffect duration={2} filter={false} words={words} />;
}
