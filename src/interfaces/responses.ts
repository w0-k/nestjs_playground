export interface Response {
    isSuccess: boolean;
    index?: number;
    msg?: string; 
}

export interface StatsResponse {
    avgItemInBasketCost: number,
    avgBasketValue: number,
}