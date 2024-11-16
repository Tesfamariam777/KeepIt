"use client"
import React from 'react'
import PropTypes from 'prop-types'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from './ui/button'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from './ui/form'
import { Input } from './ui/input'
import Link from 'next/link'

type FormType = "sign-up" | "sign-in";

const AuthFormSchema = (formType: FormType) => {
   return z.object({
    username: formType === "sign-up" ? z.string().min(2).max(50) : z.string().optional(),
    email: z.string().email()
  })}



const AuthForm = ({ type }: {type: FormType }) => {

    const formSchema = AuthFormSchema(type);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          username: "",
          email:"",
        },
      })
      function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
      }
      return (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="auth-form">
            <h1 className='form-title'>{type === "sign-in" ? "Login" : "Sign Up"}</h1>
            {type === "sign-up" && <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <div className='shad-form-item'>
                    <FormLabel className='shad-form-label'>Full Name</FormLabel>
                    <FormControl>
                      <Input className="shad-input" placeholder="Enter your full name" {...field} />
                    </FormControl>
                  </div>
                    <FormMessage className='shad-form-message'/>
                </FormItem>
              )}
            />}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <div className='shad-form-item'>
                    <FormLabel className='shad-form-label'>Email</FormLabel>
                    <FormControl>
                      <Input className='shad-input' placeholder="Enter your email" {...field} />
                    </FormControl>
                  </div>
                  <FormMessage className='shad-form-message'/>
                </FormItem>
              )}
            />
            <Button className='form-submit-button' type="submit">{type === "sign-in" ? "Sign In" : "Sign Up"}</Button>
            <div className='body-2 flex justify-center'>
              <p>{type === "sign-in" ? "Don't have an account?" : "Already have an account?"}</p>
              <Link className='ml-1 font-medium text-brand' href={type === "sign-in" ? "/sign-up" : "/sign-in"}>{` ${type === "sign-in" ? "Create Account" : "Login"}`}</Link>
            </div>
            
          </form>
        </Form>
      )
}

AuthForm.propTypes = {
    type: PropTypes.string.isRequired
}

export default AuthForm