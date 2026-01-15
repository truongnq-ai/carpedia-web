import Link from 'next/link'

const menuItems = [
  {
    title: 'Hãng Xe',
    href: '/brands',
    description: 'Toyota, Honda, Ford...',
    color: 'bg-blue-500',
  },
  {
    title: 'Quốc Gia',
    href: '/countries',
    description: 'Nhật Bản, Đức, Mỹ...',
    color: 'bg-green-500',
  },
  {
    title: 'Loại Xe',
    href: '/body-types',
    description: 'SUV, Sedan, Truck...',
    color: 'bg-purple-500',
  },
]

export default function EntityMenu() {
  return (
    <div className="container py-8">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
          >
            <div className={`absolute right-0 top-0 h-24 w-24 translate-x-8 translate-y--8 transform rounded-full ${item.color} opacity-10 group-hover:opacity-20`}></div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">{item.title}</h3>
            <p className="mt-2 text-gray-500 dark:text-gray-400">{item.description}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
