import CredentialsProvider from 'next-auth/providers/credentials';
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
export const option = {
    providers: [
        CredentialsProvider({
            name : 'Email',
            credentials:{
                email : {label:'Email',placeholder:'Enter Your Email',type:'text'},
                password : {label:'Password',placeholder:'Enter Your Password',type:'password'},
            },
            async authorize(credentials, req) {
                return{
                    id :'name1',
                    name : 'Lakshay'
                }
            }
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        })

      ],
      secret: process.env.NEXTAUTH_SECRET,
      pages: {
        signIn: '/signin',
        }
}