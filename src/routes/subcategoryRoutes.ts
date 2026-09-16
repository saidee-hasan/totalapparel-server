import { Subcategory } from '../models/Subcategory.js';
import { createTaxonomyService } from '../services/taxonomyService.js';
import { createTaxonomyController } from '../controllers/taxonomyController.js';
import { createTaxonomyRouter } from './taxonomyRouter.js';

const service = createTaxonomyService(Subcategory, {
  label: 'Subcategory',
  fields: ['name', 'slug', 'category', 'description', 'seoTitle', 'metaDescription', 'keywords', 'status', 'sortOrder'],
  required: ['name', 'category'],
  slugFields: ['category', 'name'],
  searchFields: ['name', 'slug', 'category', 'description'],
  filterFields: ['status', 'category'],
});

export default createTaxonomyRouter(createTaxonomyController(service));
