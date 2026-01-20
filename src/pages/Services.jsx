import ServiceCard from '../components/ServiceCard';
import { services } from '../data/services';
import { Link } from 'react-router-dom';

const Services = () => {
    return (
        <div className="section-padding">
            <div className="container mx-auto">
                {/* Header */}
                <div className="text-center mb-12 animate-fade-in">
                    <h1 className="text-primary-800 mb-4 font-display">Our Services</h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Professional construction and landscaping services delivered by experienced experts.
                        We turn your vision into reality with quality workmanship and attention to detail.
                    </p>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-12">
                    {services.map((service) => (
                        <ServiceCard key={service.id} service={service} />
                    ))}
                </div>

                {/* Process Section */}
                <div className="glass rounded-2xl p-8 md:p-12 mb-12">
                    <h2 className="text-3xl font-bold text-primary-800 mb-8 text-center font-display">
                        Our Process
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="text-center">
                            <div className="bg-primary-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                                1
                            </div>
                            <h3 className="font-bold text-lg mb-2">Consultation</h3>
                            <p className="text-gray-600 text-sm">
                                We discuss your needs and vision for the project
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="bg-primary-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                                2
                            </div>
                            <h3 className="font-bold text-lg mb-2">Planning</h3>
                            <p className="text-gray-600 text-sm">
                                Detailed design and project planning with timeline
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="bg-primary-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                                3
                            </div>
                            <h3 className="font-bold text-lg mb-2">Execution</h3>
                            <p className="text-gray-600 text-sm">
                                Professional implementation with quality materials
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="bg-primary-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                                4
                            </div>
                            <h3 className="font-bold text-lg mb-2">Completion</h3>
                            <p className="text-gray-600 text-sm">
                                Final inspection and handover of your project
                            </p>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="glass-dark rounded-2xl p-8 md:p-12 text-center text-white">
                    <h2 className="text-3xl font-bold mb-4 font-display">Ready to Get Started?</h2>
                    <p className="text-lg mb-8 max-w-2xl mx-auto text-gray-200">
                        Book a consultation with our team to discuss your project requirements.
                        We'll provide a detailed quote and timeline for your service.
                    </p>
                    <Link to="/booking" className="btn-secondary inline-block">
                        Book a Service Now
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Services;
