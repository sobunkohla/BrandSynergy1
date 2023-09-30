"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import React, { use, useState } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Heading from "@/components/custom/heading";
import { FormInput, LayoutDashboard, Loader } from "lucide-react";
import Link from "next/link";
import { FiPlus } from "react-icons/fi";
import toast from "react-hot-toast";


export default function BusinessStrategySetup({
    params,
  }: {
    params: { bsid: string };
  }) {
  const router = useRouter()
  const formSchema = z.object({
    title: z.string().min(1, {
      message: "title must be at least 1 character",
    }),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;
const isLoading = form.formState.isSubmitting;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post(`/api/marketspaces/${params.bsid}/brandingstrategies`, values );
       router.push(`/projects/${params.bsid}/strategies/branding/new/${response.data.id}`);
       toast.success("Branding Strategy created successfully");
    } catch  {
      toast.error('something went wrong')
    }
  };

  return (
    <div className="py-12 px-4 ">
      <Heading
        title="New Branding Strategy"
        description="elevate your ventures with insights tailored to to your branding. "
        icon={LayoutDashboard}
        iconColor="text-orange-400"
        bgColor="text-orange-600/10"
      />
      <div className="max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6 ">
        <div className="">
          <h1 className="text-2xl">Name Your Branding Strategy</h1>
          <p className="text-sm text-slate-600">
            What would you like to name your Branding Strategy? Don&apos;t worry , you can
            change this later.
          </p>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 mt-8"
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (<FormItem>
                  <FormLabel>
                  Branding Strategy Title
                  </FormLabel>
                  <FormControl>
                    <Input
                    disabled={isSubmitting} 
                    placeholder="e.g social network marketing"
                    {...field}
                    />
                  </FormControl>
                  <FormDescription>
                      what will this Branding strategy focus on??
                    </FormDescription>
                    <FormMessage/>
                </FormItem>
                )}
              />
              <div className="flex items-center gap-x-2">
                <Link href='/projects'>
                   <Button variant='ghost' type="button">
                    Cancel
                   </Button>
                </Link>
                <Button 
                disabled={!isValid || isSubmitting } 
                type="submit"
                >
                    continue
                   </Button>
              </div>
            </form>
            <div
      className={`fixed top-0 left-0 w-full h-full flex items-center justify-center ${
        isLoading  ? "block" : "hidden"
      }`}
      style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
    >
      <Loader className="text-white animate-spin" size={48} />
    </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
