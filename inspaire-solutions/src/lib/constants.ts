export const COMPANY = {
  name: 'InspAIre Solutions',
  email: 'hi@inspaire-solutions.com',
  address: {
    street: '30 N Gould St, STE R',
    city: 'Sheridan',
    state: 'WY',
    zip: '82801',
    country: 'USA',
  },
  social: {
    linkedin: 'https://linkedin.com/company/inspaire-solutions',
  },
  maps: {
    embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2831.1588337549606!2d-106.95751052432723!3d44.7979515710708!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5335fabe8182314f%3A0x16eb18eacf1e0aff!2s30%20N%20Gould%20St%20ste%20r%2C%20Sheridan%2C%20WY%2082801%2C%20EE.%20UU.!5e0!3m2!1ses-419!2ses!4v1758054741568!5m2!1ses-419!2ses',
  },
} as const

export const ROUTES = {
  home: '/',
  services: '/services',
  webexpress: '/webexpress',
  contact: '/contact',
} as const
