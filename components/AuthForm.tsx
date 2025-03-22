"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
   
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Image from "next/image";
import Link from "next/link";
import {toast} from "sonner";
import FormField from "@/components/FormField";
import {useRouter} from "next/navigation";




const AuthFormSchema = (type: FormType) => {
    return  z.object({
        name: type === 'sign-up' ? z.string().min(3) : z.string().optional(),
        email: z.string().email(),
        password: z.string().min(8),
    })
}


const AuthForm = ( { type }: { type: FormType}) => {



    const router = useRouter();
    const formSchema = AuthFormSchema(type);



    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    })

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
       try{
           if(type === "sign-up"){
               toast.success("Account created successfully. Please sign in.");
               router.push("/sign-in");
               console.log('SIGN UP', values );
           }else{
               toast.success("Sign in successfully.");
               router.push("/");
               console.log('SIGN IN', values);
           }

       }catch (error){
           console.error(error);
           toast.error(`There was an error: ${error}`);
       }
    }

    const isSignIn = type === "sign-in";

    return (
        <div className="card-border lg:min-w-[566px]">
            <div className="flex flex-col card py-14 px-10">
                <div className="flex flex-row gap-2 justify-center">
                    <Image src="/logo.svg" alt="Logo" height={32} width={38} />
                    <h2 className="text-primary-100">InterPrep</h2>
                </div>
                <h3>Practice job interview with AI</h3>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-4 form w-full ">
                    {!isSignIn && (
                        <FormField control={form.control} name="name" label="Name" placeholder="Your Name" />
                    )}
                    <FormField
                        control={form.control}
                        name="email" label="Email"
                        placeholder="Your email address"
                        type="email"
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        label="Password"
                        placeholder="Enter password"
                        type="password"
                    />

                    <Button  className="btn" type="submit">{isSignIn ? 'Sign in' : 'Create and Account'}</Button>
                </form>
            </Form>

                <p className="text-center mt-2">
                    {isSignIn ? "No account yet?" : "Have an account already?"}
                    <Link
                        href={!isSignIn ? "/sign-in" : "/sign-up"}
                        className="font-bold text-user-primary ml-1"
                    >
                        {!isSignIn ? "Sign In" : "Sign Up"}
                    </Link>
                </p>
        </div>
        </div>
    )
}
export default AuthForm
