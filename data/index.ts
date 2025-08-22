// Data exports
// Centralized exports for all data functions

export {
  getActiveServices,
  getServiceBySlug,
  getServicesByCategory,
  searchServices,
} from './services'
export { getActiveHeroSlides, getHeroSlideById } from './hero-slides'
export {
  getActiveTeamMembers,
  getTeamMemberById,
  getTeamMembersByRole,
  getTeamMembersBySpecialty,
} from './team-members'
export {
  getActiveTestimonials,
  getTestimonialById,
  getTestimonialsByService,
  getVerifiedTestimonials,
  getTestimonialsByRating,
  getRandomTestimonial,
} from './testimonials'
export {
  getActiveGalleryImages,
  getGalleryImageById,
  getGalleryImagesByCategory,
  getRandomGalleryImages,
} from './gallery-images'
export { getStats } from './stats'

// Re-export data arrays for direct access
export { services } from './services'
export { heroSlides } from './hero-slides'
export { teamMembers } from './team-members'
export { testimonials } from './testimonials'
export { galleryImages } from './gallery-images'
export { stats } from './stats'
