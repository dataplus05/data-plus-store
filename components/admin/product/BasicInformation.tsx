import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";

type BasicInformationProps = {
  errors?: Record<string, string>;
};

export default function BasicInformation({
  errors = {},
}: BasicInformationProps) {
  return (
    <Card
      title="معلومات المنتج"
      description="اكتب اسم المنتج ووصفه بالعربية والعبرية كما سيظهر للعملاء."
    >
      <div className="grid gap-5 md:grid-cols-2">
        <Input
          name="nameAr"
          label="اسم المنتج بالعربية"
          placeholder="مثال: لابتوب ASUS TUF Gaming"
          error={errors.nameAr}
          required
        />

        <Input
          name="nameHe"
          label="שם המוצר בעברית"
          placeholder="לדוגמה: מחשב נייד ASUS TUF Gaming"
          error={errors.nameHe}
          required
        />
      </div>

      <div className="mt-5 grid gap-5 md:grid-cols-2">
        <Textarea
          name="descriptionAr"
          label="الوصف بالعربية"
          placeholder="اكتب وصفًا واضحًا ومختصرًا للمنتج..."
          error={errors.descriptionAr}
          rows={7}
        />

        <Textarea
          name="descriptionHe"
          label="תיאור בעברית"
          placeholder="כתבו תיאור ברור וקצר של המוצר..."
          error={errors.descriptionHe}
          rows={7}
        />
      </div>

      <div className="mt-5">
        <Input
          name="slug"
          label="رابط المنتج"
          placeholder="asus-tuf-gaming-a15"
          hint="يُكتب بالإنجليزية دون مسافات، مثال: asus-tuf-gaming-a15"
          error={errors.slug}
          dir="ltr"
          required
        />
      </div>
    </Card>
  );
}