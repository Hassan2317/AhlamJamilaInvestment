import { FaLeaf, FaHammer, FaUsers, FaAward, FaBullseye, FaLightbulb, FaBookOpen } from 'react-icons/fa';

const About = () => {
    const values = [
        {
            icon: <FaLeaf className="text-5xl text-primary-600" />,
            title: 'Quality First',
            description: 'We never compromise on the quality of our products and services. Every item is carefully selected and every project is executed with precision.'
        },
        {
            icon: <FaHammer className="text-5xl text-secondary-600" />,
            title: 'Expert Craftsmanship',
            description: 'Our team of skilled professionals brings years of experience and expertise to every project, ensuring superior results.'
        },
        {
            icon: <FaUsers className="text-5xl text-primary-600" />,
            title: 'Customer Focused',
            description: 'Your satisfaction is our priority. We work closely with clients to understand their needs and exceed expectations.'
        },
        {
            icon: <FaAward className="text-5xl text-accent-700" />,
            title: 'Proven Excellence',
            description: 'With over 15 years in the industry and 500+ completed projects, our track record speaks for itself.'
        }
    ];

    return (
        <div className="section-padding">
            <div className="container mx-auto">
                {/* Header */}
                <div className="text-center mb-16 animate-fade-in">
                    <h1 className="text-primary-800 mb-4 font-display">About Ahlam Jamila Investment</h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Building dreams and growing futures since 2010
                    </p>
                </div>

                {/* Company Story */}
                <div className="glass rounded-2xl p-8 md:p-12 mb-12 animate-slide-up">
                    <div className="flex flex-col items-center text-center mb-8">
                        <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-6">
                            <FaBookOpen className="text-3xl text-primary-600" />
                        </div>
                        <h2 className="text-3xl font-bold text-primary-800 font-display">Our Story</h2>
                    </div>
                    <div className="space-y-4 text-gray-700 leading-relaxed">
                        <p>
                            Ahlam Jamila Investment was founded with a vision to provide high-quality agricultural and construction
                            solutions to our community. What started as a small nursery has grown into a comprehensive enterprise
                            serving both individual customers and large organizations.
                        </p>
                        <p>
                            Today, we specialize in supplying premium orchard trees, natural trees, cement blocks, culvert rings,
                            and beautiful flowers. Our product range is complemented by professional construction and landscaping
                            services, including bridge construction, culvert and house construction, and expert garden design.
                        </p>
                        <p>
                            Our success is built on a foundation of quality, integrity, and customer satisfaction. Every product
                            we supply and every service we provide reflects our commitment to excellence and our passion for
                            helping our clients achieve their goals.
                        </p>
                    </div>
                </div>

                {/* Mission & Vision */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                    <div className="glass rounded-2xl p-8 animate-slide-up flex flex-col items-center text-center">
                        <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-6">
                            <FaBullseye className="text-3xl text-primary-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-primary-800 mb-4 font-display">Our Mission</h3>
                        <p className="text-gray-700 leading-relaxed max-w-md">
                            To deliver premium agricultural and construction solutions through craftsmanship,
                            innovation, and sustainable practices that exceed client expectations.
                        </p>
                    </div>

                    <div className="glass rounded-2xl p-8 animate-slide-up flex flex-col items-center text-center">
                        <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mb-6">
                            <FaLightbulb className="text-3xl text-secondary-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-primary-800 mb-4 font-display">Our Vision</h3>
                        <p className="text-gray-700 leading-relaxed max-w-md">
                            To be the regional leader in sustainable infrastructure and agriculture,
                            recognized for quality and building stronger, greener communities.
                        </p>
                    </div>
                </div>

                {/* Core Values */}
                <div className="mb-12">
                    <h2 className="text-3xl font-bold text-primary-800 mb-8 text-center font-display">Our Core Values</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {values.map((value, index) => (
                            <div key={index} className="glass rounded-xl p-6 text-center card-hover">
                                <div className="mb-4 flex justify-center">{value.icon}</div>
                                <h3 className="text-xl font-bold text-primary-800 mb-3">{value.title}</h3>
                                <p className="text-gray-600 text-sm">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Why Choose Us */}
                <div className="glass-dark rounded-2xl p-8 md:p-12 text-white">
                    <h2 className="text-3xl font-bold mb-6 font-display">Why Choose Us?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                            <div className="flex items-start space-x-3">
                                <span className="text-accent-400 text-xl">✓</span>
                                <p>Over 15 years of industry experience</p>
                            </div>
                            <div className="flex items-start space-x-3">
                                <span className="text-accent-400 text-xl">✓</span>
                                <p>Comprehensive range of products and services</p>
                            </div>
                            <div className="flex items-start space-x-3">
                                <span className="text-accent-400 text-xl">✓</span>
                                <p>Highly skilled and certified professionals</p>
                            </div>
                            <div className="flex items-start space-x-3">
                                <span className="text-accent-400 text-xl">✓</span>
                                <p>Competitive pricing without compromising quality</p>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <div className="flex items-start space-x-3">
                                <span className="text-accent-400 text-xl">✓</span>
                                <p>Timely project completion and delivery</p>
                            </div>
                            <div className="flex items-start space-x-3">
                                <span className="text-accent-400 text-xl">✓</span>
                                <p>Excellent customer service and support</p>
                            </div>
                            <div className="flex items-start space-x-3">
                                <span className="text-accent-400 text-xl">✓</span>
                                <p>Environmentally sustainable practices</p>
                            </div>
                            <div className="flex items-start space-x-3">
                                <span className="text-accent-400 text-xl">✓</span>
                                <p>Proven track record of successful projects</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
