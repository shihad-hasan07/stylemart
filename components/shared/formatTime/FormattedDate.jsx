const FormattedDate = ({ date }) => {
    if (!date) return null;

    const formattedDate = new Date(date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });

    return <span>{formattedDate}</span>;
};

export default FormattedDate;
