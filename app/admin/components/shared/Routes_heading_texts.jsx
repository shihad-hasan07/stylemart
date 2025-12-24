const namess = [
    { dashboard: 'Overview of your store performance' },
    { products: 'Manage your product inventory' },
    { orders: 'Track and manage customer orders' },
    { sales: 'Create and manage sales campaigns' },
    { customers: 'View and manage customer data' },
    { settings: 'Configure your store settings' }
]

const Routes_heading_texts = ({ name, total }) => {
    const text = namess.find(obj => obj[name])?.[name];

    return (
        <div className="capitalize bg-white px-6 py-4 border-b border-gray-300 space-y-1">
            <p className="text-2xl text-gray-800 font-semibold">{name} <span>({total})</span></p>
            <p className="text-sm text-gray-500">{text}</p>
        </div>
    );
};

export default Routes_heading_texts;