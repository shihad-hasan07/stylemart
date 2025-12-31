'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { toast } from 'react-toastify';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!res.ok) throw new Error();

            toast.success('Message sent successfully!');
            setFormData({
                name: '',
                email: '',
                phone: '',
                subject: '',
                message: '',
            });
        } catch (err) {
            toast.error('Failed to send message. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#fafafa]">
            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 py-16">
                {/* Contact Info */}
                <div className="grid md:grid-cols-3 gap-6 mb-16">
                    <InfoCard
                        icon={<Phone className="text-gray-700" />}
                        title="Phone"
                        desc="Sunday – Thursday"
                        value="+880 1234-567890"
                    />
                    <InfoCard
                        icon={<Mail className="text-gray-700" />}
                        title="Email"
                        desc="Reply within 24 hours"
                        value="support@stylemart.com"
                    />
                    <InfoCard
                        icon={<MapPin className="text-gray-700" />}
                        title="Office"
                        desc="Head office location"
                        value="Dhaka, Bangladesh"
                    />
                </div>

                {/* Form + Map */}
                <div className="grid md:grid-cols-2 gap-14">
                    {/* Form */}
                    <div>
                        <h2 className="text-xl font-semibold text-gray-900 mb-6">
                            Send a message
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <input
                                name="name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Full name"
                                className="w-full border border-gray-300 px-4 py-2.5 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400"
                            />

                            <input
                                name="email"
                                type="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Email address"
                                className="w-full border border-gray-300 px-4 py-2.5 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400"
                            />

                            <input
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="Phone (optional)"
                                className="w-full border border-gray-300 px-4 py-2.5 rounded-md"
                            />

                            <input
                                name="subject"
                                required
                                value={formData.subject}
                                onChange={handleChange}
                                placeholder="Subject"
                                className="w-full border border-gray-300 px-4 py-2.5 rounded-md"
                            />

                            <textarea
                                name="message"
                                rows="5"
                                required
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Write your message here…"
                                className="w-full border border-gray-300 px-4 py-2.5 rounded-md resize-none"
                            />

                            <button
                                disabled={isSubmitting}
                                className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-2.5 rounded-md hover:bg-gray-800 transition"
                            >
                                {isSubmitting ? 'Sending…' : 'Send message'}
                                <Send size={16} />
                            </button>
                        </form>
                    </div>

                    {/* Map */}
                    <div>
                        <h2 className="text-xl font-semibold text-gray-900 mb-6">
                            Our location
                        </h2>

                        <div className="h-[380px] rounded-md overflow-hidden border border-gray-300 bg-gray-100">
                            <iframe
                                src="https://www.google.com/maps?q=Rangpur,Bangladesh&output=embed"
                                width="100%"
                                height="100%"
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

/* Small helper component */
function InfoCard({ icon, title, desc, value }) {
    return (
        <div className="border p-6 rounded-lg hover:shadow transition">
            <div className="mb-3">{icon}</div>
            <h3 className="font-semibold">{title}</h3>
            <p className="text-sm text-gray-500">{desc}</p>
            <p className="text-red-600 mt-1">{value}</p>
        </div>
    );
}
