interface CourseHeaderProps {
  title?: string;
  description?: string;
}

export default function CourseHeader({
  title = 'Khóa học',
  description = 'Khám phá hàng nghìn khóa học chất lượng cao',
}: CourseHeaderProps) {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
