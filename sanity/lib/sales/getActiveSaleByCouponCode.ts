import { defineQuery } from "next-sanity";
import { couponCode } from "./couponCodes";
import { sanityFetch } from "../live";

export const getActiveSaleByCouponCode = async (couponCode: couponCode) => {
    const ACTIVE_SALE_BY_COUPON_QUERY = defineQuery(`
            *[
                _type == "sale"
                && isActive == true
                && couponCode == $couponCode
            ] | order(validFrom desc) [0] 
        `);


    try {
        const activeSale = await sanityFetch({
            query: ACTIVE_SALE_BY_COUPON_QUERY,
            params: {
                couponCode,
            }, // pass the coupon code as a query parameter
        });

        return activeSale ? activeSale.data : null;
    } catch (error) {
        console.error("Error fetching active sale by coupon code:", error)
        return null;
    }
}; 