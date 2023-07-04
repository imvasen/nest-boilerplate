export interface JwtPayload {
  sub: string;
  iat: number;
  id: string;
  email: string;
  name: string;
  image: string;
}
