"use client";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Link from "next/link";

const MySwal = withReactContent(Swal);

export const cartSuccessToast = ({ quantity, productName }) => {
    MySwal.fire({
        toast: true,
        position: "bottom-end",
        width: 420,

        showConfirmButton: false,
        showCloseButton: true,
        timer: 3000,
        backdrop: false,
        padding: 0,

        // 🔹 remove default modal feel
        background: "transparent",
        showClass: { popup: "" },
        hideClass: { popup: "" },

        customClass: {
            popup: "!bg-transparent !shadow-none !p-0 !rounded-md",
            closeButton: "!text-white !opacity-80 hover:!opacity-100",
        },

        didOpen: (toast) => {
            // ⏸ hover pause
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);

            // 🔥 IMPORTANT: container padding remove + exact right gap
            const container = Swal.getContainer();
            if (container) {
                container.style.padding = "0";   // default 1rem remove
                container.style.right = "-35px";  // exact gap
                container.style.left = "auto";
            }
        },

        html: (
            <div className="bg-[#2f8f3a] text-white rounded-md px-6 py-4 w-full">
                <p className="text-sm leading-tight">
                    <span className="font-semibold">{quantity} ×</span>{" "}
                    “{productName}” have been added to your cart.
                </p>

                <Link
                    href="/cart"
                    className="mt-1 inline-block text-sm font-medium underline"
                >
                    View cart
                </Link>
            </div>
        ),
    });
};
