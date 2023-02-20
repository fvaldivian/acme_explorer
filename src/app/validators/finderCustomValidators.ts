
export function fromDateValidator(this: any, from_Date: Number) {
        return from_Date <= this.to_date;
    }
    
    export function toDateValidator(this: any, to_date: Number) {
        return to_date >= this.from_Date;
    }
    
    export function lowerPriceValidator(this: any, low_price: Number) {
        return low_price <= this.high_price;
    }
    
    export function higherPriceValidator(this: any, high_price: Number) {
        return high_price >= this.low_price;
    }
    