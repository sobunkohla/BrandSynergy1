'use client'

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
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
import toast from "react-hot-toast";
import { Pencil } from "lucide-react";
import { PersonalDev } from "@prisma/client";

interface CollaborationsFormProps {
initialData: PersonalDev

}

const formSchema = z.object({
    colaborations: z.string().min(1, {
        message: "collaborations is required",
    }),
});

export default function CollaborationsFormPage({
    initialData,
}: CollaborationsFormProps) {

    const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing(prev => !prev);

const router = useRouter()
const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
       colaborations: initialData?.colaborations || undefined 
    },
});

const { isSubmitting , isValid } = form.formState;

const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/profile/actions`, values)
       toast.success("Profile updated successfully");
       toggleEdit()
       router.refresh();
    } catch  {
      toast.error('something went wrong')
    }

   
  };
  return (
    <div className="mt-6 border bg-orange-100 rounded-md p-4 ">
     <div className="font-medium flex items-center justify-between">
        collaborations 
       <Button onClick={toggleEdit} variant='ghost'>
        {isEditing ? (
            <>cancel</>
        ):(
            <>
            <Pencil className="h-4 w-4 mr-2"/>
             Edit collaborations
        </>
        )}
        
       </Button>
     </div>
     {!isEditing ? (
        <p className="text-sm mt-2">
            {initialData.colaborations}
        </p>
     ) : (
        <Form {...form}>
            <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
            >
                <FormField 
                control={form.control}
                name="colaborations"
                render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <Input
                            type="number"
                            
                            min={0}
                            disabled={isSubmitting}
                            {...field}
                            />
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}

             />
             <div className="flex items-center gap-x-2 ">
                <Button 
                disabled={!isValid || isSubmitting} 
                type="submit"
                >
                    save
                </Button>
             </div>
        
            </form>
        </Form>
     )}
    </div>
  )
}