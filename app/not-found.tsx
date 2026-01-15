import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 py-24">
      <h1 className="text-6xl font-extrabold tracking-tight text-gray-900 md:text-8xl dark:text-gray-100">
        404
      </h1>
      <p className="text-xl font-bold md:text-2xl">Không tìm thấy trang</p>
      <p className="text-gray-600 dark:text-gray-400">
        Xin lỗi, chúng tôi không tìm thấy trang bạn đang tìm kiếm.
      </p>
      <Link
        href="/"
        className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 dark:hover:bg-blue-500"
      >
        Về trang chủ
      </Link>
    </div>
  )
}
