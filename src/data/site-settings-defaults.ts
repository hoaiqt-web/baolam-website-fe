export type PublicSiteSettings = {
  contactEmail: string;
  contactPhone: string;
  officeAddress: string;
  workingHours: string;
  googleMapsUrl: string;
  facebookUrl: string;
};

export const DEFAULT_SITE_SETTINGS: PublicSiteSettings = {
  contactEmail: 'info@noithatbaolam.com',
  contactPhone: '096 315 28 61',
  officeAddress: 'CTT6-7 Him Lam Vạn Phúc, Hà Đông, Hà Nội',
  workingHours: 'Thứ 2 – Thứ 7, 8:00 – 17:30',
  googleMapsUrl: '',
  facebookUrl: '',
};
