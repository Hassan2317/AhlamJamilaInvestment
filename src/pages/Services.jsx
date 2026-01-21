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
                <div className="py-16 reveal">
                    <h2 className="text-3xl font-bold text-primary-800 mb-16 text-center font-display">
                        How We Work
                    </h2>
                    <div className="relative">
                        {/* Connection Line (Desktop) */}
                        <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-primary-200 -translate-y-1/2 z-0"></div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
                            {[
                                { step: "01", title: "Consultation", desc: "We discuss your vision and specific project needs.", icon: "🤝" },
                                { step: "02", title: "Site Analysis", desc: "Detailed survey and professional planning phase.", icon: "📋" },
                                { step: "03", title: "Execution", desc: "High-quality implementation with expert oversight.", icon: "🏗️" },
                                { step: "04", title: "Handover", desc: "Final inspection and project delivery to you.", icon: "✨" }
                            ].map((item, index) => (
                                <div key={index} className="flex flex-col items-center">
                                    <div className="w-20 h-20 bg-white shadow-xl rounded-full border-4 border-primary-100 flex items-center justify-center text-3xl mb-6 transform transition-transform hover:scale-110 duration-300">
                                        {item.icon}
                                    </div>
                                    <div className="bg-primary-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
                                        STEP {item.step}
                                    </div>
                                    <h3 className="text-xl font-bold text-primary-800 mb-2">{item.title}</h3>
                                    <p className="text-gray-600 text-sm text-center max-w-[200px]">
                                        {item.desc}
                                    </p>
                                </div>
                            ))}
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
