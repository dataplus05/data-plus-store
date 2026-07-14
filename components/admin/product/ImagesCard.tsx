"use client";

import { useRef, useState } from "react";
import { ImagePlus, Star, Trash2, UploadCloud } from "lucide-react";

import Card from "@/components/ui/Card";

type PreviewImage = {
  id: string;
  file: File;
  previewUrl: string;
  isPrimary: boolean;
};

const MAX_IMAGES = 8;
const MAX_FILE_SIZE = 5 * 1024 * 1024;

export default function ImagesCard() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState<PreviewImage[]>([]);
  const [error, setError] = useState("");

  function openFilePicker() {
    inputRef.current?.click();
  }

  function handleFiles(files: FileList | null) {
    if (!files) {
      return;
    }

    setError("");

    const availablePlaces = MAX_IMAGES - images.length;

    if (availablePlaces <= 0) {
      setError(`يمكن رفع ${MAX_IMAGES} صور كحد أقصى.`);
      return;
    }

    const selectedFiles = Array.from(files).slice(
      0,
      availablePlaces
    );

    const validFiles = selectedFiles.filter((file) => {
      const isImage = file.type.startsWith("image/");
      const isAllowedSize = file.size <= MAX_FILE_SIZE;

      return isImage && isAllowedSize;
    });

    if (validFiles.length !== selectedFiles.length) {
      setError(
        "تم تجاهل ملفات غير صالحة. يجب أن تكون الصور بحجم لا يتجاوز 5MB."
      );
    }

    const newImages = validFiles.map((file, index) => ({
      id: `${file.name}-${file.lastModified}-${index}`,
      file,
      previewUrl: URL.createObjectURL(file),
      isPrimary: images.length === 0 && index === 0,
    }));

    setImages((current) => [...current, ...newImages]);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  function removeImage(id: string) {
    setImages((current) => {
      const imageToRemove = current.find(
        (image) => image.id === id
      );

      if (imageToRemove) {
        URL.revokeObjectURL(imageToRemove.previewUrl);
      }

      const remainingImages = current.filter(
        (image) => image.id !== id
      );

      if (
        remainingImages.length > 0 &&
        !remainingImages.some((image) => image.isPrimary)
      ) {
        remainingImages[0] = {
          ...remainingImages[0],
          isPrimary: true,
        };
      }

      return remainingImages;
    });
  }

  function makePrimary(id: string) {
    setImages((current) =>
      current.map((image) => ({
        ...image,
        isPrimary: image.id === id,
      }))
    );
  }

  return (
    <Card
      title="صور المنتج"
      description="ارفع صورًا واضحة للمنتج. ستكون الصورة الرئيسية هي التي تظهر في بطاقات المتجر."
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        multiple
        className="hidden"
        onChange={(event) =>
          handleFiles(event.target.files)
        }
      />

      <button
        type="button"
        onClick={openFilePicker}
        className="flex min-h-52 w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 p-8 text-center transition hover:border-orange-300 hover:bg-orange-50"
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-100 text-orange-600">
          <UploadCloud size={31} />
        </div>

        <p className="mt-5 font-black text-gray-950">
          اضغط لاختيار صور المنتج
        </p>

        <p className="mt-2 text-sm leading-6 text-gray-500">
          PNG أو JPG أو WEBP، بحد أقصى 5MB للصورة
        </p>

        <p className="mt-1 text-xs text-gray-400">
          يمكنك رفع حتى {MAX_IMAGES} صور
        </p>
      </button>

      {error && (
        <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-700">
          {error}
        </div>
      )}

      {images.length > 0 ? (
        <div className="mt-6">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="font-black text-gray-950">
                الصور المختارة
              </p>

              <p className="mt-1 text-xs text-gray-500">
                {images.length} من {MAX_IMAGES} صور
              </p>
            </div>

            <button
              type="button"
              onClick={openFilePicker}
              disabled={images.length >= MAX_IMAGES}
              className="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm font-bold text-gray-700 transition hover:border-orange-300 hover:bg-orange-50 hover:text-orange-600 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ImagePlus size={18} />
              إضافة صور
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
            {images.map((image) => (
              <article
                key={image.id}
                className="overflow-hidden rounded-2xl border border-gray-200 bg-white"
              >
                <div className="relative aspect-square bg-gray-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={image.previewUrl}
                    alt={image.file.name}
                    className="h-full w-full object-contain p-3"
                  />

                  {image.isPrimary && (
                    <span className="absolute start-2 top-2 inline-flex items-center gap-1 rounded-full bg-orange-500 px-2.5 py-1 text-xs font-bold text-white">
                      <Star size={13} fill="currentColor" />
                      الرئيسية
                    </span>
                  )}
                </div>

                <div className="p-3">
                  <p
                    dir="ltr"
                    title={image.file.name}
                    className="truncate text-xs font-semibold text-gray-700"
                  >
                    {image.file.name}
                  </p>

                  <p className="mt-1 text-xs text-gray-400">
                    {(image.file.size / 1024 / 1024).toFixed(
                      2
                    )}{" "}
                    MB
                  </p>

                  <div className="mt-3 flex gap-2">
                    {!image.isPrimary && (
                      <button
                        type="button"
                        onClick={() => makePrimary(image.id)}
                        className="flex-1 rounded-lg border border-gray-200 px-2 py-2 text-xs font-bold text-gray-700 transition hover:border-orange-300 hover:bg-orange-50 hover:text-orange-600"
                      >
                        جعلها رئيسية
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => removeImage(image.id)}
                      aria-label={`حذف الصورة ${image.file.name}`}
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-red-100 text-red-500 transition hover:bg-red-50"
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-5 rounded-xl border border-orange-100 bg-orange-50 px-4 py-3 text-sm leading-6 text-gray-600">
          رفع الصور يعمل الآن كمعاينة داخل الصفحة. ربطها بـ
          Cloudinary وحفظ روابطها في Neon سيكون في مرحلة مستقلة
          وآمنة.
        </div>
      )}
    </Card>
  );
}