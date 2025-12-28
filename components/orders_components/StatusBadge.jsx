import { Package, Clock, Truck, CheckCircle, XCircle } from 'lucide-react';

export const getStatusBadge = (status) => {
    const styles = {
        pending: 'bg-yellow-100 text-yellow-800 border-yellow-300',
        confirmed: 'bg-blue-100 text-blue-800 border-blue-300',
        processing: 'bg-purple-100 text-purple-800 border-purple-300',
        shipped: 'bg-indigo-100 text-indigo-800 border-indigo-300',
        delivered: 'bg-green-100 text-green-800 border-green-300',
        cancelled: 'bg-red-100 text-red-800 border-red-300'
    };

    const icons = {
        pending: <Clock className="w-4 h-4" />,
        confirmed: <CheckCircle className="w-4 h-4" />,
        processing: <Package className="w-4 h-4" />,
        shipped: <Truck className="w-4 h-4" />,
        delivered: <CheckCircle className="w-4 h-4" />,
        cancelled: <XCircle className="w-4 h-4" />
    };

    const labels = {
        pending: 'Pending',
        confirmed: 'Confirmed',
        processing: 'Processing',
        shipped: 'Shipped',
        delivered: 'Delivered',
        cancelled: 'Cancelled'
    };

    return (
        <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium border ${styles[status]}`}>
            {icons[status]}
            {labels[status]}
        </span>
    );
};
