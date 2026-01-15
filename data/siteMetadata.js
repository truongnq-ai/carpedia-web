const siteMetadata = {
  title: 'Carpedia',
  author: 'Carpedia Team',
  headerTitle: 'Carpedia',
  description: 'Car Wiki giáo dục cho trẻ em - Khám phá thế giới ô tô',
  language: 'vi',
  theme: 'system', // system, dark or light
  siteUrl: 'https://carpedia.vercel.app',
  siteRepo: 'https://github.com/carpedia/carpedia-web',
  siteLogo: `${process.env.BASE_PATH || ''}/static/images/logo.png`,
  socialBanner: `${process.env.BASE_PATH || ''}/static/images/social-banner.png`,
  email: 'contact@carpedia.com',
  locale: 'vi-VN',
  stickyNav: false,
}

module.exports = siteMetadata
