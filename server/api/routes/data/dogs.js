import express from 'express';
const router = express.Router();

// GET /api/data/dogs
router.get('/', (req, res) => {
    const dogBreeds = [
        'Labrador Retriever',
        'German Shepherd',
        'Golden Retriever',
        'Bulldog',
        'Beagle',
        'Poodle',
        'Rottweiler',
        'Yorkshire Terrier',
        'Boxer',
        'Dachshund'
    ];
    res.json(dogBreeds);
});

export default router;