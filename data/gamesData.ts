export interface Game {
  id: number
  title: string
  slug: string
  description: string
  previewVideo: string
}

export const gamesData: Game[] = [
  {
    id: 1,
    title: 'Hãng xe của nước nào?',
    slug: 'hang-xe-cua-nuoc-nao',
    description: 'Nhìn logo, chọn cờ quốc gia tương ứng.',
    previewVideo: '/static/videos/preview-guess-brand-country.mp4',
  },
  {
    id: 2,
    title: 'Nước này có những hãng xe nào?',
    slug: 'nuoc-nay-co-nhung-hang-xe-nao',
    description: 'Chọn tất cả các hãng xe thuộc về quốc gia được yêu cầu.',
    previewVideo: '/static/videos/preview-guess-country-brands.mp4',
  },
  {
    id: 3,
    title: 'Chữ cái đầu – Hãng xe',
    slug: 'chu-cai-dau-hang-xe',
    description: 'Tìm các logo hãng xe bắt đầu bằng chữ cái cho trước.',
    previewVideo: '/static/videos/preview-guess-letter-brands.mp4',
  },
]
