"use client";

import QuestionsList from "./components/QuestionsList";


export default function Home() {
  return (
    <section className="flex flex-col justify-center items-center w-full h-full px-6 py-8">
      
      <QuestionsList />
    </section>
  );
}
