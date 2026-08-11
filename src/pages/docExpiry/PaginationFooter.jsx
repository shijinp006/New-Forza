const inter = { fontFamily: "Inter, sans-serif" };

export const PaginationFooter = ({ currentPage, totalPages, totalItems, startIndex, endIndex, onPageChange }) => {
    return (
        <div className="shrink-0 flex flex-nowrap items-center justify-between gap-1.5 sm:gap-2.5 px-2.5 sm:px-3.5 py-2.5 border-t border-gray-100 bg-white min-w-0 overflow-x-auto">
            <span style={{ ...inter, fontWeight: 400 }} className="text-gray-500 text-[10px] sm:text-[11.5px] whitespace-nowrap shrink-0">
                {totalItems > 0
                    ? `Showing ${startIndex + 1} to ${endIndex} of ${totalItems} entries`
                    : "Showing 0 entries"}
            </span>

            <div className="flex items-center gap-0.5 sm:gap-1 shrink-0">
                <button
                    onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="px-1.5 sm:px-2.5 py-1 rounded-lg text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition cursor-pointer text-[10.5px] sm:text-[11.5px]"
                    style={{ ...inter, fontWeight: 500 }}
                >
                    Prev
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <button
                        key={p}
                        onClick={() => onPageChange(p)}
                        className={`w-5.5 h-5.5 sm:w-6.5 sm:h-6.5 rounded-lg flex items-center justify-center transition cursor-pointer text-[10.5px] sm:text-[11.5px] ${currentPage === p
                                ? "bg-violet-600 text-white shadow-xs font-semibold"
                                : "text-gray-600 hover:bg-gray-100"
                            }`}
                        style={{ ...inter, fontWeight: 500 }}
                    >
                        {p}
                    </button>
                ))}

                <button
                    onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages || totalPages === 0}
                    className="px-1.5 sm:px-2.5 py-1 rounded-lg text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition cursor-pointer text-[10.5px] sm:text-[11.5px]"
                    style={{ ...inter, fontWeight: 500 }}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default PaginationFooter;
