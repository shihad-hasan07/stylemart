
import React from 'react';
import { Facebook, Twitter, Linkedin, Youtube, MessageCircle } from 'lucide-react';

const SocialProfile = () => {
    const socialLinks = [
        {
            name: 'Facebook',
            icon: Facebook,
            url: 'https://facebook.com',
            color: 'hover:bg-[#1877F2] hover:text-white',
            borderColor: 'border-[#1877F2]',
            iconColor: 'text-[#1877F2]'
        },
        {
            name: 'Twitter',
            icon: Twitter,
            url: 'https://twitter.com',
            color: 'hover:bg-[#1DA1F2] hover:text-white',
            borderColor: 'border-[#1DA1F2]',
            iconColor: 'text-[#1DA1F2]'
        },
        {
            name: 'Pinterest',
            icon: () => (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
                </svg>
            ),
            url: 'https://pinterest.com',
            color: 'hover:bg-[#E60023] hover:text-white',
            borderColor: 'border-[#E60023]',
            iconColor: 'text-[#E60023]'
        },
        {
            name: 'LinkedIn',
            icon: Linkedin,
            url: 'https://linkedin.com',
            color: 'hover:bg-[#0A66C2] hover:text-white',
            borderColor: 'border-[#0A66C2]',
            iconColor: 'text-[#0A66C2]'
        },
        {
            name: 'YouTube',
            icon: Youtube,
            url: 'https://youtube.com',
            color: 'hover:bg-[#FF0000] hover:text-white',
            borderColor: 'border-[#FF0000]',
            iconColor: 'text-[#FF0000]'
        },
        {
            name: 'WhatsApp',
            icon: MessageCircle,
            url: 'https://whatsapp.com',
            color: 'hover:bg-[#25D366] hover:text-white',
            borderColor: 'border-[#25D366]',
            iconColor: 'text-[#25D366]'
        }
    ];

    return (
        <div className="flex items-center mt-5">
            <div className="flex items-center gap-1.5">
                {socialLinks.map((social, idx) => {
                    const Icon = social.icon;
                    return (
                        <a
                            key={idx}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={` w-8 h-8 flex items-center justify-center rounded-full border-2 ${social.borderColor} ${social.iconColor} ${social.color} transition-all duration-300 ease-in-out transform hover:scale-105 hover:-translate-y-1 hover:shadow-lg  active:scale-95 group`}
                            title={social.name}
                        >
                            {typeof Icon === 'function' && social.name === 'Pinterest' ? (
                                <Icon />
                            ) : (
                                <Icon
                                    className="w-4 h-4 transition-transform duration-300 group-hover:scale-105"
                                    strokeWidth={1.8}
                                />
                            )}
                        </a>
                    );
                })}
            </div>
        </div>
    );
};

export default SocialProfile;