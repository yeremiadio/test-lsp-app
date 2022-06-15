export interface BackendDataShape<D> {
    status: string;
    data: D;
    message: string;
}