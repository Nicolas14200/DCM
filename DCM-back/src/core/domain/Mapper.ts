export interface Mapper <T,U>{
    toDomain?(raw: U) : T;
    fromDomain?(t : T) : U;
}