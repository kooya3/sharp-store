import { COUPON_CODES } from "@/sanity/lib/sales/couponCodes";
import { getActiveSaleByCouponCode } from "@/sanity/lib/sales/getActiveSaleByCouponCode";

async function BlackFridayBanner() {
  const sale = await getActiveSaleByCouponCode(COUPON_CODES.SHARPIMP);

  if (!sale?.isActive) {
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-sky-950 via-blue-500 to-violet-600 text-white px-6 py-10 mx-4 mt-2 rounded-lg shadow-lg">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {/* Text Content */}
          <div className="space-y-3 md:space-y-4">
            <h2 className="text-2xl font-extrabold leading-tight sm:text-3xl md:text-4xl lg:text-5xl">
              {sale.title}
            </h2>
            <p className="text-lg font-semibold sm:text-xl md:text-2xl lg:text-3xl">
              {sale.description}
            </p>
          </div>

          {/* Coupon Code */}
          <div className="flex-shrink-0">
            <div className="bg-white text-black inline-flex w-full flex-col items-center justify-center rounded-full px-4 py-3 text-center shadow-md transition-transform hover:scale-105 hover:transform sm:w-auto sm:flex-row sm:px-6 sm:py-4">
              <span className="text-sm font-bold sm:text-base lg:text-lg">
                Use code:{" "}
                <span className="text-rose-600">{sale.couponCode}</span>
              </span>
              <span className="mt-1 text-sm font-bold sm:ml-2 sm:mt-0 sm:text-base lg:text-lg">
                for {sale.discountAmount}% OFF
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlackFridayBanner;