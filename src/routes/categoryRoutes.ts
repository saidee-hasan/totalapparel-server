import { Category } from '../models/Category.js';
import { createTaxonomyService } from '../services/taxonomyService.js';
import { createTaxonomyController } from '../controllers/taxonomyController.js';
import { createTaxonomyRouter } from './taxonomyRouter.js';

const service = createTaxonomyService(Category, {
  label: 'Category',
  fields: ['name', 'slug', 'description', 'seoTitle', 'metaDescription', 'keywords', 'status', 'sortOrder', 'image'],
  searchFields: ['name', 'slug', 'description'],
});

export default createTaxonomyRouter(createTaxonomyController(service));
