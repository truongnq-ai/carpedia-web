export const metadata = {
  title: 'Về Carpedia',
}

export default function AboutPage() {
  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pt-6 pb-8 md:space-y-5">
        <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100">
          Về Carpedia
        </h1>
      </div>
      <div className="prose dark:prose-invert max-w-none pt-8 pb-8">
        <p>
          <strong>Carpedia</strong> là dự án Car Wiki giáo dục, phi lợi nhuận, được thiết kế ưu tiên
          cho trẻ em và gia đình.
        </p>
        <h2>Mục tiêu</h2>
        <p>Giúp trẻ em (đặc biệt 3–7 tuổi) nhận biết:</p>
        <ul>
          <li>Hãng xe (Brand)</li>
          <li>Quốc gia xuất xứ (Country)</li>
          <li>Loại xe (Body Type)</li>
        </ul>
        <h2>Triết lý</h2>
        <ul>
          <li>Phi lợi nhuận</li>
          <li>Không quảng cáo</li>
          <li>Giáo dục là ưu tiên hàng đầu</li>
          <li>Ít chữ, nhiều hình ảnh</li>
        </ul>
      </div>
    </div>
  )
}
