'use client';
import Loading from "@/components/Loading";
import Link from "next/link";

export default function Card({ title, content, isLoading, linkLeft, linkRight }) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 w-full max-w-md my-4 border-2">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-black">{title}</h2>
      </div>

      <div className="border-t-2 border-[var(--primary)] my-3" />

      <div className="flex justify-center items-center">
        {isLoading ? (
          <Loading alt={false} />
        ) : (
          <>
            {linkLeft && (
              <Link
                href={linkLeft.href}
                className="text-left mr-auto hover:brightness-125 transition duration-200"
              >
                <p className="text-sm font-semibold text-black">
                  {linkLeft.label}
                </p>
                <p className="text-2xl font-bold text-[var(--primary)]">
                  {linkLeft.value}
                </p>
              </Link>
            )}

            {linkRight && (
              <Link
                href={linkRight.href}
                className="text-right hover:brightness-125 transition duration-200"
              >
                <p className="text-sm font-semibold text-black">
                  {linkRight.label}
                </p>
                <p className="text-lg font-medium text-gray-500">
                  {linkRight.value}
                </p>
              </Link>
            )}

            {!linkLeft && !linkRight && (
              <Link 
                href={content.href}
                className="text-right hover:brightness-125 transition duration-200">
                <p className="text-2xl font-bold text-[var(--primary)]">
                  {content.value}
                </p>
              </Link>
            )}
          </>
        )}
      </div>
    </div>
  );
}
