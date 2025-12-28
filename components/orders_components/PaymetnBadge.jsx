
export const getPaymentBadge = (status) => {
    const styles = {
        pending: 'bg-orange-100 text-orange-800',
        verified: 'bg-green-100 text-green-800',
        failed: 'bg-red-100 text-red-800'
    };

    const labels = {
        pending: 'Payment Pending',
        verified: 'Payment Verified',
        failed: 'Payment Failed'
    };

    return (
        <span className={`inline-block px-2 py-1 text-xs font-medium ${styles[status]}`}>
            {labels[status]}
        </span>
    );
};