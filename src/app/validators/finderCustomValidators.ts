
export function fromDateValidator(this: any, from_Date: string) {
        return Date.parse(from_Date) <= Date.parse(this.to_date);
    }
    
    export function toDateValidator(this: any, to_date: string) {
        return Date.parse(to_date) >= Date.parse(this.from_Date);
    }
    
    export function lowerPriceValidator(this: any, low_price: Number) {
        return low_price <= this.high_price;
    }
    
    export function higherPriceValidator(this: any, high_price: Number) {
        return high_price >= this.low_price;
    }
    