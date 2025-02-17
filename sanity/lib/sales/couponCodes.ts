export const COUPON_CODES = {
    SHARPIMP: "SHARPIMP",
    BFRIDAY: "BFRIDAY",
    SALE26: "SALE26"
} as const;

export type couponCode = keyof typeof COUPON_CODES;