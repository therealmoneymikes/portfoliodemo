
export {default} from  "next-auth/middleware"

   //zero or more = *
    //one or more = +
    //zero or one = ?
export const config = {
 
    matcher: [
        "/dashboard",
        "/dashboard/:path*"
    ]
}