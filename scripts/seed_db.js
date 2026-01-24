const products = [
    {
        name: 'Organic Apples',
        category: 'Fruits',
        description: 'Fresh, crunchy organic apples harvested directly from our orchards.',
        image: '/images/Apples 🍎.jpg',
        features: ['100% Organic', 'Fresh Harvest', 'Premium Grade']
    },
    {
        name: 'Sweet Bananas',
        category: 'Fruits',
        description: 'Hand-picked sweet bananas, perfect for retail and wholesale.',
        image: '/images/Banana 🍌.jpg',
        features: ['Naturally Ripened', 'Bulk Available', 'Nutrient Rich']
    },
    {
        name: 'Premium Mangoes',
        category: 'Fruits',
        description: 'Large, juicy premium mangoes known for their superior taste and quality.',
        image: '/images/Mango 🥭.jpg',
        features: ['Juicy Texture', 'Sweet Aroma', 'High Quality']
    },
    {
        name: 'Fresh Oranges',
        category: 'Fruits',
        description: 'Vitamin-C rich oranges, perfect for juice production or direct consumption.',
        image: '/images/Oranges 🍊.jpg',
        features: ['High Juice Content', 'Thin Skin', 'Rich Flavor']
    },
    {
        name: 'Tropical Pineapples',
        category: 'Fruits',
        description: 'Sweet and tangy tropical pineapples grown in optimal conditions.',
        image: '/images/Pineapples.jpg',
        features: ['Sweet Flavor', 'Large Size', 'Freshly Picked']
    },
    {
        name: 'Fruit Tree Seedlings',
        category: 'Seedlings',
        description: 'Strong, healthy fruit tree seedlings ready for orchard planting.',
        image: '/images/Fruit Seedlings 🌱.jpg',
        features: ['Disease Resistant', 'Fast Growing', 'Draft Varieties']
    },
    {
        name: 'Mango Seedlings',
        category: 'Seedlings',
        description: 'High-yield mango seedlings available in multiple varieties.',
        image: '/images/Mango Seedings 🥭.jpg',
        features: ['Uniform Growth', 'Grafted Options', 'High Yield']
    },
    {
        name: 'Papaya Seedlings',
        category: 'Seedlings',
        description: 'Fast-fruiting papaya seedlings for commercial and home gardens.',
        image: '/images/Papaya Seedlings 🌱.jpg',
        features: ['Semi-Dwarf', 'Sweet Variety', 'Quick Harvest']
    },
    {
        name: 'Banana Suckers',
        category: 'Seedlings',
        description: 'Healthy banana suckers from high-production mother plants.',
        image: '/images/Nthochi.jpg',
        features: ['Clean Material', 'Large Variety', 'Strong Roots']
    },
    {
        name: 'Variety Seedlings Bundle',
        category: 'Seedlings',
        description: 'A mix of various vegetable and fruit seedlings for diverse farming.',
        image: '/images/Multiple Varieties.jpg',
        features: ['Diverse Selection', 'Cost Effective', 'Bulk Discounts']
    },
    {
        name: 'Elite Seedling Stock',
        category: 'Seedlings',
        description: 'Carefully selected elite seedling stock for professional growers.',
        image: '/images/Seedlingz.jpg',
        features: ['Top Genetics', 'Vigorous Growth', 'Certified Quality']
    },
    {
        name: 'Modern Design Bricks',
        category: 'Construction Materials',
        description: 'Aesthetic and functional modern bricks for high-end residential projects.',
        image: '/images/Modern Bricks.jpg',
        features: ['Smooth Finish', 'Uniform Color', 'Impact Resistant']
    },
    {
        name: 'Interlocking Blocks',
        category: 'Construction Materials',
        description: 'Efficient interlocking blocks for faster and more regular construction.',
        image: '/images/Bricks 5.jpg',
        features: ['Fast Build', 'Cost Saving', 'Strong Alignment']
    }
];

const gallery = [
    { title: 'Apples Orchard', category: 'Agriculture', image: '/images/Apples 🍎.jpg', description: 'Freshly harvested apples from our orchard' },
    { title: 'Banana Plantation', category: 'Agriculture', image: '/images/Banana 🍌.jpg', description: 'Healthy banana trees in our plantation' },
    { title: 'Premium Bananas', category: 'Agriculture', image: '/images/Bananas.jpg', description: 'High-quality bananas ready for market' },
    { title: 'Quality Bricks', category: 'Construction Materials', image: '/images/Bricks 2.jpg', description: 'Durable cement blocks for construction' },
    { title: 'Construction Bricks', category: 'Construction Materials', image: '/images/Bricks 4.jpg', description: 'Perfectly cured cement blocks' },
    { title: 'Bulk Bricks', category: 'Construction Materials', image: '/images/Bricks 5.jpg', description: 'Large scale supply of construction blocks' },
    { title: 'Finished Bricks', category: 'Construction Materials', image: '/images/Bricks 6.jpg', description: 'Ready to use cement blocks' },
    { title: 'Variety Seedlings', category: 'Agriculture', image: '/images/Different Seedlings.jpg', description: 'Diverse range of healthy seedlings' },
    { title: 'Ornamental Seedlings', category: 'Agriculture', image: '/images/Different seedlings 🌱.jpg', description: 'Beautiful seedlings for landscaping' },
    { title: 'Fruit Tree Seedlings', category: 'Agriculture', image: '/images/Fruit Seedlings 🌱.jpg', description: 'Premium fruit-bearing tree seedlings' },
    { title: 'Assorted Fruits', category: 'Agriculture', image: '/images/Fruits.jpg', description: 'Fresh produce from our agricultural projects' },
    { title: 'House Construction', category: 'Construction Materials', image: '/images/Houses Construction 🚧.jpg', description: 'Modern home construction in progress' },
    { title: 'Completed House', category: 'Construction Materials', image: '/images/Houses 🏠.jpg', description: 'Beautifully finished residential project' },
    { title: 'Project Location', category: 'Infrastructure', image: '/images/Location.jpg', description: 'Strategic site for infrastructure development' },
    { title: 'Mango Nursery', category: 'Agriculture', image: '/images/Mango Seedings 🥭.jpg', description: 'Healthy mango tree seedlings' },
    { title: 'Mango Harvest', category: 'Agriculture', image: '/images/Mango 🥭 🥭 🥭.jpg', description: 'Plentiful mango harvest' },
    { title: 'Fresh Mangoes', category: 'Agriculture', image: '/images/Mango 🥭.jpg', description: 'Organic mangoes from our farm' },
    { title: 'Mango Trees', category: 'Agriculture', image: '/images/Mango.jpg', description: 'Mature mango trees in our orchard' },
    { title: 'Quality Mangoes', category: 'Agriculture', image: '/images/Mangoes.jpg', description: 'Export-quality freshly picked mangoes' },
    { title: 'Bridge Project 2', category: 'Infrastructure', image: '/images/Masiku 2.jpg', description: 'Ongoing bridge construction work' },
    { title: 'Masiku Bridge', category: 'Infrastructure', image: '/images/Masiku.jpg', description: 'Major bridge infrastructure completed' },
    { title: 'Modern Construction Bricks', category: 'Construction Materials', image: '/images/Modern Bricks.jpg', description: 'State-of-the-art building blocks' },
    { title: 'Crop Varieties', category: 'Agriculture', image: '/images/Multiple Varieties.jpg', description: 'Scientific crop variety testing' },
    { title: 'Local Bananas', category: 'Agriculture', image: '/images/Nthochi 2.jpg', description: 'Locally adapted banana varieties' },
    { title: 'Nthochi Plantation', category: 'Agriculture', image: '/images/Nthochi.jpg', description: 'Sustainable banana farming' },
    { title: 'Orange Grove', category: 'Agriculture', image: '/images/Oranges 🍊.jpg', description: 'Sun-ripened oranges in the orchard' },
    { title: 'Papaya Nursery', category: 'Agriculture', image: '/images/Papaya Seedlings 🌱.jpg', description: 'Fast-growing papaya seedlings' },
    { title: 'Pineapple Farm', category: 'Agriculture', image: '/images/Pineapples.jpg', description: 'Tropical pineapple plantation' },
    { title: 'Bulk Seedlings', category: 'Agriculture', image: '/images/Plenty Seedlings 🌱.jpg', description: 'Mass production of high-quality seedlings' },
    { title: 'Young Plants', category: 'Agriculture', image: '/images/Seedlings 🌱 3.jpg', description: 'Healthy young seedlings' },
    { title: 'Commercial Seedlings', category: 'Agriculture', image: '/images/Seedlings 🌱 47.jpg', description: 'Seedlings for commercial agriculture' },
    { title: 'Small-Scale Nursery', category: 'Agriculture', image: '/images/Seedlings 🌱 🌱 46.jpg', description: 'Community nursery project' },
    { title: 'Agricultural Stock', category: 'Agriculture', image: '/images/Seedlings 🌱 🌱 🌱 🌱 🌱 🌱.jpg', description: 'Vast selection of nursery stock' },
    { title: 'Healthy Greens', category: 'Agriculture', image: '/images/Seedlings 🌱 🌱 🌱 🌱.jpg', description: 'Lush green seedlings' },
    { title: 'Developing Seedlings', category: 'Agriculture', image: '/images/Seedlings 🌱 🌱.jpg', description: 'Well-developed seedling stock' },
    { title: 'Young Sprouts', category: 'Agriculture', image: '/images/Seedlings 🌱.jpg', description: 'Early stage healthy sprouts' },
    { title: 'Agricultural Innovations', category: 'Agriculture', image: '/images/Seedlingz.jpg', description: 'New varieties of seedlings' },
    { title: 'Growing Seedlings', category: 'Agriculture', image: '/images/seedlings 🌱 🌱 🌱.jpg', description: 'Carefully nurtured agriculture stock' },
    { title: 'Fruit Varieties', category: 'Agriculture', image: '/images/varieties.jpg', description: 'Multiple fruit varieties display' },
    { title: 'Orchard Trees', category: 'Agriculture', image: '/images/orchard-trees.jpg', description: 'Young fruit trees in the orchard' },
    { title: 'Landscaping Excellence', category: 'Landscaping', image: '/images/Seedlings 🌱 🌱 🌱 🌱 🌱 🌱 7.jpg', description: 'Professional garden landscaping project' }
];

const services = [
    {
        title: 'Culvert Construction',
        category: 'Infrastructure',
        description: 'Professional culvert construction and installation services. We deliver durable drainage systems and water management infrastructure for various projects.',
        image: '/images/Culvert.jpg',
        features: [
            'Drainage system design',
            'Reinforced concrete culverts',
            'Water management',
            'Quality materials',
            'Expert installation'
        ],
        icon: '🏗️'
    },
    {
        title: 'Landscaping & Gardening',
        category: 'Landscaping',
        description: 'Transform your outdoor spaces with our professional landscaping and gardening services. We create beautiful, sustainable landscapes tailored to your vision.',
        image: '/images/Landscaping.jpg',
        features: [
            'Custom garden design',
            'Plant selection and installation',
            'Irrigation systems',
            'Hardscaping',
            'Maintenance services'
        ],
        icon: '🌳'
    },
    {
        title: 'House Construction',
        category: 'Construction',
        description: 'Complete construction services for modern residential homes. From foundation to finishing, we deliver quality construction on time and within budget.',
        image: '/images/Houses Construction 🚧.jpg',
        features: [
            'Residential construction',
            'Architectural planning',
            'Foundation work',
            'Quality assurance',
            'Timely completion'
        ],
        icon: '🏠'
    }
];

const PORT = 5000;
const ADMIN_PASSWORD = 'Yatim2317';
const API_URL = `http://127.0.0.1:${PORT}/api/admin/seed`;

async function seed() {
    console.log(`Attempting to seed database at ${API_URL}...`);
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'password': ADMIN_PASSWORD
            },
            body: JSON.stringify({
                products,
                gallery,
                services
            })
        });

        const data = await response.json();

        if (response.ok && data.success) {
            console.log('✅ Database seeded successfully!');
            console.log(data.message);
        } else {
            console.error('❌ Failed to seed database:');
            console.error(data);
        }
    } catch (error) {
        console.error('❌ Error executing seed request:', error.message);
        console.log('Is the server running?');
    }
}

seed();
