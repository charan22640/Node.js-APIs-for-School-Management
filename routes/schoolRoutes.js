/**
 * School Management API Routes
 * 
 * Endpoints:
 * 1. POST /api/schools - Add a new school
 * 2. GET /api/schools - List schools by proximity
 * 
 * Postman Collection Examples:
 * 
 * 1. Add School (POST /api/schools)
 *    Request:
 *    {
 *      "name": "ABC School",
 *      "address": "123 Education St, City",
 *      "latitude": 40.7128,
 *      "longitude": -74.0060
 *    }
 *    
 *    Response (201 Created):
 *    {
 *      "message": "School added successfully",
 *      "school": {
 *        "name": "ABC School",
 *        "address": "123 Education St, City",
 *        "latitude": 40.7128,
 *        "longitude": -74.0060
 *      }
 *    }
 * 
 * 2. List Schools (GET /api/schools?latitude=40.7128&longitude=-74.0060)
 *    Response (200 OK):
 *    {
 *      "userLocation": {
 *        "latitude": 40.7128,
 *        "longitude": -74.0060
 *      },
 *      "schools": [
 *        {
 *          "id": 1,
 *          "name": "ABC School",
 *          "address": "123 Education St, City",
 *          "latitude": 40.7128, 
 *          "longitude": -74.0060,
 *          "distance": {
 *            "meters": 0,
 *            "kilometers": "0.00"
 *          }
 *        },
 *        {
 *          "id": 2,
 *          "name": "XYZ Academy",
 *          "address": "456 Learning Ave, Town",
 *          "latitude": 40.7200,
 *          "longitude": -74.0100,
 *          "distance": {
 *            "meters": 834.95,
 *            "kilometers": "0.83"
 *          }
 *        }
 *      ]
 *    }
 */

const express = require('express');
const router = express.Router();
const schoolController = require('../controllers/schoolController');

// POST /api/schools - Add a school
router.post('/', schoolController.addSchool);

// GET /api/schools - Get schools sorted by distance
router.get('/', schoolController.getSchools);

module.exports = router;
