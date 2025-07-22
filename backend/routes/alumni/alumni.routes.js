// routes/alumni.routes.js
import express from 'express';
import {
  alumniList,
  searchAlumniByJobId,
  searchAlumniByJobRole,
  searchAlumniByCompany,
  searchAlumniByBatch,
  searchAlumniByName,
  deleteAlumni,
  updateAlumni,
  addAlumni,
} from '../../controllers/alumni/alumni.controllers.js';

const router = express.Router();

// Public routes for student 
router.get('/', alumniList);
router.get('/search-by-id', searchAlumniByJobId);
router.get('/search-by-role', searchAlumniByJobRole);
router.get('/search-by-company', searchAlumniByCompany);
router.get('/search-by-batch', searchAlumniByBatch);
router.get('/search-by-name', searchAlumniByName);

// Admin routes
router.post('/', addAlumni);
router.put('/:id', updateAlumni);
router.delete('/:id', deleteAlumni);

export default router;
